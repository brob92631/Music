import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth-helpers'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Section from '@/components/ui/section'

export default async function DashboardPage() {
  const user = await getUser()
  if (!user) redirect('/')

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.user_metadata.avatar_url} />
          <AvatarFallback>{user.email[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">Welcome back, {user.user_metadata.full_name?.split(' ')[0] || user.email} 👋</h2>
          <p className="text-muted-foreground">Your vibes await.</p>
        </div>
      </div>

      <Section title="🎯 For You">
        <PlaceholderCard title="Lo-fi Chill" />
        <PlaceholderCard title="Rap Vibes" />
        <PlaceholderCard title="Indie Boost" />
      </Section>

      <Section title="🔁 Daily Mix">
        <PlaceholderCard title="Mix #1" />
        <PlaceholderCard title="Mix #2" />
        <PlaceholderCard title="Mix #3" />
      </Section>

      <Section title="📻 Radio Mode">
        <PlaceholderCard title="Now Playing: Nujabes" />
      </Section>
    </div>
  )
}

function PlaceholderCard({ title }: { title: string }) {
  return (
    <div className="p-4 rounded-2xl bg-muted w-[200px] text-sm font-medium shadow-sm">
      {title}
    </div>
  )
}
