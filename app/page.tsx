'use client';

import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();

  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white flex-col gap-4">
      {!user ? (
        <>
          <h1 className="text-4xl font-bold">Welcome to onlyvibes 🎵</h1>
          <a
            href="/login"
            className="text-blue-500 underline text-lg"
          >
            Log in / Sign up
          </a>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold">Welcome back, {user.email}</h1>
          <a
            href="/dashboard"
            className="text-blue-500 underline text-lg"
          >
            Go to Dashboard
          </a>
        </>
      )}
    </main>
  );
}
