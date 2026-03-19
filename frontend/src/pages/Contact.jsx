// src/pages/Contact.jsx
import { useState } from 'react'
import Layout from '../components/common/Layout'

export default function Contact() {
  const [form, setForm] = useState({name:'',email:'',phone:'',company:'',subject:'',message:''})
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(f => ({...f,[e.target.name]:e.target.value}))
  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setSent(true)
    setLoading(false)
  }

  return (
    <Layout>
      <div className="page-hero">
        <div className="container">
          <div className="subtitle" style={{color:'var(--gold)'}}>Get In Touch</div>
          <h1>Contact Us</h1>
          <p>Reach out for bulk order inquiries, product questions, or partnership opportunities.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:64,alignItems:'flex-start'}}>

            {/* Contact info */}
            <div>
              <h3 style={{marginBottom:24}}>Contact Information</h3>
              {[
                {icon:'📍',title:'Factory & Office',lines:['Plot 42, Industrial Area Phase-2','Gurugram, Haryana 122001, India']},
                {icon:'📞',title:'Phone Numbers',lines:['+91 1800 123 456 (Toll Free)','+91 98765 43210 (WhatsApp)']},
                {icon:'✉️',title:'Email Addresses',lines:['info@uniformspro.com','orders@uniformspro.com']},
                {icon:'🕐',title:'Business Hours',lines:['Monday – Saturday: 9AM – 6PM','Sunday: Closed']},
              ].map(c => (
                <div key={c.title} style={{display:'flex',gap:16,marginBottom:28}}>
                  <div style={{
                    width:52,height:52,borderRadius:12,flexShrink:0,
                    background:'var(--off-white)',border:'1px solid var(--gray-200)',
                    display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.4rem',
                  }}>{c.icon}</div>
                  <div>
                    <h4 style={{marginBottom:6,fontSize:'0.95rem'}}>{c.title}</h4>
                    {c.lines.map(l => <p key={l} style={{fontSize:'0.92rem',margin:0,lineHeight:1.8}}>{l}</p>)}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a href="https://wa.me/919876543210?text=Hi, I need bulk uniform information" target="_blank" rel="noopener noreferrer"
                style={{
                  display:'flex',alignItems:'center',gap:12,padding:'16px 20px',
                  borderRadius:12,background:'#25D366',color:'#fff',textDecoration:'none',
                  fontWeight:700,marginBottom:16,transition:'all 0.2s',
                }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp — Instant Support
              </a>

              {/* Map placeholder */}
              <div style={{
                borderRadius:12,overflow:'hidden',border:'1px solid var(--gray-200)',
                background:'var(--off-white)',height:200,
                display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,
              }}>
                <span style={{fontSize:'2rem'}}>🗺️</span>
                <span style={{fontSize:'0.9rem',color:'var(--gray-400)',fontWeight:500}}>Plot 42, Industrial Area Phase-2</span>
                <span style={{fontSize:'0.85rem',color:'var(--gray-400)'}}>Gurugram, Haryana 122001</span>
                <a href="https://maps.google.com/?q=Gurugram+Industrial+Area" target="_blank" rel="noopener noreferrer"
                  style={{fontSize:'0.85rem',color:'var(--navy)',fontWeight:700,textDecoration:'none',marginTop:4}}>
                  Open in Google Maps →
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div>
              {sent ? (
                <div style={{
                  background:'#fff',borderRadius:20,padding:'48px',textAlign:'center',
                  boxShadow:'var(--shadow-md)',border:'1px solid var(--gray-200)',
                }}>
                  <div style={{fontSize:'3rem',marginBottom:16}}>✅</div>
                  <h3 style={{marginBottom:8}}>Message Sent!</h3>
                  <p style={{marginBottom:24}}>
                    Thank you, <strong>{form.name}</strong>! We'll respond to your inquiry within 24 business hours.
                  </p>
                  <button className="btn btn-navy" onClick={() => {setSent(false);setForm({name:'',email:'',phone:'',company:'',subject:'',message:''})}}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div style={{background:'#fff',borderRadius:20,padding:'40px',boxShadow:'var(--shadow-md)',border:'1px solid var(--gray-200)'}}>
                  <h3 style={{marginBottom:8}}>Send an Inquiry</h3>
                  <p style={{marginBottom:28,fontSize:'0.92rem'}}>Fill out the form and our team will get back to you promptly.</p>
                  <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                      {[
                        {label:'Full Name *',name:'name',type:'text',placeholder:'Your full name'},
                        {label:'Company Name',name:'company',type:'text',placeholder:'Your company'},
                        {label:'Email Address *',name:'email',type:'email',placeholder:'your@email.com'},
                        {label:'Phone Number',name:'phone',type:'tel',placeholder:'+91 XXXXXXXXXX'},
                      ].map(f => (
                        <div key={f.name} className="form-group">
                          <label>{f.label}</label>
                          <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange}
                            className="form-control" placeholder={f.placeholder} required={f.label.includes('*')} />
                        </div>
                      ))}
                    </div>
                    <div className="form-group">
                      <label>Subject *</label>
                      <select name="subject" value={form.subject} onChange={handleChange} className="form-control" required>
                        <option value="">Select subject</option>
                        <option>Bulk Order Inquiry</option>
                        <option>Product Information</option>
                        <option>Pricing Query</option>
                        <option>Customization Request</option>
                        <option>Existing Order Support</option>
                        <option>Partnership / Distribution</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Message *</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        className="form-control" rows={5} placeholder="Describe your requirement in detail..."
                        required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',marginTop:8}} disabled={loading}>
                      {loading ? '⏳ Sending...' : '📩 Send Message'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick FAQ */}
      <section className="section section--light">
        <div className="container" style={{maxWidth:800}}>
          <div className="section-header">
            <div className="subtitle">Quick Answers</div>
            <div className="accent-line" />
            <h2>Frequently Asked Questions</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {[
              ['What is the minimum order quantity?','Our standard minimum order quantity is 20 pieces per style/design. Volume discounts start at 50+ pieces.'],
              ['How long does production take?','Standard bulk orders take 15–21 business days after design approval. Rush orders in 7–10 days with a 25% surcharge.'],
              ['Do you deliver pan-India?','Yes, we deliver to all states in India via tracked courier. International shipping is also available on request.'],
              ['Can you add our company logo?','Absolutely! We offer logo embroidery, screen printing, and heat transfer printing. Please share your logo file (SVG/PNG/AI) at logos@uniformspro.com.'],
              ['Is there a sample policy?','Yes, we can provide 1-2 samples before bulk production for orders above ₹50,000. Sample charges are adjusted against the order.'],
            ].map(([q,a]) => (
              <div key={q} style={{background:'#fff',borderRadius:12,padding:'20px 24px',border:'1px solid var(--gray-200)'}}>
                <h4 style={{marginBottom:8,fontSize:'1rem'}}>{q}</h4>
                <p style={{fontSize:'0.92rem',margin:0}}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
