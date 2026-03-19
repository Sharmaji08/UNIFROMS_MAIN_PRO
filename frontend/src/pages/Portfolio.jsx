// src/pages/Portfolio.jsx
import Layout from '../components/common/Layout'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const PORTFOLIO = [
  { id:1, client:'The Grand Palace Hotel', industry:'Hospitality', qty:200, year:2023, desc:'Complete uniform solution: front desk, housekeeping, F&B, and concierge staff. Navy & gold theme with embroidered crest.', tags:['Hotel','Embroidery','Premium'] },
  { id:2, client:'DPS International School', industry:'Education', qty:1500, year:2023, desc:'Annual school uniform supply for 1,500 students across all grades. Custom crest embroidery, summer & winter variants.', tags:['School','Bulk','Embroidery'] },
  { id:3, client:'Apollo Diagnostics Network', industry:'Healthcare', qty:350, year:2023, desc:'Antimicrobial scrubs, lab coats, and reception uniforms for 12 diagnostic centers across Delhi NCR.', tags:['Medical','Multi-location','Antimicrobial'] },
  { id:4, client:'Spice Route Restaurant Group', industry:'F&B', qty:180, year:2022, desc:'Chef coats, server uniforms and aprons for 8 restaurant outlets. Custom embroidered logo across all items.', tags:['Restaurant','Chef','Embroidery'] },
  { id:5, client:'Tata Motors Factory Manesar', industry:'Industrial', qty:500, year:2022, desc:'EN ISO 20471 hi-vis workwear for factory floor and warehouse staff. Flame retardant fabric with reflective strips.', tags:['Factory','Hi-Vis','Safety'] },
  { id:6, client:'Infosys Campus Gurugram', industry:'Corporate', qty:800, year:2022, desc:'Corporate polo shirts with embroidered Infosys logo for 800 staff members. 8 color variants by department.', tags:['Corporate','Polo','Logo Print'] },
  { id:7, client:'G4S Security Services India', industry:'Security', qty:650, year:2023, desc:'Full security guard uniform set: shirt, trouser, beret, and winter jacket for 650 guards across NCR.', tags:['Security','Bulk','Winter Wear'] },
  { id:8, client:'Air India Ground Staff', industry:'Aviation', qty:300, year:2023, desc:'Premium ground staff uniforms with embroidered Air India logo. Navy blue formal set with gold accents.', tags:['Aviation','Premium','Formal'] },
  { id:9, client:'Fortis Hospital Network', industry:'Healthcare', qty:420, year:2024, desc:'Complete healthcare uniform solution: doctor coats, nurse scrubs, technician wear for 3 hospital branches.', tags:['Hospital','Multi-branch','Medical'] },
]

const TAGS = ['All', 'Hotel', 'School', 'Medical', 'Restaurant', 'Factory', 'Corporate', 'Security', 'Aviation']



export default function Portfolio() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? PORTFOLIO : PORTFOLIO.filter(p => p.tags.includes(active))


  return (
    <Layout>
      <div className="page-hero">
        <div className="container">
          <div className="subtitle" style={{color:'var(--gold)'}}>Our Work</div>
          <h1>Project Portfolio</h1>
          <p>A showcase of our completed uniform projects for leading organizations across India.</p>
        </div>
      </div>

      {/* Stats */}
      <section style={{background:'var(--off-white)',padding:'40px 0',borderBottom:'1px solid var(--gray-200)'}}>
        <div className="container">
          <div style={{display:'flex',justifyContent:'center',gap:'48px',flexWrap:'wrap'}}>
            {[['500+','Organizations Served'],['50K+','Uniforms Delivered'],['8+','Industries Covered'],['15+','Years Experience']].map(([n,l]) => (
              <div key={l} style={{textAlign:'center'}}>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:800,color:'var(--gold)'}}>{n}</div>
                <div style={{fontSize:'0.85rem',color:'var(--gray-400)'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Filter */}
          <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:48}}>
            {TAGS.map(t => (
              <button key={t} onClick={() => setActive(t)}
                style={{
                  padding:'8px 20px',borderRadius:30,fontWeight:600,fontSize:'0.88rem',
                  cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit',
                  background: active === t ? 'var(--gold)' : 'transparent',
                  color: active === t ? 'var(--navy)' : 'var(--gray-600)',
                  border: `2px solid ${active === t ? 'var(--gold)' : 'var(--gray-200)'}`,
                }}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map(p => (
              <div key={p.id} className="card">
                {/* Header visual */}
                <div style={{
                  height:160,background:'linear-gradient(135deg,var(--navy),var(--navy-light))',
                  display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',
                }}>
                  <div style={{position:'absolute',inset:0,opacity:0.05,backgroundImage:
                    'radial-gradient(circle,#fff 1px,transparent 1px)',backgroundSize:'20px 20px'}} />
                  <div style={{
                    width:70,height:70,borderRadius:'50%',
                    background:'rgba(201,168,76,0.15)',border:'1px solid rgba(201,168,76,0.4)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    fontFamily:'Playfair Display,serif',fontWeight:800,fontSize:'1.8rem',color:'var(--gold)',
                    zIndex:1,
                  }}>{p.client[0]}</div>
                  <div style={{position:'absolute',top:12,right:12}}>
                    <span className="badge" style={{background:'rgba(201,168,76,0.2)',color:'var(--gold-light)',fontSize:'0.72rem'}}>
                      {p.year}
                    </span>
                  </div>
                </div>

                <div style={{padding:'24px'}}>
                  <div style={{marginBottom:8}}>
                    <span className="badge badge-gold">{p.industry}</span>
                  </div>
                  <h4 style={{marginBottom:8}}>{p.client}</h4>
                  <p style={{fontSize:'0.88rem',marginBottom:16}}>{p.desc}</p>

                  <div style={{
                    display:'flex',justifyContent:'space-between',alignItems:'center',
                    padding:'12px 0',borderTop:'1px solid var(--gray-200)',marginBottom:16,
                  }}>
                    <div style={{fontSize:'0.85rem',color:'var(--gray-600)'}}>
                      <strong style={{color:'var(--navy)'}}>{p.qty.toLocaleString()}</strong> uniforms
                    </div>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',justifyContent:'flex-end'}}>
                      {p.tags.slice(0,2).map(t => (
                        <span key={t} style={{fontSize:'0.72rem',padding:'2px 8px',borderRadius:20,
                          background:'var(--off-white)',color:'var(--gray-600)',fontWeight:600}}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--navy)',padding:'64px 0',textAlign:'center'}}>
        <div className="container">
          <h2 style={{color:'#fff',marginBottom:16}}>Ready to Start Your Project?</h2>
          <p style={{color:'rgba(255,255,255,0.7)',marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>
            Join 500+ satisfied clients. Get a free quote within 48 hours.
          </p>
          <Link to="/bulk-order" className="btn btn-primary" style={{fontSize:'1.05rem',padding:'16px 40px'}}>
            Request a Free Quote
          </Link>
        </div>
      </section>
    </Layout>
  )
}
