// src/components/common/Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{background:'var(--navy)', color:'rgba(255,255,255,0.75)', paddingTop:'64px'}}>
      <style>{`
        .footer-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px; max-width: 1200px; margin: 0 auto; padding: 0 24px;
        }
        @media(max-width:900px){ .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
        @media(max-width:560px){ .footer-grid { grid-template-columns: 1fr; } }
        .footer-brand p { line-height: 1.75; margin-top: 16px; font-size:0.92rem; }
        .footer-col h5 {
          color: #fff; font-family:'Playfair Display',serif; font-size:1rem;
          margin-bottom:16px; font-weight:600;
        }
        .footer-col ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
        .footer-col ul li a { color:rgba(255,255,255,0.68); font-size:0.9rem; text-decoration:none; transition:color 0.2s; }
        .footer-col ul li a:hover { color:#c9a84c; }
        .contact-item { display:flex; align-items:flex-start; gap:10px; margin-bottom:12px; font-size:0.9rem; }
        .contact-icon { font-size:1rem; margin-top:2px; flex-shrink:0; }
        .footer-bottom {
          margin-top:48px; padding:20px 24px;
          border-top:1px solid rgba(255,255,255,0.08);
          display:flex; align-items:center; justify-content:space-between;
          max-width:1200px; margin-left:auto; margin-right:auto;
          flex-wrap:wrap; gap:12px;
        }
        .footer-bottom p { font-size:0.82rem; color:rgba(255,255,255,0.45); margin:0; }
        .footer-socials { display:flex; gap:12px; }
        .social-btn {
          width:34px; height:34px; border-radius:8px;
          background:rgba(255,255,255,0.07); display:flex; align-items:center;
          justify-content:center; color:rgba(255,255,255,0.6); font-size:0.85rem;
          text-decoration:none; transition:all 0.2s; font-weight:700;
        }
        .social-btn:hover { background:rgba(201,168,76,0.2); color:#c9a84c; }
        .gold-bar { height:3px; background:linear-gradient(90deg,#c9a84c,#e8c97a,#c9a84c); width:100%; }
      `}</style>

      <div className="gold-bar" />

      <div style={{padding:'48px 0 0'}}>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" style={{display:'flex',alignItems:'center',gap:'10px',textDecoration:'none'}}>
              <div style={{width:40,height:40,borderRadius:8,background:'linear-gradient(135deg,#c9a84c,#e8c97a)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Playfair Display,serif',fontWeight:800,color:'#0a1628',fontSize:'1.2rem'}}>U</div>
              <div>
                <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'#fff',fontSize:'1.2rem'}}>UniformsPro</div>
                <div style={{fontSize:'0.6rem',color:'#c9a84c',letterSpacing:'0.15em',textTransform:'uppercase'}}>Premium Manufacturer</div>
              </div>
            </Link>
            <p>India's trusted bulk uniform manufacturer serving hotels, schools, hospitals, restaurants, factories and corporate businesses since 2008.</p>
            <div style={{display:'flex',gap:'12px',marginTop:'20px',flexWrap:'wrap'}}>
              {['ISO 9001', 'Make in India', 'MSME Registered'].map(b => (
                <span key={b} style={{padding:'4px 10px',borderRadius:'20px',border:'1px solid rgba(201,168,76,0.35)',color:'#c9a84c',fontSize:'0.72rem',fontWeight:600,letterSpacing:'0.05em'}}>{b}</span>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h5>Quick Links</h5>
            <ul>
              {[['/','/'],['About','/about'],['Industries','/industries'],['Products','/products'],['Portfolio','/portfolio'],['Bulk Order','/bulk-order']].map(([l,h]) => (
                <li key={h}><Link to={h}>{l === '/' ? 'Home' : l}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Industries</h5>
            <ul>
              {['Hotels & Hospitality','Schools & Colleges','Hospitals & Clinics','Restaurants & Cafes','Factories','Corporate Offices','Security Services'].map(i => (
                <li key={i}><Link to="/industries">{i}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h5>Contact</h5>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>Plot 42, Industrial Area Phase-2, Gurugram, Haryana 122001</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <a href="tel:+911800123456" style={{color:'inherit',textDecoration:'none'}}>+91 1800 123 456</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">✉️</span>
              <a href="mailto:info@uniformspro.com" style={{color:'inherit',textDecoration:'none'}}>info@uniformspro.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">🕐</span>
              <span>Mon–Sat: 9AM – 6PM IST</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom" style={{marginTop:'40px',paddingTop:'20px',borderTop:'1px solid rgba(255,255,255,0.08)'}}>
          <p>© {new Date().getFullYear()} UniformsPro. All rights reserved.</p>
          <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
            <Link to="/contact" style={{color:'rgba(255,255,255,0.45)',fontSize:'0.82rem',textDecoration:'none'}}>Privacy Policy</Link>
            <Link to="/contact" style={{color:'rgba(255,255,255,0.45)',fontSize:'0.82rem',textDecoration:'none'}}>Terms of Service</Link>
            <Link to="/contact" style={{color:'rgba(255,255,255,0.45)',fontSize:'0.82rem',textDecoration:'none'}}>Sitemap</Link>
          </div>
          <div className="footer-socials">
            {['Li','Tw','Fb','In'].map(s => (
              <a key={s} href="#" className="social-btn">{s}</a>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp float */}
      <a href="https://wa.me/911800123456?text=Hi, I'm interested in bulk uniforms" target="_blank" rel="noopener noreferrer" className="whatsapp-float" title="Chat on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </footer>
  )
}
