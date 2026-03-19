// src/pages/Industries.jsx
import Layout from '../components/common/Layout'
import { Link } from 'react-router-dom'
import { INDUSTRIES } from '../utils/data'

const industryDetails = {
  hotel:      { color:'#102040', uniforms:['Front Desk Suit','Concierge Uniform','Housekeeping Set','F&B Server Uniform','Spa Therapist Uniform','Bellboy Uniform'], stat:'100+ Hotels Served' },
  school:     { color:'#1a3a5c', uniforms:['School Shirt & Trousers','School Skirt','Sports Uniform','Blazer & Tie Set','Teacher Formal Wear','Sports Tracksuit'], stat:'80+ Schools Served' },
  hospital:   { color:'#0d3349', uniforms:['Doctor Scrubs','Nurse Uniform','Lab Coat','Surgical Gown','Hospital Housekeeping','Receptionist Attire'], stat:'60+ Hospitals Served' },
  restaurant: { color:'#1b0a00', uniforms:['Chef Coat','Chef Trousers','Server Uniform','Apron & Headgear','Manager Formal','Delivery Staff Jacket'], stat:'90+ Restaurants Served' },
  factory:    { color:'#1a1200', uniforms:['Hi-Vis Jacket','Safety Trousers','Anti-Static Uniform','Flame Retardant Wear','Forklift Operator Suit','Warehouse Vest'], stat:'70+ Factories Served' },
  corporate:  { color:'#0a2540', uniforms:['Corporate Polo','Formal Shirt','Office Trouser','Blazer','Reception Uniform','Corporate T-Shirt'], stat:'100+ Corporates Served' },
  security:   { color:'#1a1a1a', uniforms:['Security Shirt','Security Trousers','Guard Cap','Reflective Jacket','Shoulder Badge Set','Winter Guard Jacket'], stat:'50+ Security Firms Served' },
  airline:    { color:'#00142b', uniforms:['Cabin Crew Uniform','Ground Staff Uniform','Cargo Handler Jacket','Airport Security Vest','Pilot Shirt','Check-In Staff Uniform'], stat:'20+ Aviation Clients Served' },
}

export default function Industries() {
  return (
    <Layout>
      <div className="page-hero">
        <div className="container">
          <div className="subtitle" style={{color:'var(--gold)'}}>Sectors We Serve</div>
          <h1>Industries We Serve</h1>
          <p>Specialized uniform solutions for 8+ industries across India — crafted with industry-specific knowledge and requirements.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{display:'flex',flexDirection:'column',gap:64}}>
            {INDUSTRIES.map((ind, i) => {
              const details = industryDetails[ind.id] || {}
              return (
                <div key={ind.id} style={{
                  display:'grid',
                  gridTemplateColumns: i % 2 === 0 ? '1fr 2fr' : '2fr 1fr',
                  gap:48, alignItems:'center',
                }}>
                  {i % 2 !== 0 && (
                    <div>
                      <div className="subtitle" style={{marginBottom:8}}>{ind.icon} {ind.name}</div>
                      <div className="accent-line" />
                      <h2 style={{marginBottom:16}}>{ind.name} Uniforms</h2>
                      <p style={{marginBottom:24,fontSize:'1.02rem'}}>{ind.desc}</p>
                      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24}}>
                        {(details.uniforms || []).map(u => (
                          <span key={u} className="badge badge-gold">{u}</span>
                        ))}
                      </div>
                      <div style={{
                        padding:'16px 20px',borderRadius:12,
                        background:'var(--off-white)',display:'inline-flex',alignItems:'center',gap:12,
                        marginBottom:24,
                      }}>
                        <span style={{fontSize:'1.4rem'}}>✅</span>
                        <strong style={{color:'var(--navy)',fontSize:'0.95rem'}}>{details.stat}</strong>
                      </div>
                      <div><Link to="/bulk-order" className="btn btn-primary">Request Quote</Link></div>
                    </div>
                  )}

                  <div style={{
                    background:`linear-gradient(135deg,${details.color || '#102040'} 0%,#1a3560 100%)`,
                    borderRadius:20, padding:48,
                    display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                    minHeight:300, textAlign:'center', position:'relative', overflow:'hidden',
                  }}>
                    <div style={{position:'absolute',inset:0,opacity:0.05,backgroundImage:
                      'radial-gradient(circle,rgba(201,168,76,0.8) 1px,transparent 1px)',backgroundSize:'28px 28px'}} />
                    <div style={{fontSize:'5rem',marginBottom:16,position:'relative',zIndex:1}}>{ind.icon}</div>
                    <h3 style={{color:'#fff',position:'relative',zIndex:1}}>{ind.name}</h3>
                    <p style={{color:'rgba(255,255,255,0.65)',position:'relative',zIndex:1,marginTop:8,fontSize:'0.9rem'}}>
                      {details.stat}
                    </p>
                  </div>

                  {i % 2 === 0 && (
                    <div>
                      <div className="subtitle" style={{marginBottom:8}}>{ind.icon} {ind.name}</div>
                      <div className="accent-line" />
                      <h2 style={{marginBottom:16}}>{ind.name} Uniforms</h2>
                      <p style={{marginBottom:24,fontSize:'1.02rem'}}>{ind.desc}</p>
                      <div style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:24}}>
                        {(details.uniforms || []).map(u => (
                          <span key={u} className="badge badge-gold">{u}</span>
                        ))}
                      </div>
                      <div style={{
                        padding:'16px 20px',borderRadius:12,
                        background:'var(--off-white)',display:'inline-flex',alignItems:'center',gap:12,
                        marginBottom:24,
                      }}>
                        <span style={{fontSize:'1.4rem'}}>✅</span>
                        <strong style={{color:'var(--navy)',fontSize:'0.95rem'}}>{details.stat}</strong>
                      </div>
                      <div><Link to="/bulk-order" className="btn btn-primary">Request Quote</Link></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--off-white)',padding:'64px 0',textAlign:'center'}}>
        <div className="container">
          <h2 style={{marginBottom:16}}>Don't See Your Industry?</h2>
          <p style={{marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>
            We manufacture uniforms for virtually any sector. Contact us to discuss your specific requirements.
          </p>
          <Link to="/contact" className="btn btn-navy">Contact Our Team</Link>
        </div>
      </section>
    </Layout>
  )
}
