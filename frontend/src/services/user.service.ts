import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { UserProfile } from '../types/auth.types';
import { logger } from '../utils/logger';

export const userService = {
  async getProfile(uid: string): Promise<UserProfile | null> {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
    } catch (err) {
      logger.error(`FAILED TO RETRIEVE PROFILE [${uid}]`, err);
      throw err;
    }
  },

  async syncProfile(user: any): Promise<UserProfile> {
    const uid = user.uid;
    const existingProfile = await this.getProfile(uid);

    const profileData: Partial<UserProfile> = {
      uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      provider: user.providerData[0]?.providerId || 'unknown',
      lastLogin: new Date().toISOString(),
    };

    if (!existingProfile) {
      const newProfile: UserProfile = {
        ...(profileData as UserProfile),
        role: 'agent',
        clearanceLevel: 'omega',
        status: 'active',
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(doc(db, 'users', uid), {
        ...newProfile,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
      
      logger.success(`NEW AGENT REGISTERED: [${uid}]`);
      return newProfile;
    }

    await updateDoc(doc(db, 'users', uid), {
      ...profileData,
      lastLogin: serverTimestamp(),
    });

    logger.info(`AGENT PROFILE SYNCED: [${uid}]`);
    return { ...existingProfile, ...profileData } as UserProfile;
  }
};
