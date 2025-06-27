// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HomeIcon = ({isActive}:{isActive:boolean}) => <svg height="24" width="24" viewBox="0 0 24 24" className={`transition-colors ${isActive ? 'text-primary' : ''}`} fill="currentColor"><path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-1.707-.867a3 3 0 0 1 3.414 0l7.5 4.33a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V8.243a1 1 0 0 1 .5-.866l7.5-4.33z"/></svg>;
const SearchIcon = ({isActive}:{isActive:boolean}) => <svg height="24" width="24" viewBox="0 0 24 24" className={`transition-colors ${isActive ? 'text-primary' : ''}`} fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>;
const LibraryIcon = ({isActive}:{isActive:boolean}) => <svg height="24" width="24" viewBox="0 0 24 24" className={`transition-colors ${isActive ? 'text-primary' : ''}`} fill="currentColor"><path d="M14.5 2.13l-9.01 5.15a1 1 0 0 0-.5.87V17.5a1 1 0 0 0 .5.87l9.01 5.15a1 1 0 0 0 1 0l9.01-5.15a1 1 0 0 0 .5-.87V8.15a1 1 0 0 0-.5-.87L15.5 2.13a1 1 0 0 0-1 0zm-8.52 5.76l8.02-4.58 8.02 4.58-8.02 4.58-8.02-4.58zM3 18.29V9.53l8.5 4.86v8.76l-8.5-4.86z"/></svg>;

const userPlaylists = ['Chill Mix', 'Late Night Coding', 'Workout Beats', 'Lo-Fi Focus', '80s Revival', 'Ambient Dreams'];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[var(--sidebar-width)] flex-shrink-0 flex-col bg-black text-secondary p-2 hidden md:flex">
      <div className="bg-base rounded-lg p-2 space-y-2">
        <Link href="/" className={`flex items-center gap-4 px-4 py-2 rounded transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : ''}`}>
          <HomeIcon isActive={pathname === '/'} />
          <span className="font-bold text-base">Home</span>
        </Link>
         {/* The search page can be built out later. For now, search is on the main page. */}
        <div className="flex items-center gap-4 px-4 py-2 rounded opacity-50 cursor-not-allowed">
          <SearchIcon isActive={pathname === '/search'} />
          <span className="font-bold text-base">Search</span>
        </div>
      </div>

      <div className="bg-base rounded-lg mt-2 flex-1 flex flex-col">
        <div className="flex items-center gap-4 px-4 py-2">
          <LibraryIcon isActive={false} />
          <span className="font-bold text-base">Your Library</span>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {userPlaylists.map(playlist => (
            <Link key={playlist} href="#" className="block px-4 py-2 rounded hover:bg-highlight">
              <p className="font-semibold text-primary truncate">{playlist}</p>
              <p className="text-sm">Playlist</p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
