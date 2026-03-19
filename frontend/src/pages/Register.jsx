// src/pages/Register.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({name:'',company:'',email:'',phone:'',password:'',confirm:''})
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const handleChange = e => setForm(f => ({...f, [e.target.name]: e.target.value}))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))

    const users = JSON.parse(localStorage.getItem('up_users') || '[]')
    if (users.find(u => u.email === form.email)) {
      setError('Email already registered. Please login.')
      setLoading(false)
      return
    }
    const newUser = { name:form.name, company:form.company, email:form.email, phone:form.phone, password:form.password, role:'user', joinDate: new Date().toISOString().split('T')[0] }
    users.push(newUser)
    localStorage.setItem('up_users', JSON.stringify(users))
    login({ name:form.name, email:form.email, role:'user', company:form.company })
    navigate('/dashboard')
    setLoading(false)
  }

  const inputStyle = {
    width:'100%',padding:'13px 16px',borderRadius:8,
    background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',
    color:'#fff',fontSize:'0.95rem',outline:'none',fontFamily:'inherit',
    transition:'border-color 0.2s',
  }

  return (
    <div style={{
      minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',
      background:'linear-gradient(135deg,#0a1628 0%,#102040 60%,#1a3560 100%)',
      padding:'24px',
    }}>
      <div style={{width:'100%',maxWidth:480}}>
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
              <div style={{fontSize:'0.65rem',color:'#c9a84c',letterSpacing:'0.15em',textTransform:'uppercase'}}>Create Account</div>
            </div>
          </Link>
        </div>

        <div style={{
          background:'rgba(255,255,255,0.04)',backdropFilter:'blur(20px)',
          border:'1px solid rgba(255,255,255,0.1)',borderRadius:20,padding:'40px',
        }}>
          <h2 style={{color:'#fff',textAlign:'center',marginBottom:8}}>Create Account</h2>
          <p style={{color:'rgba(255,255,255,0.55)',textAlign:'center',fontSize:'0.9rem',marginBottom:32}}>
            Register to place orders and track uniforms
          </p>

          {error && (
            <div style={{
              background:'rgba(198,40,40,0.15)',border:'1px solid rgba(198,40,40,0.4)',
              borderRadius:8,padding:'12px 16px',marginBottom:20,color:'#ffcdd2',fontSize:'0.88rem',
            }}>⚠ {error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              {[
                {label:'Full Name *',name:'name',type:'text',placeholder:'Your full name'},
                {label:'Company Name *',name:'company',type:'text',placeholder:'Your company'},
                {label:'Email Address *',name:'email',type:'email',placeholder:'email@company.com'},
                {label:'Phone Number *',name:'phone',type:'tel',placeholder:'+91 9XXXXXXXXX'},
                {label:'Password *',name:'password',type:'password',placeholder:'Min. 6 characters'},
                {label:'Confirm Password *',name:'confirm',type:'password',placeholder:'Repeat password'},
              ].map(f => (
                <div key={f.name} style={{gridColumn: f.name === 'name' || f.name === 'company' ? 'auto' : 'auto'}}>
                  <label style={{display:'block',fontSize:'0.85rem',fontWeight:600,color:'rgba(255,255,255,0.75)',marginBottom:6}}>
                    {f.label}
                  </label>
                  <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                    required placeholder={f.placeholder}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderColor='#c9a84c'}
                    onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.15)'}
                  />
                </div>
              ))}
            </div>

            <button type="submit" disabled={loading}
              style={{
                width:'100%',padding:'14px',borderRadius:10,marginTop:24,
                background:'linear-gradient(135deg,#c9a84c,#e8c97a)',
                color:'#0a1628',fontWeight:700,fontSize:'1rem',fontFamily:'inherit',
                cursor:'pointer',border:'none',transition:'all 0.2s',
                opacity:loading?0.7:1,
              }}>
              {loading ? '⏳ Creating Account...' : 'Create Account →'}
            </button>
          </form>

          <p style={{textAlign:'center',marginTop:24,fontSize:'0.9rem',color:'rgba(255,255,255,0.55)'}}>
            Already have an account?{' '}
            <Link to="/login" style={{color:'#c9a84c',fontWeight:600,textDecoration:'none'}}>Sign in</Link>
          </p>
        </div>

        <p style={{textAlign:'center',marginTop:20,fontSize:'0.82rem'}}>
          <Link to="/" style={{color:'rgba(255,255,255,0.4)',textDecoration:'none'}}>← Back to Website</Link>
        </p>
      </div>
    </div>
  )
}
