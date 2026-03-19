// src/pages/Home.jsx
import { Link } from 'react-router-dom'
import Layout from '../components/common/Layout'
import { INDUSTRIES, PRODUCTS, TESTIMONIALS, CLIENTS } from '../utils/data'

/* ---------- Uniform SVG placeholder images ---------- */
const UniformIcon = ({ type }) => {
  const colors = {
    hotel: ['#1a3560','#c9a84c'], school: ['#1565c0','#fff'],
    hospital: ['#fff','#0d47a1'], restaurant: ['#1b0000','#fff'],
    factory: ['#e65100','#fff'], corporate: ['#0a1628','#c9a84c'],
    security: ['#1a1a1a','#c9a84c'], default: ['#c9a84c','#0a1628'],
  }
  const [bg, fg] = colors[type] || colors.default
  return (
    <svg viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="140" rx="8" fill={bg} opacity="0.12"/>
      <rect x="30" y="20" width="60" height="70" rx="6" fill={bg} opacity="0.7"/>
      <rect x="45" y="90" width="30" height="40" rx="4" fill={bg} opacity="0.5"/>
      <circle cx="60" cy="35" r="12" fill={fg} opacity="0.8"/>
      <rect x="38" y="50" width="44" height="6" rx="3" fill={fg} opacity="0.5"/>
      <rect x="42" y="62" width="36" height="4" rx="2" fill={fg} opacity="0.35"/>
    </svg>
  )
}

export default function Home() {
  return (
    <Layout>
      {/* ===== HERO ===== */}
      <section style={{
        minHeight:'100vh', background:'linear-gradient(135deg, #0a1628 0%, #102040 60%, #1a3560 100%)',
        display:'flex', alignItems:'center', position:'relative', overflow:'hidden',
      }}>
        {/* Decorative orbs */}
        <div style={{position:'absolute',top:'-10%',right:'-5%',width:600,height:600,
          borderRadius:'50%',background:'radial-gradient(circle,rgba(201,168,76,0.12) 0%,transparent 70%)'}} />
        <div style={{position:'absolute',bottom:'-15%',left:'-10%',width:500,height:500,
          borderRadius:'50%',background:'radial-gradient(circle,rgba(26,53,96,0.6) 0%,transparent 70%)'}} />

        {/* Grid pattern */}
        <div style={{position:'absolute',inset:0,opacity:0.04,backgroundImage:
          'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize:'60px 60px'}} />

        <div className="container" style={{position:'relative',zIndex:2,padding:'40px 24px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'center'}}>
            <div className="animate-fade-up">
              <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 16px',
                borderRadius:20,border:'1px solid rgba(201,168,76,0.35)',marginBottom:24,
                background:'rgba(201,168,76,0.08)'}}>
                <span style={{width:6,height:6,borderRadius:'50%',background:'#c9a84c',display:'inline-block'}} />
                <span style={{color:'#c9a84c',fontSize:'0.78rem',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase'}}>
                  India's Premier Uniform Manufacturer
                </span>
              </div>

              <h1 style={{color:'#fff',marginBottom:20,lineHeight:1.1}}>
                Premium Bulk Uniforms for{' '}
                <span style={{background:'linear-gradient(135deg,#c9a84c,#e8c97a)',WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent', display:'block'}}>
                  Every Industry
                </span>
              </h1>

              <p style={{color:'rgba(255,255,255,0.72)',fontSize:'1.1rem',lineHeight:1.8,marginBottom:36,maxWidth:520}}>
                Hotels, Schools, Hospitals, Restaurants, Factories &amp; Corporate — trusted by 500+ organizations across India.
                Custom embroidery, logo printing &amp; bulk delivery in 15–21 days.
              </p>

              <div style={{display:'flex',gap:16,flexWrap:'wrap',marginBottom:48}}>
                <Link to="/bulk-order" className="btn btn-primary" style={{fontSize:'1rem',padding:'16px 36px'}}>
                  Request a Quote →
                </Link>
                <Link to="/products" className="btn btn-outline" style={{fontSize:'1rem',padding:'16px 36px'}}>
                  View Products
                </Link>
              </div>

              <div style={{display:'flex',gap:32,flexWrap:'wrap'}}>
                {[['500+','Clients Served'],['15+','Years Experience'],['50K+','Uniforms/Year'],['48hr','Quote Turnaround']].map(([n,l]) => (
                  <div key={l}>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',fontWeight:800,color:'#c9a84c'}}>{n}</div>
                    <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.55)',marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-up animate-delay-2" style={{display:'flex',justifyContent:'center',position:'relative'}}>
              <div style={{
                width:420,height:420,borderRadius:'50%',
                background:'radial-gradient(circle,rgba(201,168,76,0.1) 0%,transparent 70%)',
                display:'flex',alignItems:'center',justifyContent:'center',position:'relative',
              }}>
                {/* Rotating ring */}
                <div style={{position:'absolute',inset:0,borderRadius:'50%',
                  border:'1px solid rgba(201,168,76,0.2)',animation:'spin 20s linear infinite'}} />
                <div style={{position:'absolute',inset:20,borderRadius:'50%',
                  border:'1px dashed rgba(201,168,76,0.15)',animation:'spin 15s linear infinite reverse'}} />

                {/* Industry icons orbiting */}
                {['🏨','🎓','🏥','🍽️','🏭','🏢'].map((icon, i) => {
                  const angle = (i / 6) * 360
                  const rad = (angle * Math.PI) / 180
                  const r = 160
                  const x = Math.cos(rad) * r
                  const y = Math.sin(rad) * r
                  return (
                    <div key={i} style={{
                      position:'absolute',
                      left:`calc(50% + ${x}px)`, top:`calc(50% + ${y}px)`,
                      transform:'translate(-50%,-50%)',
                      width:52,height:52,borderRadius:12,
                      background:'rgba(255,255,255,0.07)',
                      backdropFilter:'blur(8px)',
                      border:'1px solid rgba(201,168,76,0.2)',
                      display:'flex',alignItems:'center',justifyContent:'center',
                      fontSize:'1.5rem',
                    }}>{icon}</div>
                  )
                })}

                {/* Center badge */}
                <div style={{
                  width:140,height:140,borderRadius:'50%',
                  background:'linear-gradient(135deg,#c9a84c,#e8c97a)',
                  display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
                  boxShadow:'0 8px 40px rgba(201,168,76,0.4)',
                  zIndex:2,
                }}>
                  <div style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:800,color:'#0a1628'}}>U</div>
                  <div style={{fontSize:'0.6rem',fontWeight:700,color:'#0a1628',letterSpacing:'0.1em',textTransform:'uppercase'}}>Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div style={{position:'absolute',bottom:0,left:0,right:0}}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{display:'block',height:80}}>
            <path d="M0,80L1440,80L1440,0 Q720,80 0,0Z" fill="#ffffff"/>
          </svg>
        </div>

        <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section style={{background:'#fff',padding:'32px 0',borderBottom:'1px solid var(--gray-200)'}}>
        <div className="container">
          <p style={{textAlign:'center',fontSize:'0.78rem',color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.15em',marginBottom:20}}>
            Trusted by leading organizations
          </p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'32px',flexWrap:'wrap'}}>
            {CLIENTS.slice(0,8).map(c => (
              <span key={c} style={{fontSize:'0.88rem',fontWeight:600,color:'var(--gray-400)',whiteSpace:'nowrap'}}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== INDUSTRIES ===== */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <div className="subtitle">Industries We Serve</div>
            <div className="accent-line" />
            <h2>Uniform Solutions for Every Sector</h2>
            <p>From luxury hotels to industrial factories, we manufacture precision-crafted uniforms tailored to each industry's unique requirements.</p>
          </div>
          <div className="grid-4">
            {INDUSTRIES.map((ind, i) => (
              <Link to="/industries" key={ind.id}
                style={{textDecoration:'none',animationDelay:`${i*0.07}s`}}
                className="animate-fade-up">
                <div className="card" style={{padding:'28px 24px',textAlign:'center',height:'100%',cursor:'pointer'}}>
                  <div style={{fontSize:'2.5rem',marginBottom:16}}>{ind.icon}</div>
                  <h4 style={{marginBottom:10,color:'var(--navy)'}}>{ind.name}</h4>
                  <p style={{fontSize:'0.88rem',lineHeight:1.65}}>{ind.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <Link to="/industries" className="btn btn-navy">Explore All Industries</Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="subtitle">Our Products</div>
            <div className="accent-line" />
            <h2>Uniform Categories</h2>
            <p>Browse our comprehensive range of professional uniforms across all sectors, fully customizable to your brand.</p>
          </div>
          <div className="grid-3">
            {PRODUCTS.slice(0,6).map((p,i) => (
              <div key={p.id} className="card animate-fade-up" style={{animationDelay:`${i*0.08}s`}}>
                <div style={{
                  height:180,background:'linear-gradient(135deg,var(--navy) 0%,var(--navy-light) 100%)',
                  display:'flex',alignItems:'center',justifyContent:'center',padding:20,
                }}>
                  <UniformIcon type={p.img} />
                </div>
                <div style={{padding:'20px 24px'}}>
                  <span className="badge badge-gold" style={{marginBottom:10}}>{p.category}</span>
                  <h4 style={{marginBottom:6}}>{p.name}</h4>
                  <p style={{fontSize:'0.88rem',marginBottom:16}}>{p.desc}</p>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <div>
                      <span style={{fontFamily:'Playfair Display,serif',fontSize:'1.2rem',fontWeight:700,color:'var(--navy)'}}>
                        {p.price}
                      </span>
                      <span style={{fontSize:'0.75rem',color:'var(--gray-400)',display:'block'}}>Min. {p.minQty} pcs</span>
                    </div>
                    <Link to="/bulk-order" className="btn btn-sm btn-primary">Order Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:40}}>
            <Link to="/products" className="btn btn-navy">View All Products</Link>
          </div>
        </div>
      </section>

      {/* ===== CUSTOMIZATION ===== */}
      <section className="section section--dark" style={{position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,opacity:0.03,backgroundImage:
          'radial-gradient(circle, rgba(201,168,76,0.8) 1px, transparent 1px)',backgroundSize:'32px 32px'}} />
        <div className="container" style={{position:'relative',zIndex:2}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
            <div>
              <div className="subtitle" style={{color:'var(--gold)'}}>Customization</div>
              <div className="accent-line" />
              <h2 style={{color:'#fff',marginBottom:20}}>Tailored to Your Brand Identity</h2>
              <p style={{marginBottom:32}}>
                Every organization is unique. Our customization service ensures your team's uniforms reflect your brand perfectly — from fabric choice to final embroidery.
              </p>
              {[
                ['🧵','Fabric Selection','Premium cotton, poly-cotton, wool blends, and technical fabrics tailored to each industry.'],
                ['🎨','Logo Embroidery','High-definition embroidery that holds its quality wash after wash.'],
                ['🖨️','Screen & Digital Print','Full-color logo printing with fade-resistant industrial inks.'],
                ['✂️','Custom Sizing','Full size range from XS–5XL including made-to-measure options.'],
                ['🏷️','Name Badges','Woven name tags, iron-on patches and custom labels.'],
              ].map(([icon,title,desc]) => (
                <div key={title} style={{display:'flex',gap:16,marginBottom:20}}>
                  <div style={{
                    width:48,height:48,borderRadius:12,flexShrink:0,
                    background:'rgba(201,168,76,0.12)',border:'1px solid rgba(201,168,76,0.25)',
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.3rem',
                  }}>{icon}</div>
                  <div>
                    <h4 style={{color:'#fff',marginBottom:4}}>{title}</h4>
                    <p style={{fontSize:'0.9rem'}}>{desc}</p>
                  </div>
                </div>
              ))}
              <Link to="/bulk-order" className="btn btn-primary" style={{marginTop:8}}>Start Customizing</Link>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:20}}>
              {[
                {step:'01',title:'Submit Requirements',desc:'Fill our detailed quote form with uniform type, quantity, and customization needs.'},
                {step:'02',title:'Get Design Preview',desc:'Our design team creates a digital mockup of your uniforms within 48 hours.'},
                {step:'03',title:'Approve & Produce',desc:'Once you approve the sample, we begin bulk production immediately.'},
                {step:'04',title:'Quality Check & Deliver',desc:'Every batch is quality-checked before delivery to your doorstep.'},
              ].map(s => (
                <div key={s.step} style={{
                  padding:'24px',borderRadius:12,
                  background:'rgba(255,255,255,0.04)',
                  border:'1px solid rgba(255,255,255,0.08)',
                  display:'flex',gap:20,alignItems:'flex-start',
                }}>
                  <span style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:800,color:'var(--gold)',opacity:0.6,lineHeight:1}}>{s.step}</span>
                  <div>
                    <h4 style={{color:'#fff',marginBottom:6}}>{s.title}</h4>
                    <p style={{fontSize:'0.9rem'}}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <div className="subtitle">Why UniformsPro</div>
            <div className="accent-line" />
            <h2>The Trusted Choice for Bulk Uniforms</h2>
          </div>
          <div className="grid-4">
            {[
              {icon:'🏭',title:'In-House Manufacturing',desc:'Complete control from fabric to finishing in our state-of-the-art Gurugram facility.'},
              {icon:'⚡',title:'Fast Turnaround',desc:'Bulk orders delivered in 15–21 days. Rush orders available in 7–10 days.'},
              {icon:'✅',title:'Quality Assured',desc:'ISO 9001 certified. Every batch undergoes strict QC before dispatch.'},
              {icon:'💰',title:'Competitive Pricing',desc:'Direct manufacturer pricing with volume discounts starting from 25+ units.'},
              {icon:'🌍',title:'Pan-India Delivery',desc:'Delivery across all Indian states with tracked shipping and doorstep delivery.'},
              {icon:'🔄',title:'Free Alterations',desc:'We handle minor alterations within 30 days of delivery at no extra cost.'},
              {icon:'📞',title:'Dedicated Account Manager',desc:'Every bulk client gets a dedicated account manager for seamless communication.'},
              {icon:'🎯',title:'Custom Minimum Orders',desc:'Minimum order from just 20 pieces. Scale up with flexible pricing tiers.'},
            ].map((f, i) => (
              <div key={f.title} className="card animate-fade-up" style={{padding:24,animationDelay:`${i*0.06}s`}}>
                <div style={{fontSize:'2rem',marginBottom:12}}>{f.icon}</div>
                <h4 style={{marginBottom:8}}>{f.title}</h4>
                <p style={{fontSize:'0.88rem'}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="subtitle">Client Reviews</div>
            <div className="accent-line" />
            <h2>What Our Clients Say</h2>
          </div>
          <div className="grid-2">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.name} className="card animate-fade-up" style={{padding:'32px',animationDelay:`${i*0.1}s`,position:'relative'}}>
                <div style={{fontSize:'4rem',lineHeight:1,color:'var(--gold)',opacity:0.2,fontFamily:'Georgia,serif',position:'absolute',top:16,left:24}}>"</div>
                <div style={{display:'flex',marginBottom:16,gap:3}}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{color:'#f59e0b',fontSize:'1rem'}}>★</span>)}
                </div>
                <p style={{fontSize:'0.97rem',lineHeight:1.8,marginBottom:24,position:'relative',zIndex:1}}>"{t.text}"</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{
                    width:44,height:44,borderRadius:'50%',
                    background:'linear-gradient(135deg,var(--navy),var(--navy-light))',
                    display:'flex',alignItems:'center',justifyContent:'center',
                    color:'#fff',fontWeight:700,fontSize:'1rem',fontFamily:'Playfair Display,serif',
                  }}>{t.name[0]}</div>
                  <div>
                    <div style={{fontWeight:700,color:'var(--navy)',fontSize:'0.95rem'}}>{t.name}</div>
                    <div style={{fontSize:'0.8rem',color:'var(--gray-400)'}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{
        background:'linear-gradient(135deg,#c9a84c 0%,#e8c97a 50%,#c9a84c 100%)',
        padding:'64px 0', textAlign:'center',
      }}>
        <div className="container">
          <h2 style={{color:'var(--navy)',marginBottom:16,fontSize:'2.2rem'}}>Ready to Outfit Your Team?</h2>
          <p style={{color:'rgba(10,22,40,0.75)',fontSize:'1.05rem',marginBottom:32,maxWidth:560,margin:'0 auto 32px'}}>
            Get a free quote within 48 hours. Minimum order just 20 pieces. Pan-India delivery.
          </p>
          <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/bulk-order" className="btn btn-navy" style={{fontSize:'1.05rem',padding:'16px 40px'}}>
              Request a Free Quote
            </Link>
            <a href="tel:+911800123456" className="btn" style={{background:'rgba(10,22,40,0.15)',color:'var(--navy)',border:'2px solid rgba(10,22,40,0.25)',fontSize:'1rem',padding:'16px 32px'}}>
              📞 Call Us Now
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
