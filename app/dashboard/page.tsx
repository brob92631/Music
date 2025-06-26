import { redirect } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default async function DashboardPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {session.user.email}</h1>
      {/* Your music player, playlists, etc, go here */}
    </div>
  );
}
