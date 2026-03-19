// src/pages/AdminDashboard.jsx
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { DEMO_ORDERS, ORDER_STATUSES, getStatusBadgeClass, getStatusLabel } from '../utils/data'

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const [tab, setTab]   = useState('overview')
  const [orders, setOrders] = useState(() => {
    const stored = JSON.parse(localStorage.getItem('up_orders') || '[]')
    return [...DEMO_ORDERS, ...stored]
  })
  const [statusModal, setStatusModal] = useState(null)
  const [newStatus, setNewStatus]     = useState('')

  if (!user || user.role !== 'admin') return <Navigate to="/login" />

  const totalRevenue = orders
    .filter(o => o.amount !== 'Pending Quote')
    .reduce((acc, o) => acc + parseInt((o.amount || '0').replace(/[^0-9]/g,'')), 0)

  const updateStatus = (orderId) => {
    setOrders(prev => prev.map(o => o.id === orderId ? {...o, status: newStatus} : o))
    const stored = JSON.parse(localStorage.getItem('up_orders') || '[]')
    const updated = stored.map(o => o.id === orderId ? {...o, status: newStatus} : o)
    localStorage.setItem('up_orders', JSON.stringify(updated))
    setStatusModal(null)
  }

  const users = JSON.parse(localStorage.getItem('up_users') || '[]')

  return (
    <div style={{background:'var(--off-white)',minHeight:'100vh'}}>
      <style>{`
        .admin-sidebar {
          position: fixed; left: 0; top: 0; bottom: 0; width: 240px;
          background: var(--navy); padding: 24px 0; z-index: 200;
          display: flex; flex-direction: column;
        }
        .admin-main { margin-left: 240px; min-height: 100vh; }
        .admin-topbar {
          background: #fff; padding: 0 32px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
          border-bottom: 1px solid var(--gray-200); position: sticky; top: 0; z-index: 100;
        }
        .sidebar-link {
          display: flex; align-items: center; gap: 12px; padding: 12px 24px;
          color: rgba(255,255,255,0.65); font-size: 0.9rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; border: none; background: none;
          font-family: inherit; width: 100%; text-align: left;
        }
        .sidebar-link.active, .sidebar-link:hover {
          background: rgba(201,168,76,0.12); color: #c9a84c;
          border-right: 3px solid #c9a84c;
        }
        .stat-card {
          background: #fff; border-radius: 12px; padding: 24px;
          box-shadow: var(--shadow-sm); border: 1px solid var(--gray-200);
        }
        @media(max-width:768px){
          .admin-sidebar{display:none}
          .admin-main{margin-left:0}
        }
      `}</style>

      {/* Sidebar */}
      <div className="admin-sidebar">
        <div style={{padding:'0 24px 24px',borderBottom:'1px solid rgba(255,255,255,0.08)',marginBottom:16}}>
          <div style={{fontFamily:'Playfair Display,serif',fontWeight:700,color:'#fff',fontSize:'1.1rem'}}>UniformsPro</div>
          <div style={{fontSize:'0.65rem',color:'#c9a84c',letterSpacing:'0.15em',textTransform:'uppercase',marginTop:2}}>Admin Panel</div>
        </div>
        {[
          ['📊','overview','Overview'],
          ['📦','orders','All Orders'],
          ['👥','customers','Customers'],
          ['💰','payments','Payments'],
          ['📈','analytics','Analytics'],
        ].map(([icon,t,l]) => (
          <button key={t} className={`sidebar-link ${tab===t?'active':''}`} onClick={() => setTab(t)}>
            <span>{icon}</span>{l}
          </button>
        ))}
        <div style={{flex:1}} />
        <button className="sidebar-link" onClick={logout}>🚪 Logout</button>
      </div>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-topbar">
          <div>
            <h4 style={{color:'var(--navy)',margin:0,fontSize:'1rem'}}>
              {tab==='overview'?'Dashboard Overview':tab==='orders'?'Order Management':tab==='customers'?'Customer Management':tab==='payments'?'Payment Overview':'Analytics'}
            </h4>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{padding:'6px 14px',borderRadius:20,background:'#f0fdf4',border:'1px solid #bbf7d0',color:'#166534',fontSize:'0.8rem',fontWeight:600}}>
              ● System Online
            </div>
            <div style={{
              width:36,height:36,borderRadius:'50%',
              background:'linear-gradient(135deg,var(--navy),var(--navy-light))',
              display:'flex',alignItems:'center',justifyContent:'center',
              color:'var(--gold)',fontWeight:700,
            }}>A</div>
          </div>
        </div>

        <div style={{padding:'32px'}}>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div>
              {/* Stats */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,marginBottom:32}}>
                {[
                  {icon:'📦',label:'Total Orders',value:orders.length,color:'var(--navy)',sub:'All time'},
                  {icon:'💰',label:'Total Revenue',value:`₹${(totalRevenue/100000).toFixed(1)}L`,color:'#2e7d32',sub:'Estimated'},
                  {icon:'👥',label:'Customers',value:users.length + 5,color:'#1565c0',sub:'Registered'},
                  {icon:'⚙️',label:'In Production',value:orders.filter(o=>o.status==='production').length,color:'#6a1b9a',sub:'Active orders'},
                ].map(s => (
                  <div key={s.label} className="stat-card">
                    <div style={{fontSize:'1.5rem',marginBottom:8}}>{s.icon}</div>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:'1.8rem',fontWeight:800,color:s.color}}>{s.value}</div>
                    <div style={{fontWeight:600,color:'var(--navy)',fontSize:'0.9rem'}}>{s.label}</div>
                    <div style={{fontSize:'0.78rem',color:'var(--gray-400)',marginTop:2}}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Status breakdown */}
              <div style={{background:'#fff',borderRadius:16,padding:'28px',boxShadow:'var(--shadow-sm)',marginBottom:24}}>
                <h4 style={{marginBottom:20}}>Order Status Breakdown</h4>
                <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
                  {ORDER_STATUSES.map(s => {
                    const count = orders.filter(o => o.status === s.id).length
                    const pct = Math.round((count / orders.length) * 100)
                    return (
                      <div key={s.id} style={{flex:1,minWidth:100}}>
                        <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:'0.85rem'}}>
                          <span style={{fontWeight:600,color:'var(--navy)'}}>{s.label}</span>
                          <span style={{color:'var(--gray-400)'}}>{count}</span>
                        </div>
                        <div style={{height:8,background:'var(--gray-200)',borderRadius:4}}>
                          <div style={{width:`${pct}%`,height:'100%',borderRadius:4,background:s.color,transition:'width 0.5s'}} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Recent orders */}
              <div style={{background:'#fff',borderRadius:16,padding:'28px',boxShadow:'var(--shadow-sm)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
                  <h4>Recent Orders</h4>
                  <button className="btn btn-sm btn-navy" onClick={() => setTab('orders')}>View All</button>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID</th><th>Company</th><th>Type</th><th>Qty</th><th>Amount</th><th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0,5).map(o => (
                        <tr key={o.id}>
                          <td style={{fontWeight:700,color:'var(--navy)'}}>{o.id}</td>
                          <td>{o.company}</td>
                          <td>{o.type || o.uniformType || '—'}</td>
                          <td>{o.qty}</td>
                          <td style={{fontWeight:700,color:'var(--gold)'}}>{o.amount}</td>
                          <td><span className={`badge ${getStatusBadgeClass(o.status)}`}>{getStatusLabel(o.status)}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <div style={{background:'#fff',borderRadius:16,padding:'28px',boxShadow:'var(--shadow-sm)'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
                  <h4>All Orders ({orders.length})</h4>
                </div>
                <div style={{overflowX:'auto'}}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Order ID</th><th>Company</th><th>Contact</th><th>Type</th>
                        <th>Qty</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id}>
                          <td style={{fontWeight:700,color:'var(--navy)',whiteSpace:'nowrap'}}>{o.id}</td>
                          <td style={{fontWeight:500}}>{o.company}</td>
                          <td style={{fontSize:'0.85rem'}}>{o.contact || o.email || '—'}</td>
                          <td style={{fontSize:'0.85rem',maxWidth:120,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{o.type || o.uniformType || '—'}</td>
                          <td>{o.qty}</td>
                          <td style={{fontWeight:700,color:'var(--gold)',whiteSpace:'nowrap'}}>{o.amount}</td>
                          <td style={{fontSize:'0.85rem',whiteSpace:'nowrap'}}>{o.date}</td>
                          <td><span className={`badge ${getStatusBadgeClass(o.status)}`}>{getStatusLabel(o.status)}</span></td>
                          <td>
                            <button className="btn btn-sm" style={{
                              background:'var(--off-white)',color:'var(--navy)',border:'1px solid var(--gray-200)',
                              padding:'6px 14px',fontSize:'0.8rem',borderRadius:6,
                            }} onClick={() => { setStatusModal(o); setNewStatus(o.status) }}>
                              Update
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMERS */}
          {tab === 'customers' && (
            <div style={{background:'#fff',borderRadius:16,padding:'28px',boxShadow:'var(--shadow-sm)'}}>
              <h4 style={{marginBottom:20}}>Registered Customers ({users.length})</h4>
              {users.length === 0 ? (
                <p style={{color:'var(--gray-400)'}}>No registered users yet. Customers will appear here after registration.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr><th>Name</th><th>Email</th><th>Company</th><th>Phone</th><th>Joined</th></tr>
                  </thead>
                  <tbody>
                    {users.map((u,i) => (
                      <tr key={i}>
                        <td style={{fontWeight:600}}>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.company || '—'}</td>
                        <td>{u.phone || '—'}</td>
                        <td>{u.joinDate || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* PAYMENTS */}
          {tab === 'payments' && (
            <div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:24}}>
                {[
                  {label:'Total Revenue',value:`₹${(totalRevenue/100000).toFixed(2)}L`,color:'#2e7d32'},
                  {label:'Pending Quotes',value:orders.filter(o=>o.amount==='Pending Quote').length,color:'#f57f17'},
                  {label:'Paid Orders',value:orders.filter(o=>o.status==='delivered').length,color:'var(--navy)'},
                ].map(s => (
                  <div key={s.label} className="stat-card" style={{textAlign:'center'}}>
                    <div style={{fontFamily:'Playfair Display,serif',fontSize:'2rem',fontWeight:800,color:s.color}}>{s.value}</div>
                    <div style={{fontWeight:600,color:'var(--gray-600)',marginTop:4}}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{background:'#fff',borderRadius:16,padding:'28px',boxShadow:'var(--shadow-sm)'}}>
                <h4 style={{marginBottom:20}}>Payment Records</h4>
                <table className="table">
                  <thead>
                    <tr><th>Order ID</th><th>Company</th><th>Amount</th><th>Status</th><th>Payment Status</th></tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td style={{fontWeight:700,color:'var(--navy)'}}>{o.id}</td>
                        <td>{o.company}</td>
                        <td style={{fontWeight:700,color:'var(--gold)'}}>{o.amount}</td>
                        <td><span className={`badge ${getStatusBadgeClass(o.status)}`}>{getStatusLabel(o.status)}</span></td>
                        <td>
                          <span className={`badge ${o.status === 'delivered' ? 'badge-success' : o.amount === 'Pending Quote' ? 'badge-warning' : 'badge-info'}`}>
                            {o.status === 'delivered' ? 'Paid' : o.amount === 'Pending Quote' ? 'Awaiting Quote' : 'Invoice Sent'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {tab === 'analytics' && (
            <div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
                <div style={{background:'#fff',borderRadius:16,padding:'28px',boxShadow:'var(--shadow-sm)'}}>
                  <h4 style={{marginBottom:20}}>Orders by Industry</h4>
                  {[
                    ['Hotels & Hospitality',35,'var(--navy)'],
                    ['Schools & Education',20,'#1565c0'],
                    ['Healthcare',18,'#2e7d32'],
                    ['Restaurants',12,'#f57f17'],
                    ['Industrial',10,'#6a1b9a'],
                    ['Corporate',5,'var(--gold)'],
                  ].map(([l,v,c]) => (
                    <div key={l} style={{marginBottom:14}}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:'0.88rem'}}>
                        <span style={{fontWeight:500}}>{l}</span>
                        <span style={{color:'var(--gray-400)',fontWeight:600}}>{v}%</span>
                      </div>
                      <div style={{height:8,background:'var(--gray-200)',borderRadius:4}}>
                        <div style={{width:`${v}%`,height:'100%',borderRadius:4,background:c}} />
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{background:'#fff',borderRadius:16,padding:'28px',boxShadow:'var(--shadow-sm)'}}>
                  <h4 style={{marginBottom:20}}>Key Metrics</h4>
                  {[
                    ['Average Order Value','₹68,500'],
                    ['Average Delivery Time','18 days'],
                    ['Customer Retention Rate','84%'],
                    ['Quote Conversion Rate','67%'],
                    ['On-Time Delivery Rate','92%'],
                    ['Quality Return Rate','< 2%'],
                    ['NPS Score','72/100'],
                  ].map(([k,v]) => (
                    <div key={k} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--gray-200)'}}>
                      <span style={{fontSize:'0.9rem',color:'var(--gray-600)'}}>{k}</span>
                      <span style={{fontWeight:700,color:'var(--navy)'}}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status update modal */}
      {statusModal && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:24}}
          onClick={() => setStatusModal(null)}>
          <div style={{background:'#fff',borderRadius:20,padding:'40px',maxWidth:440,width:'100%'}} onClick={e => e.stopPropagation()}>
            <h3 style={{marginBottom:4}}>Update Order Status</h3>
            <p style={{marginBottom:24,fontSize:'0.9rem',color:'var(--gray-600)'}}>Order: {statusModal.id} — {statusModal.company}</p>
            {ORDER_STATUSES.map(s => (
              <div key={s.id} style={{
                padding:'12px 16px',borderRadius:8,border:`2px solid ${newStatus===s.id?s.color:'var(--gray-200)'}`,
                cursor:'pointer',marginBottom:8,display:'flex',alignItems:'center',gap:12,
                background:newStatus===s.id?`${s.color}11`:'#fff',
              }} onClick={() => setNewStatus(s.id)}>
                <div style={{width:14,height:14,borderRadius:'50%',background:s.color,flexShrink:0}} />
                <span style={{fontWeight:500}}>{s.label}</span>
              </div>
            ))}
            <div style={{display:'flex',gap:12,marginTop:20}}>
              <button className="btn btn-navy" style={{flex:1,justifyContent:'center'}} onClick={() => updateStatus(statusModal.id)}>
                Update Status
              </button>
              <button className="btn" style={{flex:1,justifyContent:'center',border:'2px solid var(--gray-200)',color:'var(--gray-600)'}}
                onClick={() => setStatusModal(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
