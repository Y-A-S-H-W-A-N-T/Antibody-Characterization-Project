import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Molstar Viewer',
  description: 'Protein Structure Visualization with Molstar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressContentEditableWarning>{children}</body>
    </html>
  )
}