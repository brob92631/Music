// app/layout.tsx
import './globals.css'

export const metadata = {
  title: 'onlyvibes',
  description: 'Your music app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
