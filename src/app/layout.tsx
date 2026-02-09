import { ToastContainer } from 'react-toastify'
import './globals.css'
import { ProfileProvider } from '@/context/ProfileContext'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
        {children}
        </ProfileProvider>
        <ToastContainer
          autoClose={2000}
          position="bottom-right"
        ></ToastContainer>
      </body>
    </html>
  )
}
