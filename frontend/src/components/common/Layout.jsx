// src/components/common/Layout.jsx
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, hideFooter = false }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '80vh' }}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </>
  )
}
