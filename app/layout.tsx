import type { Metadata } from 'next'
import { ThemeProvider } from '../components/theme-provider' // Make sure this path is correct
import './globals.css'

export const metadata: Metadata = {
  title: 'Keith Barnabas - Portfolio',
  description: 'Creative Technologist & Developer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}