import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AudioPlayerProvider>
            {children}
          </AudioPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
