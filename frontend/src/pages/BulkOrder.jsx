// src/pages/BulkOrder.jsx
import { useState } from 'react'
import Layout from '../components/common/Layout'
import { generateOrderId } from '../utils/data'
import { Link } from 'react-router-dom'

const UNIFORM_TYPES = [
  'Hotel / Hospitality Uniform','School Uniform','Hospital / Medical Scrubs','Restaurant / Chef Uniform',
  'Factory / Industrial Workwear','Corporate / Office Uniform','Security Guard Uniform',
  'Aviation / Transport Uniform','Custom / Other',
]
const FABRICS = ['Cotton','Poly-Cotton Blend','Pure Polyester','Linen Blend','Wool Blend','Technical / Performance Fabric']
const CUSTOMIZATIONS = ['Logo Embroidery','Screen Printing','Heat Transfer Print','Name Tags / Badges','Custom Labels','Color Customization','Pocket Placement']

export default function BulkOrder() {
  const [form, setForm]     = useState({ company:'',contact:'',email:'',phone:'',whatsapp:'',uniformType:'',qty:'',fabric:'',sizes:'',customizations:[],deliveryAddress:'',deliveryCity:'',deliveryState:'',deliveryPincode:'',logoUpload:null,notes:'',budget:'' })
  const [submitted, setSubmitted] = useState(false)
  const [orderId, setOrderId]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [step, setStep]           = useState(1)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({...f, [name]: value}))
  }

  const toggleCustomization = c => {
    setForm(f => ({
      ...f,
      customizations: f.customizations.includes(c)
        ? f.customizations.filter(x => x !== c)
        : [...f.customizations, c],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))  // Simulate API call
    const id = generateOrderId()
    setOrderId(id)
    // Save order to localStorage for demo
    const orders = JSON.parse(localStorage.getItem('up_orders') || '[]')
    orders.push({
      id, ...form, status:'received',
      date: new Date().toISOString().split('T')[0],
      amount: 'Pending Quote',
    })
    localStorage.setItem('up_orders', JSON.stringify(orders))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Layout>
        <div style={{
          minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',
          background:'var(--off-white)',
        }}>
          <div style={{
            background:'#fff',borderRadius:24,padding:'56px 48px',
            maxWidth:540,width:'100%',textAlign:'center',
            boxShadow:'var(--shadow-xl)',
          }}>
            <div style={{
              width:80,height:80,borderRadius:'50%',
              background:'linear-gradient(135deg,#c9a84c,#e8c97a)',
              display:'flex',alignItems:'center',justifyContent:'center',
              margin:'0 auto 24px',fontSize:'2rem',
            }}>✅</div>
            <h2 style={{marginBottom:8}}>Order Request Submitted!</h2>
            <p style={{marginBottom:24}}>
              Thank you, <strong>{form.contact}</strong>! Your bulk order request has been received.
              Our team will contact you within 48 hours with a detailed quote.
            </p>
            <div style={{
              background:'var(--off-white)',borderRadius:12,padding:'20px',
              marginBottom:32,border:'2px dashed var(--gray-200)',
            }}>
              <div style={{fontSize:'0.8rem',color:'var(--gray-400)',fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:8}}>
                Your Order ID
              </div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:800,color:'var(--navy)'}}>
                {orderId}
              </div>
              <div style={{fontSize:'0.8rem',color:'var(--gray-400)',marginTop:4}}>
                Save this ID to track your order
              </div>
            </div>
            <div style={{
              display:'flex',flexDirection:'column',gap:12,
              padding:'20px',background:'#f0fdf4',borderRadius:12,marginBottom:32,
              border:'1px solid #bbf7d0',textAlign:'left',
            }}>
              {['A quote will be emailed to ' + form.email,'WhatsApp confirmation sent to ' + form.phone,'Design preview in 48 hours','Production begins after approval'].map(m => (
                <div key={m} style={{display:'flex',gap:10,alignItems:'flex-start',fontSize:'0.9rem',color:'#166534'}}>
                  <span style={{flexShrink:0}}>✓</span><span>{m}</span>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
              <Link to="/dashboard" className="btn btn-primary">Track in Dashboard</Link>
              <Link to="/" className="btn btn-navy">Back to Home</Link>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page-hero">
        <div className="container">
          <div className="subtitle" style={{color:'var(--gold)'}}>Bulk Orders</div>
          <h1>Request a Bulk Uniform Quote</h1>
          <p>Fill in your requirements and our team will respond with a detailed quote within 48 hours.</p>
        </div>
      </div>

      <section className="section section--light">
        <div className="container" style={{maxWidth:900}}>
          {/* Step indicator */}
          <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:40}}>
            {['Company Info','Order Details','Delivery & Notes'].map((s,i) => (
              <div key={s} style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{
                  width:36,height:36,borderRadius:'50%',
                  background: step > i+1 ? 'var(--gold)' : step === i+1 ? 'var(--navy)' : 'var(--gray-200)',
                  color: step >= i+1 ? '#fff' : 'var(--gray-400)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontWeight:700,fontSize:'0.9rem',transition:'all 0.3s',
                }}>
                  {step > i+1 ? '✓' : i+1}
                </div>
                <span style={{fontSize:'0.85rem',fontWeight:600,color:step===i+1?'var(--navy)':'var(--gray-400)'}}>
                  {s}
                </span>
                {i < 2 && <div style={{width:40,height:2,background:'var(--gray-200)',borderRadius:1,margin:'0 4px'}} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{background:'#fff',borderRadius:20,padding:'40px',boxShadow:'var(--shadow-md)'}}>

              {/* STEP 1: Company Info */}
              {step === 1 && (
                <div>
                  <h3 style={{marginBottom:24,paddingBottom:16,borderBottom:'1px solid var(--gray-200)'}}>
                    Company Information
                  </h3>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Company / Organization Name *</label>
                      <input className="form-control" name="company" value={form.company} onChange={handleChange} placeholder="e.g. Grand Palace Hotel" required />
                    </div>
                    <div className="form-group">
                      <label>Contact Person Name *</label>
                      <input className="form-control" name="contact" value={form.contact} onChange={handleChange} placeholder="Full name" required />
                    </div>
                    <div className="form-group">
                      <label>Business Email *</label>
                      <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} placeholder="email@company.com" required />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 9XXXXXXXXX" required />
                    </div>
                    <div className="form-group">
                      <label>WhatsApp Number (for updates)</label>
                      <input type="tel" className="form-control" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="Same as phone if same" />
                    </div>
                    <div className="form-group">
                      <label>Estimated Budget (optional)</label>
                      <input className="form-control" name="budget" value={form.budget} onChange={handleChange} placeholder="e.g. ₹50,000 – ₹1,00,000" />
                    </div>
                  </div>
                  <div style={{display:'flex',justifyContent:'flex-end',marginTop:24}}>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                      Next: Order Details →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Order Details */}
              {step === 2 && (
                <div>
                  <h3 style={{marginBottom:24,paddingBottom:16,borderBottom:'1px solid var(--gray-200)'}}>
                    Uniform Order Details
                  </h3>
                  <div className="grid-2">
                    <div className="form-group">
                      <label>Uniform Type *</label>
                      <select className="form-control" name="uniformType" value={form.uniformType} onChange={handleChange} required>
                        <option value="">Select uniform type</option>
                        {UNIFORM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Total Quantity Required *</label>
                      <input type="number" className="form-control" name="qty" value={form.qty} onChange={handleChange} placeholder="e.g. 100 (minimum 20)" min="20" required />
                    </div>
                    <div className="form-group">
                      <label>Fabric Preference</label>
                      <select className="form-control" name="fabric" value={form.fabric} onChange={handleChange}>
                        <option value="">Select fabric</option>
                        {FABRICS.map(f => <option key={f} value={f}>{f}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Size Requirements</label>
                      <input className="form-control" name="sizes" value={form.sizes} onChange={handleChange} placeholder="e.g. 20×S, 40×M, 30×L, 10×XL" />
                    </div>
                  </div>

                  <div className="form-group" style={{marginTop:8}}>
                    <label>Customization Options (select all that apply)</label>
                    <div style={{display:'flex',gap:10,flexWrap:'wrap',marginTop:8}}>
                      {CUSTOMIZATIONS.map(c => (
                        <button key={c} type="button"
                          onClick={() => toggleCustomization(c)}
                          style={{
                            padding:'8px 16px',borderRadius:20,fontSize:'0.85rem',fontWeight:600,
                            cursor:'pointer',transition:'all 0.2s',fontFamily:'inherit',
                            background: form.customizations.includes(c) ? 'var(--navy)' : 'var(--off-white)',
                            color: form.customizations.includes(c) ? '#fff' : 'var(--gray-600)',
                            border: `2px solid ${form.customizations.includes(c) ? 'var(--navy)' : 'var(--gray-200)'}`,
                          }}>
                          {form.customizations.includes(c) ? '✓ ' : ''}{c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {form.customizations.includes('Logo Embroidery') || form.customizations.includes('Screen Printing') || form.customizations.includes('Heat Transfer Print') ? (
                    <div className="form-group" style={{marginTop:16}}>
                      <label>Upload Logo File (PNG, SVG, AI — high resolution)</label>
                      <input type="file" className="form-control" accept=".png,.svg,.ai,.pdf,.jpg"
                        onChange={e => setForm(f => ({...f, logoUpload: e.target.files[0]?.name || null}))} />
                      {form.logoUpload && <p style={{fontSize:'0.85rem',color:'var(--success)',marginTop:4}}>✓ {form.logoUpload} selected</p>}
                      <p style={{fontSize:'0.82rem',color:'var(--gray-400)',marginTop:4}}>Or email it later to: logos@uniformspro.com</p>
                    </div>
                  ) : null}

                  <div style={{display:'flex',justifyContent:'space-between',marginTop:24}}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(1)}
                      style={{borderColor:'var(--gray-400)',color:'var(--gray-600)'}}>
                      ← Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
                      Next: Delivery Info →
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Delivery & Notes */}
              {step === 3 && (
                <div>
                  <h3 style={{marginBottom:24,paddingBottom:16,borderBottom:'1px solid var(--gray-200)'}}>
                    Delivery Address & Additional Notes
                  </h3>
                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <textarea className="form-control" name="deliveryAddress" value={form.deliveryAddress}
                      onChange={handleChange} rows={3} placeholder="Full delivery address" required />
                  </div>
                  <div className="grid-3">
                    <div className="form-group">
                      <label>City *</label>
                      <input className="form-control" name="deliveryCity" value={form.deliveryCity} onChange={handleChange} placeholder="City" required />
                    </div>
                    <div className="form-group">
                      <label>State *</label>
                      <input className="form-control" name="deliveryState" value={form.deliveryState} onChange={handleChange} placeholder="State" required />
                    </div>
                    <div className="form-group">
                      <label>Pincode *</label>
                      <input className="form-control" name="deliveryPincode" value={form.deliveryPincode} onChange={handleChange} placeholder="6-digit pincode" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Additional Notes or Special Requirements</label>
                    <textarea className="form-control" name="notes" value={form.notes}
                      onChange={handleChange} rows={4}
                      placeholder="Any specific requirements, preferred colors, deadlines, or other details..." />
                  </div>

                  {/* Summary */}
                  <div style={{
                    background:'var(--off-white)',borderRadius:12,padding:'20px',
                    marginBottom:24,border:'1px solid var(--gray-200)',
                  }}>
                    <h4 style={{marginBottom:16,fontSize:'1rem'}}>Order Summary</h4>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px 24px'}}>
                      {[
                        ['Company', form.company],
                        ['Contact', form.contact],
                        ['Uniform Type', form.uniformType || '—'],
                        ['Quantity', form.qty ? `${form.qty} pieces` : '—'],
                        ['Fabric', form.fabric || '—'],
                        ['Customizations', form.customizations.length ? form.customizations.join(', ') : 'None'],
                      ].map(([k,v]) => (
                        <div key={k} style={{display:'flex',gap:8}}>
                          <span style={{fontSize:'0.82rem',fontWeight:600,color:'var(--gray-400)',whiteSpace:'nowrap'}}>{k}:</span>
                          <span style={{fontSize:'0.85rem',color:'var(--navy)',fontWeight:500}}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{
                    background:'#fffbeb',border:'1px solid #fde68a',borderRadius:12,padding:'16px',marginBottom:24,
                  }}>
                    <p style={{fontSize:'0.88rem',color:'#92400e',margin:0}}>
                      ⚡ <strong>Fast Response Guarantee:</strong> Our team will review your request and send a detailed quote to {form.email || 'your email'} within 48 business hours.
                    </p>
                  </div>

                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <button type="button" className="btn btn-outline" onClick={() => setStep(2)}
                      style={{borderColor:'var(--gray-400)',color:'var(--gray-600)'}}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-primary" style={{minWidth:220}}
                      disabled={loading}>
                      {loading ? '⏳ Submitting...' : '🚀 Submit Order Request'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Side info */}
          <div style={{marginTop:32,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:20}}>
            {[
              {icon:'⚡',title:'48-Hour Quote',desc:'Receive a detailed quote within 2 business days'},
              {icon:'🔒',title:'Secure Process',desc:'Your data is 100% confidential and secure'},
              {icon:'📞',title:'Dedicated Support',desc:'A dedicated manager will guide your order'},
            ].map(i => (
              <div key={i.title} style={{
                background:'#fff',borderRadius:12,padding:'20px',textAlign:'center',
                boxShadow:'var(--shadow-sm)',border:'1px solid var(--gray-200)',
              }}>
                <div style={{fontSize:'1.8rem',marginBottom:8}}>{i.icon}</div>
                <div style={{fontWeight:700,color:'var(--navy)',fontSize:'0.95rem',marginBottom:4}}>{i.title}</div>
                <p style={{fontSize:'0.82rem'}}>{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
