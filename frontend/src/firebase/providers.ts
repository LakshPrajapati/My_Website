import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Configuration
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

githubProvider.addScope('read:user');
githubProvider.addScope('user:email');
