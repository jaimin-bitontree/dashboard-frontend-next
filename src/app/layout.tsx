import { ToastContainer } from 'react-toastify'
import './globals.css'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer
          autoClose={2000}
          position="bottom-right"
        ></ToastContainer>
      </body>
    </html>
  )
}
