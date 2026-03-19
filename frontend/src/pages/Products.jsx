// src/pages/Products.jsx
import { useState } from 'react'
import Layout from '../components/common/Layout'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../utils/data'

const CATEGORIES = ['All', ...new Set(PRODUCTS.map(p => p.category))]

export default function Products() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === active)

  return (
    <Layout>
      <div className="page-hero">
        <div className="container">
          <div className="subtitle" style={{color:'var(--gold)'}}>Our Catalog</div>
          <h1>Uniform Products</h1>
          <p>Explore our full range of professional uniforms — all customizable with your logo, colors, and branding.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Filter tabs */}
          <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:48}}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                style={{
                  padding:'10px 24px',borderRadius:30,fontWeight:600,fontSize:'0.9rem',
                  cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit',
                  background: active === cat ? 'var(--navy)' : 'var(--off-white)',
                  color: active === cat ? '#fff' : 'var(--gray-600)',
                  border: active === cat ? 'none' : '2px solid var(--gray-200)',
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map(p => (
              <div key={p.id} className="card" style={{display:'flex',flexDirection:'column'}}>
                {/* Image area */}
                <div style={{
                  height:200,
                  background:'linear-gradient(135deg,var(--navy) 0%,var(--navy-light) 100%)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  position:'relative',overflow:'hidden',
                }}>
                  <div style={{fontSize:'5rem',opacity:0.15,position:'absolute'}}>👔</div>
                  <div style={{position:'relative',zIndex:1,textAlign:'center'}}>
                    <div style={{
                      width:80,height:80,borderRadius:16,
                      background:'rgba(201,168,76,0.15)',
                      border:'1px solid rgba(201,168,76,0.3)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      margin:'0 auto 8px',fontSize:'2rem',
                    }}>👔</div>
                    <span className="badge badge-gold">{p.category}</span>
                  </div>
                </div>

                <div style={{padding:'24px',flex:1,display:'flex',flexDirection:'column'}}>
                  <h4 style={{marginBottom:8}}>{p.name}</h4>
                  <p style={{fontSize:'0.88rem',flex:1,marginBottom:16}}>{p.desc}</p>

                  {/* Colors */}
                  <div style={{marginBottom:16}}>
                    <span style={{fontSize:'0.78rem',fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.08em'}}>Available Colors: </span>
                    <span style={{fontSize:'0.85rem',color:'var(--navy)'}}>{p.colors.join(', ')}</span>
                  </div>

                  {/* Price & MOQ */}
                  <div style={{
                    display:'flex',alignItems:'center',justifyContent:'space-between',
                    padding:'12px 0',borderTop:'1px solid var(--gray-200)',marginBottom:16,
                  }}>
                    <div>
                      <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:700,color:'var(--gold)'}}>{p.price}</div>
                      <div style={{fontSize:'0.75rem',color:'var(--gray-400)'}}>per piece</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontWeight:700,color:'var(--navy)',fontSize:'0.95rem'}}>MOQ: {p.minQty}</div>
                      <div style={{fontSize:'0.75rem',color:'var(--gray-400)'}}>minimum order</div>
                    </div>
                  </div>

                  <Link to="/bulk-order" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization banner */}
      <section className="section--dark" style={{padding:'64px 0'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h2 style={{color:'#fff',marginBottom:16}}>Need Something Custom?</h2>
          <p style={{marginBottom:32,maxWidth:560,margin:'0 auto 32px'}}>
            Our design team will work with you to create completely custom uniform specifications — fabric, cut, color, logo placement, and more.
          </p>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/bulk-order" className="btn btn-primary">Request Custom Quote</Link>
            <a href="tel:+911800123456" className="btn btn-outline">📞 Speak to Designer</a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
