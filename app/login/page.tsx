'use client';

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (isSignUp) {
        await signUp(email, password);
        alert('Check your email for confirmation link');
      } else {
        await signIn(email, password);
      }
      router.push('/dashboard'); // Redirect after successful login/signup
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Note: OAuth flow might redirect externally, so no push here needed
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">onlyvibes 🎵</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="p-3 border rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="mt-6 p-3 bg-red-600 text-white rounded hover:bg-red-700 max-w-sm w-full"
      >
        Continue with Google
      </button>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="mt-4 text-blue-600 underline"
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
