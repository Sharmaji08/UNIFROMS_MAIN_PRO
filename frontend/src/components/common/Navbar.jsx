// src/components/common/Navbar.jsx
import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const navLinks = [
    { to: '/',           label: 'Home' },
    { to: '/about',      label: 'About' },
    { to: '/industries', label: 'Industries' },
    { to: '/products',   label: 'Products' },
    { to: '/portfolio',  label: 'Portfolio' },
    { to: '/contact',    label: 'Contact' },
  ]

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 900;
          transition: all 0.35s ease;
          padding: 0 24px;
        }
        .navbar.scrolled {
          background: rgba(10,22,40,0.97);
          backdrop-filter: blur(12px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25);
        }
        .navbar.top { background: transparent; }
        .nav-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-logo-icon {
          width: 40px; height: 40px; border-radius: 8px;
          background: linear-gradient(135deg, #c9a84c, #e8c97a);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; font-weight: 800; color: #0a1628;
          font-family: 'Playfair Display', serif;
        }
        .nav-logo-text { display: flex; flex-direction: column; line-height: 1; }
        .nav-logo-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem; font-weight: 700; color: #fff;
          letter-spacing: 0.02em;
        }
        .nav-logo-tag {
          font-size: 0.62rem; color: #c9a84c; letter-spacing: 0.15em;
          text-transform: uppercase; font-weight: 600;
        }
        .nav-links {
          display: flex; align-items: center; gap: 8px;
          list-style: none; margin: 0; padding: 0;
        }
        .nav-links a {
          padding: 8px 14px; border-radius: 6px;
          color: rgba(255,255,255,0.82); font-size: 0.9rem; font-weight: 500;
          text-decoration: none; transition: all 0.2s;
        }
        .nav-links a:hover, .nav-links a.active {
          color: #c9a84c; background: rgba(201,168,76,0.1);
        }
        .nav-actions { display: flex; align-items: center; gap: 10px; }
        .nav-btn {
          padding: 9px 20px; border-radius: 7px;
          font-size: 0.88rem; font-weight: 600;
          text-decoration: none; transition: all 0.2s; cursor: pointer;
        }
        .nav-btn-ghost {
          color: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.25);
        }
        .nav-btn-ghost:hover { border-color: #c9a84c; color: #c9a84c; }
        .nav-btn-gold {
          background: linear-gradient(135deg,#c9a84c,#e8c97a);
          color: #0a1628; box-shadow: 0 4px 16px rgba(201,168,76,0.3);
        }
        .nav-btn-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(201,168,76,0.4); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 4px;
        }
        .hamburger span {
          display: block; width: 24px; height: 2px;
          background: #fff; border-radius: 2px; transition: all 0.3s;
        }
        .mobile-menu {
          display: none; position: fixed; top: 72px; left: 0; right: 0;
          background: rgba(10,22,40,0.98); backdrop-filter: blur(12px);
          flex-direction: column; padding: 16px; border-top: 1px solid rgba(201,168,76,0.2);
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a {
          padding: 14px 16px; color: rgba(255,255,255,0.85);
          text-decoration: none; font-weight: 500; border-radius: 8px;
          transition: all 0.2s;
        }
        .mobile-menu a:hover { background: rgba(201,168,76,0.12); color: #c9a84c; }
        .mobile-menu .divider { height: 1px; background: rgba(255,255,255,0.1); margin: 8px 0; }
        @media (max-width: 900px) {
          .nav-links, .nav-actions { display: none; }
          .hamburger { display: flex; }
        }
        .user-chip {
          display: flex; align-items: center; gap: 8px;
          padding: 6px 12px; border-radius: 20px;
          background: rgba(201,168,76,0.12); border: 1px solid rgba(201,168,76,0.3);
          color: #c9a84c; font-size: 0.85rem; font-weight: 600;
        }
        .avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: linear-gradient(135deg,#c9a84c,#e8c97a);
          display: flex; align-items: center; justify-content: center;
          color: #0a1628; font-weight: 700; font-size: 0.75rem;
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : 'top'}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">U</div>
            <div className="nav-logo-text">
              <span className="nav-logo-name">UniformsPro</span>
              <span className="nav-logo-tag">Premium Manufacturer</span>
            </div>
          </Link>

          <ul className="nav-links">
            {navLinks.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className={({isActive}) => isActive ? 'active' : ''}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {user ? (
              <>
                <div className="user-chip">
                  <div className="avatar">{user.name?.[0]?.toUpperCase() || 'U'}</div>
                  {user.name?.split(' ')[0]}
                </div>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/dashboard'}
                  className="nav-btn nav-btn-ghost"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="nav-btn nav-btn-ghost" style={{background:'none',fontFamily:'inherit'}}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login"    className="nav-btn nav-btn-ghost">Login</Link>
                <Link to="/bulk-order" className="nav-btn nav-btn-gold">Request Quote</Link>
              </>
            )}
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(l => (
          <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}>{l.label}</Link>
        ))}
        <div className="divider" />
        {user ? (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
            <button onClick={handleLogout} style={{padding:'14px 16px',color:'rgba(255,255,255,0.7)',textAlign:'left',fontFamily:'inherit',fontSize:'1rem',background:'none',border:'none',cursor:'pointer'}}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login"      onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register"   onClick={() => setMenuOpen(false)}>Register</Link>
            <Link to="/bulk-order" onClick={() => setMenuOpen(false)} style={{color:'#c9a84c',fontWeight:700}}>
              Request a Quote →
            </Link>
          </>
        )}
      </div>
    </>
  )
}
