// src/pages/About.jsx
import Layout from '../components/common/Layout'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <Layout>
      <div className="page-hero">
        <div className="container">
          <div className="subtitle" style={{color:'var(--gold)'}}>Our Story</div>
          <h1>About UniformsPro</h1>
          <p>Manufacturing excellence since 2008 — crafting uniforms that define professionalism across India.</p>
        </div>
      </div>

      {/* Intro */}
      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:64,alignItems:'center'}}>
            <div>
              <div className="subtitle">Who We Are</div>
              <div className="accent-line" />
              <h2 style={{marginBottom:20}}>India's Premier Bulk Uniform Partner</h2>
              <p style={{marginBottom:16}}>
                Founded in 2008 in Gurugram, Haryana, UniformsPro has grown from a small tailoring unit into one of India's most trusted bulk uniform manufacturers. We serve 500+ clients across hospitality, education, healthcare, F&B, industrial, and corporate sectors.
              </p>
              <p style={{marginBottom:16}}>
                Our 45,000 sq. ft. state-of-the-art manufacturing facility is equipped with the latest cutting, stitching, embroidery and quality control machinery, capable of producing over 50,000 uniforms per year.
              </p>
              <p style={{marginBottom:32}}>
                We are ISO 9001:2015 certified and a registered MSME under the Government of India, ensuring our clients receive quality products at competitive prices.
              </p>
              <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
                {[['2008','Founded'],['500+','Happy Clients'],['50K+','Uniforms/Year'],['45K sqft','Facility']].map(([n,l]) => (
                  <div key={l} style={{textAlign:'center'}}>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',fontWeight:800,color:'var(--gold)'}}>{n}</div>
                    <div style={{fontSize:'0.8rem',color:'var(--gray-400)'}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              {[
                {icon:'🏭',bg:'#102040',title:'Modern Facility',sub:'Gurugram, Haryana'},
                {icon:'✅',bg:'#7a5c00',title:'ISO 9001:2015',sub:'Certified Quality'},
                {icon:'🇮🇳',bg:'#1a4731',title:'Make in India',sub:'100% Domestic'},
                {icon:'🤝',bg:'#4a1942',title:'MSME Registered',sub:'Govt. Certified'},
              ].map(c => (
                <div key={c.title} style={{
                  padding:28,borderRadius:16,
                  background:`${c.bg}`,display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',gap:12,
                }}>
                  <span style={{fontSize:'2.5rem'}}>{c.icon}</span>
                  <div style={{fontWeight:700,color:'#fff',fontSize:'0.95rem'}}>{c.title}</div>
                  <div style={{fontSize:'0.8rem',color:'rgba(255,255,255,0.6)'}}>{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="section section--light">
        <div className="container">
          <div className="section-header">
            <div className="subtitle">How We Work</div>
            <div className="accent-line" />
            <h2>Our Production Process</h2>
            <p>A meticulous 7-step process ensures every uniform meets our exacting quality standards before reaching you.</p>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:0,maxWidth:800,margin:'0 auto'}}>
            {[
              {n:'01',icon:'📋',title:'Requirement Analysis',desc:'We carefully analyze your specifications: industry, quantity, fabric preferences, color, sizing requirements, and customization needs.'},
              {n:'02',icon:'🎨',title:'Design & Sampling',desc:'Our design team creates digital mockups and a physical sample for your approval before mass production begins.'},
              {n:'03',icon:'🧵',title:'Fabric Sourcing',desc:'We source premium fabrics from certified mills across India based on the approved specifications.'},
              {n:'04',icon:'✂️',title:'Cutting & Stitching',desc:'Computer-aided cutting for precision, followed by skilled stitching on industrial machines calibrated for the specific uniform type.'},
              {n:'05',icon:'🖨️',title:'Embroidery & Printing',desc:'Logo embroidery, screen printing or heat transfer is applied using industrial-grade equipment for lasting results.'},
              {n:'06',icon:'🔍',title:'Quality Control',desc:'Every piece goes through a 12-point quality check covering stitching, fabric, dimensions, colorfastness, and finishing.'},
              {n:'07',icon:'🚚',title:'Packaging & Dispatch',desc:'Uniforms are individually packed, labeled, and dispatched via tracked courier with full insurance coverage.'},
            ].map((s, i) => (
              <div key={s.n} style={{
                display:'flex',gap:24,paddingBottom:32,
                borderLeft:`2px solid ${i === 6 ? 'transparent' : 'rgba(201,168,76,0.3)'}`,
                marginLeft:20,paddingLeft:32,position:'relative',
              }}>
                <div style={{
                  position:'absolute',left:-22,top:0,
                  width:44,height:44,borderRadius:'50%',
                  background:'linear-gradient(135deg,var(--gold),var(--gold-light))',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:'1.2rem',flexShrink:0,
                }}>{s.icon}</div>
                <div style={{paddingLeft:8}}>
                  <span style={{fontSize:'0.75rem',fontWeight:700,color:'var(--gold)',letterSpacing:'0.1em'}}>STEP {s.n}</span>
                  <h4 style={{marginTop:4,marginBottom:8}}>{s.title}</h4>
                  <p style={{fontSize:'0.93rem'}}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="subtitle">Leadership</div>
            <div className="accent-line" />
            <h2>Meet Our Team</h2>
          </div>
          <div className="grid-3">
            {[
              {name:'Rajesh Kumar',role:'Founder & CEO',exp:'20+ years in textile manufacturing',avatar:'R'},
              {name:'Priya Sharma',role:'Head of Design',exp:'Ex-National Institute of Fashion Technology',avatar:'P'},
              {name:'Suresh Mehta',role:'Operations Director',exp:'Led production for 3 major uniform brands',avatar:'S'},
            ].map(m => (
              <div key={m.name} className="card" style={{padding:'32px',textAlign:'center'}}>
                <div style={{
                  width:80,height:80,borderRadius:'50%',
                  background:'linear-gradient(135deg,var(--navy),var(--navy-light))',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  margin:'0 auto 16px',
                  fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:800,color:'var(--gold)',
                }}>{m.avatar}</div>
                <h4 style={{marginBottom:4}}>{m.name}</h4>
                <div style={{color:'var(--gold)',fontWeight:600,fontSize:'0.88rem',marginBottom:8}}>{m.role}</div>
                <p style={{fontSize:'0.88rem'}}>{m.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:'var(--navy)',padding:'64px 0',textAlign:'center'}}>
        <div className="container">
          <h2 style={{color:'#fff',marginBottom:16}}>Partner With Us Today</h2>
          <p style={{color:'rgba(255,255,255,0.7)',marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>
            Join 500+ satisfied clients who trust UniformsPro for their bulk uniform needs.
          </p>
          <Link to="/bulk-order" className="btn btn-primary" style={{fontSize:'1.05rem',padding:'16px 40px'}}>
            Get a Free Quote
          </Link>
        </div>
      </section>
    </Layout>
  )
}
