// src/pages/Dashboard.jsx
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DEMO_ORDERS, getStatusBadgeClass, getStatusLabel, ORDER_STATUSES } from '../utils/data'

const PAYMENT_METHODS = ['UPI (PhonePe / GPay / Paytm)','Credit Card','Debit Card','Net Banking','Bank Transfer (NEFT/RTGS)']

function StatusTimeline({ status }) {
  const steps = ORDER_STATUSES
  const currentIdx = steps.findIndex(s => s.id === status)
  return (
    <div style={{display:'flex',alignItems:'center',gap:0,margin:'16px 0'}}>
      {steps.map((s, i) => (
        <div key={s.id} style={{display:'flex',alignItems:'center',flex:1}}>
          <div style={{
            width:28,height:28,borderRadius:'50%',flexShrink:0,
            background: i <= currentIdx ? s.color : 'var(--gray-200)',
            display:'flex',alignItems:'center',justifyContent:'center',
            color:'#fff',fontSize:'0.75rem',fontWeight:700,zIndex:1,
          }}>
            {i < currentIdx ? '✓' : i+1}
          </div>
          {i < steps.length - 1 && (
            <div style={{
              flex:1,height:3,
              background: i < currentIdx ? 'var(--gold)' : 'var(--gray-200)',
              transition:'background 0.3s',
            }} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [tab, setTab]     = useState('orders')
  const [payModal, setPayModal] = useState(null)
  const [payMethod, setPayMethod] = useState('')
  const [payDone, setPayDone]   = useState(false)

  if (!user) return <Navigate to="/login" />
  if (user.role === 'admin') return <Navigate to="/admin" />

  // Load user orders from localStorage + demo
  const storedOrders = JSON.parse(localStorage.getItem('up_orders') || '[]')
  const myOrders = user.email.includes('demo')
    ? DEMO_ORDERS
    : storedOrders.filter(o => o.email === user.email).map(o => ({...o}))

  const handlePayment = async () => {
    await new Promise(r => setTimeout(r, 1500))
    setPayDone(true)
  }

  return (
    <div style={{background:'var(--off-white)',minHeight:'100vh'}}>
      {/* Top bar */}
      <div style={{
        background:'var(--navy)',padding:'0 24px',
        display:'flex',alignItems:'center',justifyContent:'space-between',height:64,
        position:'sticky',top:0,zIndex:100,
      }}>
        <Link to="/" style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
          <div style={{width:36,height:36,borderRadius:8,background:'linear-gradient(135deg,#c9a84c,#e8c97a)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Playfair Display,serif',fontWeight:800,color:'#0a1628'}}>U</div>
          <span style={{fontFamily:'Playfair Display,serif',color:'#fff',fontWeight:700}}>UniformsPro</span>
        </Link>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:'0.9rem',color:'rgba(255,255,255,0.7)'}}>Welcome, {user.name?.split(' ')[0]}</span>
          <button onClick={logout} style={{
            padding:'7px 16px',borderRadius:8,border:'1px solid rgba(255,255,255,0.2)',
            color:'rgba(255,255,255,0.7)',background:'none',cursor:'pointer',fontSize:'0.85rem',fontFamily:'inherit',
          }}>Logout</button>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'32px 24px'}}>
        {/* Header */}
        <div style={{marginBottom:32}}>
          <h2 style={{marginBottom:4}}>My Dashboard</h2>
          <p style={{fontSize:'0.92rem'}}>Manage your orders, track delivery, and handle payments.</p>
        </div>

        {/* Stats cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:32}}>
          {[
            {label:'Total Orders',value:myOrders.length,icon:'📦',color:'var(--navy)'},
            {label:'In Progress',value:myOrders.filter(o=>['received','processing','production'].includes(o.status)).length,icon:'⚙️',color:'#f57f17'},
            {label:'Shipped',value:myOrders.filter(o=>o.status==='shipped').length,icon:'🚚',color:'#1565c0'},
            {label:'Delivered',value:myOrders.filter(o=>o.status==='delivered').length,icon:'✅',color:'#2e7d32'},
          ].map(s => (
            <div key={s.label} style={{background:'#fff',borderRadius:12,padding:'20px',boxShadow:'var(--shadow-sm)',border:'1px solid var(--gray-200)'}}>
              <div style={{fontSize:'1.5rem',marginBottom:8}}>{s.icon}</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',fontWeight:800,color:s.color}}>{s.value}</div>
              <div style={{fontSize:'0.82rem',color:'var(--gray-400)',marginTop:2}}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{display:'flex',gap:4,marginBottom:24,background:'#fff',borderRadius:12,padding:4,width:'fit-content',boxShadow:'var(--shadow-sm)'}}>
          {[['orders','My Orders'],['payment','Payments'],['profile','Profile']].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)}
              style={{
                padding:'10px 24px',borderRadius:8,fontWeight:600,fontSize:'0.9rem',
                cursor:'pointer',border:'none',fontFamily:'inherit',transition:'all 0.2s',
                background: tab===t ? 'var(--navy)' : 'transparent',
                color: tab===t ? '#fff' : 'var(--gray-600)',
              }}>{l}
            </button>
          ))}
        </div>

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div>
            {myOrders.length === 0 ? (
              <div style={{background:'#fff',borderRadius:16,padding:'60px',textAlign:'center',boxShadow:'var(--shadow-sm)'}}>
                <div style={{fontSize:'4rem',marginBottom:16}}>📦</div>
                <h3 style={{marginBottom:8}}>No Orders Yet</h3>
                <p style={{marginBottom:24}}>Place your first bulk uniform order to get started.</p>
                <Link to="/bulk-order" className="btn btn-primary">Place First Order</Link>
              </div>
            ) : myOrders.map(order => (
              <div key={order.id} style={{background:'#fff',borderRadius:16,padding:'24px',marginBottom:16,boxShadow:'var(--shadow-sm)',border:'1px solid var(--gray-200)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12,marginBottom:16}}>
                  <div>
                    <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:4}}>
                      <span style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'var(--navy)',fontSize:'1.05rem'}}>{order.id}</span>
                      <span className={`badge ${getStatusBadgeClass(order.status)}`}>{getStatusLabel(order.status)}</span>
                    </div>
                    <div style={{fontSize:'0.88rem',color:'var(--gray-400)'}}>Ordered on {order.date}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.3rem',fontWeight:800,color:'var(--gold)'}}>{order.amount}</div>
                    <div style={{fontSize:'0.78rem',color:'var(--gray-400)'}}>{order.qty} pieces</div>
                  </div>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginBottom:16,padding:'16px',background:'var(--off-white)',borderRadius:10}}>
                  <div><span style={{fontSize:'0.75rem',color:'var(--gray-400)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Type</span><div style={{fontSize:'0.9rem',color:'var(--navy)',fontWeight:600,marginTop:2}}>{order.type || order.uniformType || '—'}</div></div>
                  <div><span style={{fontSize:'0.75rem',color:'var(--gray-400)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Company</span><div style={{fontSize:'0.9rem',color:'var(--navy)',fontWeight:600,marginTop:2}}>{order.company}</div></div>
                  <div><span style={{fontSize:'0.75rem',color:'var(--gray-400)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.06em'}}>Quantity</span><div style={{fontSize:'0.9rem',color:'var(--navy)',fontWeight:600,marginTop:2}}>{order.qty} pcs</div></div>
                </div>

                {/* Timeline */}
                <div>
                  <div style={{fontSize:'0.8rem',fontWeight:600,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>Order Progress</div>
                  <StatusTimeline status={order.status} />
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    {ORDER_STATUSES.map(s => (
                      <span key={s.id} style={{fontSize:'0.68rem',color:'var(--gray-400)',textAlign:'center',flex:1}}>{s.label}</span>
                    ))}
                  </div>
                </div>

                {order.amount === 'Pending Quote' && (
                  <div style={{marginTop:16,padding:'12px 16px',background:'#fffbeb',borderRadius:8,border:'1px solid #fde68a',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:8}}>
                    <span style={{fontSize:'0.88rem',color:'#92400e'}}>⏳ Quote will be provided within 48 hours via email</span>
                    <a href="tel:+911800123456" style={{fontSize:'0.85rem',color:'#b45309',fontWeight:600,textDecoration:'none'}}>📞 Expedite via Call</a>
                  </div>
                )}

                {order.amount !== 'Pending Quote' && order.status !== 'delivered' && (
                  <div style={{marginTop:16,display:'flex',gap:10,flexWrap:'wrap'}}>
                    <button onClick={() => { setPayModal(order); setPayDone(false) }}
                      className="btn btn-sm btn-primary">💳 Pay Now</button>
                    <a href={`https://wa.me/911800123456?text=Order ID: ${order.id} - Status update request`}
                      target="_blank" rel="noopener noreferrer"
                      className="btn btn-sm" style={{background:'#25D366',color:'#fff',padding:'10px 20px',borderRadius:8,fontSize:'0.85rem',fontWeight:600,textDecoration:'none'}}>
                      WhatsApp Support
                    </a>
                  </div>
                )}
              </div>
            ))}

            <div style={{textAlign:'center',marginTop:24}}>
              <Link to="/bulk-order" className="btn btn-navy">+ Place New Order</Link>
            </div>
          </div>
        )}

        {/* PAYMENT TAB */}
        {tab === 'payment' && (
          <div style={{background:'#fff',borderRadius:16,padding:'32px',boxShadow:'var(--shadow-sm)'}}>
            <h3 style={{marginBottom:24}}>Payment Methods</h3>
            <div style={{display:'grid',gap:12,maxWidth:500}}>
              {PAYMENT_METHODS.map(m => (
                <div key={m} style={{
                  padding:'16px 20px',borderRadius:10,border:`2px solid ${payMethod===m?'var(--gold)':'var(--gray-200)'}`,
                  cursor:'pointer',transition:'all 0.2s',
                  background: payMethod===m ? 'var(--gold-pale)' : '#fff',
                  display:'flex',alignItems:'center',gap:12,
                }} onClick={() => setPayMethod(m)}>
                  <div style={{
                    width:20,height:20,borderRadius:'50%',border:`2px solid ${payMethod===m?'var(--gold)':'var(--gray-300)'}`,
                    display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,
                  }}>
                    {payMethod===m && <div style={{width:10,height:10,borderRadius:'50%',background:'var(--gold)'}} />}
                  </div>
                  <span style={{fontWeight:500,fontSize:'0.95rem'}}>{m}</span>
                </div>
              ))}
              {payMethod && (
                <button className="btn btn-primary" style={{marginTop:8}} onClick={() => alert(`Payment gateway integration required. Method selected: ${payMethod}`)}>
                  Proceed to Pay
                </button>
              )}
            </div>
            <div style={{marginTop:32,padding:'16px',background:'var(--off-white)',borderRadius:10,border:'1px solid var(--gray-200)'}}>
              <p style={{fontSize:'0.88rem',color:'var(--gray-600)'}}>
                🔒 <strong>Secure Payments:</strong> All transactions are encrypted with 256-bit SSL. We accept UPI, all major cards, and bank transfers. Invoices are auto-generated and emailed after payment.
              </p>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {tab === 'profile' && (
          <div style={{background:'#fff',borderRadius:16,padding:'32px',boxShadow:'var(--shadow-sm)',maxWidth:600}}>
            <h3 style={{marginBottom:24}}>My Profile</h3>
            <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:32,padding:'20px',background:'var(--off-white)',borderRadius:12}}>
              <div style={{
                width:64,height:64,borderRadius:'50%',
                background:'linear-gradient(135deg,var(--navy),var(--navy-light))',
                display:'flex',alignItems:'center',justifyContent:'center',
                fontFamily:'Playfair Display,serif',fontSize:'1.8rem',fontWeight:800,color:'var(--gold)',flexShrink:0,
              }}>{user.name?.[0]?.toUpperCase()}</div>
              <div>
                <h4 style={{marginBottom:2}}>{user.name}</h4>
                <p style={{fontSize:'0.88rem'}}>{user.email}</p>
                <span className="badge badge-gold" style={{marginTop:6}}>Verified Client</span>
              </div>
            </div>
            {[['Full Name',user.name],['Email',user.email],['Company',user.company||'—'],['Account Type','Business Client'],['Member Since',new Date().getFullYear()]].map(([k,v]) => (
              <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'14px 0',borderBottom:'1px solid var(--gray-200)'}}>
                <span style={{fontSize:'0.9rem',color:'var(--gray-400)',fontWeight:600}}>{k}</span>
                <span style={{fontSize:'0.9rem',color:'var(--navy)',fontWeight:500}}>{v}</span>
              </div>
            ))}
            <button className="btn btn-navy" style={{marginTop:24}} onClick={() => alert('Profile editing coming soon!')}>
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Payment modal */}
      {payModal && !payDone && (
        <div style={{
          position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:1000,
          display:'flex',alignItems:'center',justifyContent:'center',padding:24,
        }} onClick={() => setPayModal(null)}>
          <div style={{background:'#fff',borderRadius:20,padding:'40px',maxWidth:440,width:'100%'}}
            onClick={e => e.stopPropagation()}>
            <h3 style={{marginBottom:4}}>Complete Payment</h3>
            <p style={{marginBottom:24,fontSize:'0.9rem'}}>Order: {payModal.id}</p>
            <div style={{fontSize:'2rem',fontWeight:800,color:'var(--navy)',fontFamily:'Playfair Display,serif',marginBottom:24}}>{payModal.amount}</div>
            {PAYMENT_METHODS.slice(0,4).map(m => (
              <div key={m} style={{padding:'12px 16px',borderRadius:8,border:`2px solid ${payMethod===m?'var(--gold)':'var(--gray-200)'}`,cursor:'pointer',marginBottom:8,background:payMethod===m?'var(--gold-pale)':'#fff'}}
                onClick={() => setPayMethod(m)}>
                <span style={{fontSize:'0.9rem',fontWeight:500}}>{m}</span>
              </div>
            ))}
            <button className="btn btn-primary" style={{width:'100%',marginTop:16,justifyContent:'center'}}
              onClick={handlePayment}>Pay Securely →</button>
          </div>
        </div>
      )}
      {payModal && payDone && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}
          onClick={() => { setPayModal(null); setPayDone(false) }}>
          <div style={{background:'#fff',borderRadius:20,padding:'48px',textAlign:'center',maxWidth:380}}>
            <div style={{fontSize:'3rem',marginBottom:16}}>✅</div>
            <h3 style={{marginBottom:8}}>Payment Successful!</h3>
            <p>Your payment for {payModal.id} has been received. Invoice sent to your email.</p>
            <button className="btn btn-primary" style={{marginTop:24}} onClick={() => { setPayModal(null); setPayDone(false) }}>Done</button>
          </div>
        </div>
      )}
    </div>
  )
}
