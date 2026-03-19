# 🎽 UniformsPro — B2B Bulk Uniform Platform

> Premium Bulk Uniform Manufacturer Web Application for Hotels, Schools, Hospitals, Restaurants, Factories & Corporate Staff.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB (local or Atlas) — for backend

---

### Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
# Opens on http://localhost:3000
```

### Backend (Express + MongoDB)

```bash
cd backend
npm install
cp .env.example .env   # Edit with your config
npm run dev
# API on http://localhost:5000
```

---

## 🔑 Demo Login Credentials

| Role  | Email                     | Password  |
|-------|---------------------------|-----------|
| Admin | admin@uniformspro.com     | admin123  |
| User  | Register via /register    | (your own)|

---

## 📁 Project Structure

```
uniforms-pro/
├── frontend/                     # React + Vite SPA
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx              # Entry point
│       ├── App.jsx               # Router setup
│       ├── context/
│       │   └── AuthContext.jsx   # Auth state management
│       ├── styles/
│       │   └── global.css        # Design system & tokens
│       ├── utils/
│       │   └── data.js           # Mock data & helpers
│       ├── components/
│       │   └── common/
│       │       ├── Navbar.jsx
│       │       ├── Footer.jsx
│       │       └── Layout.jsx
│       └── pages/
│           ├── Home.jsx          # Landing page (SEO optimized)
│           ├── About.jsx         # Company info
│           ├── Industries.jsx    # Industries served
│           ├── Products.jsx      # Uniform catalog
│           ├── Portfolio.jsx     # Past projects
│           ├── BulkOrder.jsx     # Multi-step order form
│           ├── Login.jsx         # Authentication
│           ├── Register.jsx      # User registration
│           ├── Dashboard.jsx     # User dashboard
│           ├── AdminDashboard.jsx# Admin panel
│           └── Contact.jsx       # Contact & inquiry
│
└── backend/                      # Express.js REST API
    ├── server.js                 # Entry point
    ├── .env.example              # Environment template
    ├── package.json
    ├── config/
    │   └── db.js                 # MongoDB connection
    ├── models/
    │   ├── User.js               # User schema
    │   └── Order.js              # Order schema
    ├── controllers/
    │   ├── authController.js     # Register/Login/Me
    │   └── orderController.js    # CRUD + analytics
    ├── routes/
    │   ├── auth.js
    │   ├── orders.js
    │   ├── users.js
    │   └── contact.js
    └── middleware/
        └── auth.js               # JWT protect + adminOnly
```

---

## 🌐 All Pages

| Route         | Page              | Access    |
|---------------|-------------------|-----------|
| `/`           | Home (Landing)    | Public    |
| `/about`      | About Us          | Public    |
| `/industries` | Industries        | Public    |
| `/products`   | Products          | Public    |
| `/portfolio`  | Portfolio         | Public    |
| `/bulk-order` | Bulk Order Form   | Public    |
| `/contact`    | Contact           | Public    |
| `/login`      | Login             | Public    |
| `/register`   | Register          | Public    |
| `/dashboard`  | User Dashboard    | Auth Only |
| `/admin`      | Admin Dashboard   | Admin Only|

---

## 🎨 Design System

- **Colors:** Navy `#0a1628`, Gold `#c9a84c`, White `#ffffff`
- **Fonts:** Playfair Display (headings) + DM Sans (body)
- **Theme:** Luxury/Professional B2B with gold accents

---

## ⚡ Features

### Frontend
- ✅ Fully responsive (mobile-first)
- ✅ SEO-optimized meta tags on every page
- ✅ Multi-step bulk order form with validation
- ✅ Unique Order ID generation on submission
- ✅ User authentication (localStorage demo mode)
- ✅ User dashboard with order tracking
- ✅ Admin dashboard with analytics & status management
- ✅ Order status timeline visualization
- ✅ WhatsApp floating button
- ✅ Payment method selection (gateway-ready)
- ✅ Smooth animations & transitions
- ✅ Filter/category tabs on Products & Portfolio pages

### Backend
- ✅ REST API with Express.js
- ✅ JWT authentication
- ✅ MongoDB schemas (User + Order)
- ✅ Email notifications (Nodemailer)
- ✅ File upload support (Multer)
- ✅ Admin-only route protection
- ✅ Order analytics endpoint

---

## 🔧 Production Configuration

1. Set `MONGODB_URI` to your MongoDB Atlas connection string
2. Configure SMTP credentials for email notifications
3. Set a strong `JWT_SECRET`
4. Update `FRONTEND_URL` to your domain
5. Run `npm run build` in `/frontend` and serve `/dist`
6. Consider deploying backend to Railway, Render, or AWS EC2

---

## 📞 Support

**UniformsPro** | info@uniformspro.com | +91 1800 123 456
