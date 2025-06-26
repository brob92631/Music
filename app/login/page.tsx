// Music-main/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const GoogleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/><path fill="none" d="M1 1h22v22H1z"/></svg>;

export default function LoginPage() {
  const { signIn, signUp, signInWithGoogle, user, isLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        alert('Sign up successful! Please check your email for a confirmation link, then sign in.');
        setIsSignUp(false); 
      } else {
        await signIn(email, password);
        // router.push('/'); // Handled by useEffect
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (e: any) {
      setError(e.message || 'An error occurred with Google Sign-In.');
      setIsSubmitting(false); // Only set false if error, otherwise OAuth redirect handles it
    }
  };
  
  if (isLoading || (!isLoading && user)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-4">
        <div className="text-xl text-zinc-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900 text-white p-4">
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-zinc-100">onlyvibes 🎵</h1>
        <p className="text-zinc-400">Your personal soundscape, simplified.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm bg-zinc-800/70 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-2xl">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 bg-zinc-700/80 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-zinc-400 text-sm sm:text-base"
          required
          disabled={isSubmitting}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 bg-zinc-700/80 border border-zinc-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-zinc-400 text-sm sm:text-base"
          required
          disabled={isSubmitting}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm sm:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
        </button>
      </form>

      <div className="w-full max-w-xs sm:max-w-sm mt-5">
        <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-zinc-700"></div>
            <span className="flex-shrink mx-4 text-zinc-500 text-xs">OR</span>
            <div className="flex-grow border-t border-zinc-700"></div>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="mt-1 p-3 bg-zinc-700/80 hover:bg-zinc-600/80 text-white rounded-md max-w-xs sm:max-w-sm w-full flex items-center justify-center gap-2.5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
        disabled={isSubmitting}
      >
        <GoogleIcon />
        {isSubmitting ? 'Processing...' : 'Continue with Google'}
      </button>

      <button
        onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
        className="mt-8 text-blue-400 hover:text-blue-300 transition-colors underline text-sm disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Create one"}
      </button>

      {error && <p className="mt-5 text-red-400 bg-red-900/40 px-4 py-2.5 rounded-md max-w-xs sm:max-w-sm w-full text-center text-xs sm:text-sm">{error}</p>}
    </div>
  );
}
