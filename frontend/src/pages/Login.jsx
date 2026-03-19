// src/pages/Login.jsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail]   = useState('')
  const [pass, setPass]     = useState('')
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  // ✅ Ensure admin exists (only once)
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('up_users') || '[]')

    const adminExists = users.some(u => u.role === 'admin')

    if (!adminExists) {
      const adminUser = {
        name: "Admin User",
        email: "admin@uniformspro.com",
        password: "admin123",
        role: "admin"
      }

      localStorage.setItem('up_users', JSON.stringify([adminUser, ...users]))
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise(r => setTimeout(r, 1000))

    const users = JSON.parse(localStorage.getItem('up_users') || [])

    const user = users.find(
      u => u.email === email && u.password === pass
    )

    if (user) {
      login({
        name: user.name,
        email: user.email,
        role: user.role
      })

      if (user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } else {
      setError('Invalid email or password.')
    }

    setLoading(false)
  }

  return (
    <div style={{
      minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'linear-gradient(135deg,#0a1628 0%,#102040 60%,#1a3560 100%)',
      padding:'24px',
    }}>
      <div style={{width:'100%',maxWidth:420}}>
        
        {/* Logo */}
        <div style={{textAlign:'center',marginBottom:40}}>
          <Link to="/" style={{display:'inline-flex',alignItems:'center',gap:12,textDecoration:'none'}}>
            <div style={{
              width:48,height:48,borderRadius:12,
              background:'linear-gradient(135deg,#c9a84c,#e8c97a)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:'Playfair Display,serif',fontWeight:800,color:'#0a1628',fontSize:'1.4rem',
            }}>U</div>
            <div>
              <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'#fff',fontSize:'1.3rem'}}>UniformsPro</div>
              <div style={{fontSize:'0.65rem',color:'#c9a84c',letterSpacing:'0.15em',textTransform:'uppercase'}}>Premium Manufacturer</div>
            </div>
          </Link>
        </div>

        <div style={{
          background:'rgba(255,255,255,0.04)',backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,
          padding:'40px',
        }}>
          <h2 style={{color:'#fff',textAlign:'center',marginBottom:8,fontSize:'1.6rem'}}>Welcome Back</h2>
          <p style={{color:'rgba(255,255,255,0.55)',textAlign:'center',fontSize:'0.9rem',marginBottom:32}}>
            Sign in to manage your orders
          </p>

          {error && (
            <div style={{
              background:'rgba(198,40,40,0.15)',border:'1px solid rgba(198,40,40,0.4)',
              borderRadius:8,padding:'12px 16px',marginBottom:20,
              color:'#ffcdd2',fontSize:'0.88rem',
            }}>⚠ {error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:20}}>
              <label style={{display:'block',fontSize:'0.88rem',fontWeight:600,color:'rgba(255,255,255,0.8)',marginBottom:8}}>
                Email Address
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="your@email.com"
                style={{
                  width:'100%',padding:'13px 16px',borderRadius:8,
                  background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',
                  color:'#fff',fontSize:'0.95rem',outline:'none',fontFamily:'inherit',
                }}
              />
            </div>

            <div style={{marginBottom:28}}>
              <label style={{display:'block',fontSize:'0.88rem',fontWeight:600,color:'rgba(255,255,255,0.8)',marginBottom:8}}>
                Password
              </label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)}
                required placeholder="••••••••"
                style={{
                  width:'100%',padding:'13px 16px',borderRadius:8,
                  background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',
                  color:'#fff',fontSize:'0.95rem',outline:'none',fontFamily:'inherit',
                }}
              />
            </div>

            <button type="submit" disabled={loading}
              style={{
                width:'100%',padding:'14px',borderRadius:10,
                background:'linear-gradient(135deg,#c9a84c,#e8c97a)',
                color:'#0a1628',fontWeight:700,fontSize:'1rem',
                cursor:'pointer',border:'none',
                opacity:loading?0.7:1,
              }}>
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{textAlign:'center',marginTop:24,fontSize:'0.9rem',color:'rgba(255,255,255,0.55)'}}>
            Don't have an account?{' '}
            <Link to="/register" style={{color:'#c9a84c',fontWeight:600,textDecoration:'none'}}>
              Register here
            </Link>
          </p>
        </div>

        <p style={{textAlign:'center',marginTop:20,fontSize:'0.82rem',color:'rgba(255,255,255,0.35)'}}>
          <Link to="/" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none'}}>← Back to Website</Link>
        </p>
      </div>
    </div>
  )
}