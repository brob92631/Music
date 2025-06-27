import { ReactNode } from 'react';
import { AuthProvider } from '../context/AuthContext';
import { AudioPlayerProvider } from '../context/AudioPlayerContext';
import Sidebar from '../components/Sidebar';
import AudioPlayerUI from '../components/AudioPlayerUI';
import './globals.css';

export const metadata = {
  title: 'onlyvibes',
  description: 'Your personal soundscape, simplified.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AudioPlayerProvider>
            <div className="w-full h-screen flex flex-col">
              <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto bg-base">
                  {children}
                </main>
              </div>
              <AudioPlayerUI />
            </div>
          </AudioPlayerProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
