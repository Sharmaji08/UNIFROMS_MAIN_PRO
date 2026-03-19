// server.js — UniformsPro Backend Entry Point
const express = require('express')
const cors    = require('cors')
const path    = require('path')
require('dotenv').config()

const app = express()

/* ── Middleware ── */
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))

/* ── Database ── */
// Uncomment and configure when MongoDB is ready:
// const connectDB = require('./config/db')
// connectDB()

/* ── Routes ── */
app.use('/api/auth',    require('./routes/auth'))
app.use('/api/orders',  require('./routes/orders'))
app.use('/api/users',   require('./routes/users'))
app.use('/api/contact', require('./routes/contact'))

/* ── Health check ── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'UniformsPro API', version: '1.0.0', time: new Date() })
})

/* ── Error handler ── */
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  })
})

/* ── 404 handler ── */
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`\n🚀 UniformsPro Backend running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health\n`)
})
