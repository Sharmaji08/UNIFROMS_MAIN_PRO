// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './styles/global.css'

// Pages
import Home           from './pages/Home'
import About          from './pages/About'
import Industries     from './pages/Industries'
import Products       from './pages/Products'
import Portfolio      from './pages/Portfolio'
import BulkOrder      from './pages/BulkOrder'
import Login          from './pages/Login'
import Register       from './pages/Register'
import Dashboard      from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Contact        from './pages/Contact'

function NotFound() {
  return (
    <div style={{
      minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',
      justifyContent:'center',background:'linear-gradient(135deg,#0a1628,#1a3560)',
    }}>
      <div style={{fontFamily:'Playfair Display,serif',fontSize:'6rem',fontWeight:800,color:'rgba(201,168,76,0.3)',lineHeight:1}}>404</div>
      <h2 style={{color:'#fff',marginBottom:8}}>Page Not Found</h2>
      <p style={{color:'rgba(255,255,255,0.6)',marginBottom:24}}>The page you're looking for doesn't exist.</p>
      <a href="/" style={{
        padding:'12px 28px',borderRadius:8,
        background:'linear-gradient(135deg,#c9a84c,#e8c97a)',
        color:'#0a1628',fontWeight:700,textDecoration:'none',fontFamily:'DM Sans,sans-serif',
      }}>← Back to Home</a>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/about"      element={<About />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/products"   element={<Products />} />
          <Route path="/portfolio"  element={<Portfolio />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/admin"      element={<AdminDashboard />} />
          <Route path="/contact"    element={<Contact />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
