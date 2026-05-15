import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, googleProvider, githubProvider, db } from '../firebase/config';
import { toast } from 'react-hot-toast';

interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string;
  provider: string;
  role: string;
  intelligenceLevel: number;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const userProfile = await syncUserProfile(currentUser);
        setProfile(userProfile);
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const syncUserProfile = async (user: User): Promise<UserProfile> => {
    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    
    let profileData: UserProfile;

    if (!userDoc.exists()) {
      profileData = {
        displayName: user.displayName || 'AGENT',
        email: user.email || '',
        photoURL: user.photoURL || '',
        provider: user.providerData[0]?.providerId || 'unknown',
        role: 'operator',
        intelligenceLevel: 1,
      };
      await setDoc(userRef, {
        ...profileData,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    } else {
      const data = userDoc.data();
      profileData = {
        displayName: data.displayName,
        email: data.email,
        photoURL: data.photoURL,
        provider: data.provider,
        role: data.role,
        intelligenceLevel: data.intelligenceLevel,
      };
      await setDoc(userRef, {
        lastLogin: serverTimestamp(),
      }, { merge: true });
    }

    return profileData;
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('IDENTITY_VERIFIED: ACCESS_GRANTED');
    } catch (error: any) {
      toast.error(`AUTH_ERROR: ${error.message}`);
    }
  };

  const signInWithGithub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      toast.success('IDENTITY_VERIFIED: ACCESS_GRANTED');
    } catch (error: any) {
      toast.error(`AUTH_ERROR: ${error.message}`);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success('SESSION_TERMINATED');
    } catch (error: any) {
      toast.error(`LOGOUT_ERROR: ${error.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signInWithGoogle, signInWithGithub, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
