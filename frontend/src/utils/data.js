// src/utils/data.js  — Mock data & helpers for demo/frontend
export const INDUSTRIES = [
  { id: 'hotel',      name: 'Hotels & Hospitality', icon: '🏨', desc: 'Front desk, housekeeping, F&B, concierge uniforms crafted for luxury impression.' },
  { id: 'school',     name: 'Schools & Colleges',   icon: '🎓', desc: 'Durable, comfortable school uniforms with custom crests and embroidery.' },
  { id: 'hospital',   name: 'Hospitals & Clinics',  icon: '🏥', desc: 'Hygienic, easy-care scrubs, lab coats and medical attire for healthcare workers.' },
  { id: 'restaurant', name: 'Restaurants & Cafes',  icon: '🍽️', desc: 'Chef coats, aprons, server uniforms that elevate dining brand identity.' },
  { id: 'factory',    name: 'Factories & Warehouses',icon: '🏭', desc: 'High-visibility, durable workwear with safety compliance built in.' },
  { id: 'corporate',  name: 'Corporate & Office',   icon: '🏢', desc: 'Professional business attire, branded polos and formal wear for corporate staff.' },
  { id: 'security',   name: 'Security Services',    icon: '🛡️', desc: 'Sharp, authoritative security uniforms with custom patches and badges.' },
  { id: 'airline',    name: 'Aviation & Transport', icon: '✈️', desc: 'Premium cabin crew, ground staff and transport sector uniforms.' },
]

export const PRODUCTS = [
  { id: 1, category: 'Hotel',      name: 'Luxury Concierge Suit',    price: '₹1,800', minQty: 25,  img: 'hotel', colors: ['Navy','Black','Burgundy'],       desc: 'Premium woollen blend suit for front-desk & concierge staff.' },
  { id: 2, category: 'Hotel',      name: 'Housekeeping Set',         price: '₹850',  minQty: 50,  img: 'hotel', colors: ['Sky Blue','Grey','White'],        desc: 'Comfortable poly-cotton housekeeping uniform with apron.' },
  { id: 3, category: 'School',     name: 'Classic School Uniform',   price: '₹420',  minQty: 100, img: 'school', colors: ['White+Navy','White+Grey'],      desc: 'Durable school shirt & trouser/skirt set with custom crest.' },
  { id: 4, category: 'Hospital',   name: 'Medical Scrub Set',        price: '₹650',  minQty: 30,  img: 'hospital', colors: ['Ceil Blue','Green','White'],  desc: 'Antimicrobial fabric scrubs for doctors, nurses & staff.' },
  { id: 5, category: 'Hospital',   name: 'Lab Coat',                 price: '₹750',  minQty: 20,  img: 'hospital', colors: ['White'],                      desc: 'Full-length lab coat with embroidered logo placement.' },
  { id: 6, category: 'Restaurant', name: 'Chef Coat & Apron',        price: '₹920',  minQty: 20,  img: 'restaurant', colors: ['White','Black'],            desc: 'Double-breasted chef coat with custom name badge area.' },
  { id: 7, category: 'Factory',    name: 'Hi-Vis Workwear Set',      price: '₹780',  minQty: 50,  img: 'factory', colors: ['Orange','Yellow'],             desc: 'EN ISO 20471 certified high-visibility jacket & trousers.' },
  { id: 8, category: 'Corporate',  name: 'Corporate Polo Shirt',     price: '₹550',  minQty: 30,  img: 'corporate', colors: ['Navy','White','Grey','Red'], desc: 'Premium pique cotton polo with left chest logo embroidery.' },
  { id: 9, category: 'Security',   name: 'Security Guard Uniform',   price: '₹1,100',minQty: 20,  img: 'security', colors: ['Khaki','Black','Navy'],       desc: 'Full uniform set: shirt, trouser, beret and shoulder badges.' },
]

export const TESTIMONIALS = [
  { name: 'Rajesh Sharma',    role: 'GM, The Grand Palace Hotel',    text: 'UniformsPro delivered 200 uniforms on time with perfect quality. Our staff look immaculate and guests have commented on the professional appearance.' },
  { name: 'Dr. Priya Nair',  role: 'Admin Director, Apollo Clinic', text: 'The medical scrubs are excellent quality, comfortable for long shifts, and the antimicrobial fabric is exactly what our healthcare team needed.' },
  { name: 'Anita Verma',     role: 'Principal, DPS International',  text: 'Our school uniforms are durable and the embroidered crests are perfect. The children love the new look and parents are very satisfied.' },
  { name: 'Mohammed Al-Sayed', role: 'F&B Manager, Spice Route',   text: 'Chef coats and server uniforms are outstanding. The fabric holds up beautifully in a busy kitchen environment. Highly recommended.' },
]

export const CLIENTS = [
  'The Taj Hotels', 'ITC Hotels', 'Apollo Hospitals', 'Fortis Healthcare',
  'DPS Schools', 'Kendriya Vidyalaya', 'McDonald\'s India', 'Domino\'s',
  'Tata Consultancy', 'Infosys Ltd', 'G4S Security', 'Air India',
]

export const ORDER_STATUSES = [
  { id: 'received',    label: 'Order Received',  color: '#1565c0' },
  { id: 'processing',  label: 'Processing',      color: '#f57f17' },
  { id: 'production',  label: 'In Production',   color: '#6a1b9a' },
  { id: 'shipped',     label: 'Shipped',          color: '#2e7d32' },
  { id: 'delivered',   label: 'Delivered',        color: '#1b5e20' },
]

export const DEMO_ORDERS = [
  { id: 'UP-2024-001', company: 'Grand Palace Hotel',    type: 'Hotel Concierge',    qty: 50,  amount: '₹90,000',   status: 'delivered',   date: '2024-11-01' },
  { id: 'UP-2024-002', company: 'DPS International',     type: 'School Uniform',     qty: 200, amount: '₹84,000',   status: 'shipped',     date: '2024-11-15' },
  { id: 'UP-2024-003', company: 'Apollo Clinic Sector 5',type: 'Medical Scrubs',     qty: 80,  amount: '₹52,000',   status: 'production',  date: '2024-11-20' },
  { id: 'UP-2024-004', company: 'Spice Route Restaurant',type: 'Chef & Server Set',  qty: 30,  amount: '₹27,600',   status: 'processing',  date: '2024-11-25' },
  { id: 'UP-2024-005', company: 'Infosys Park Campus',   type: 'Corporate Polo',     qty: 150, amount: '₹82,500',   status: 'received',    date: '2024-11-28' },
]

export function generateOrderId() {
  return 'UP-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000)
}

export function getStatusBadgeClass(status) {
  const map = {
    received: 'badge-info',
    processing: 'badge-warning',
    production: 'badge-warning',
    shipped: 'badge-success',
    delivered: 'badge-success',
  }
  return map[status] || 'badge-navy'
}

export function getStatusLabel(status) {
  return ORDER_STATUSES.find(s => s.id === status)?.label || status
}
