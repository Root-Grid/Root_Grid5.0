import './globals.css'
import { wrapper } from '../../redux/store'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RootKart',
  description: 'Grid 5.0',
}

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}

export default wrapper.withRedux(RootLayout);
