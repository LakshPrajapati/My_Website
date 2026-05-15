export type UserRole = 'agent' | 'admin' | 'guest';
export type ClearanceLevel = 'omega' | 'alpha' | 'beta';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  provider: string;
  createdAt: string;
  lastLogin: string;
  role: UserRole;
  clearanceLevel: ClearanceLevel;
  status: 'active' | 'suspended';
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  loginWithGoogle: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  logout: () => Promise<void>;
}
