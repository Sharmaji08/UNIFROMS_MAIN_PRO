// controllers/orderController.js
const Order        = require('../models/Order')
const nodemailer   = require('nodemailer')

// Mailer helper
const sendMail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to, subject, html,
    })
  } catch (err) {
    console.error('Email error:', err.message)
  }
}

// POST /api/orders — Place new bulk order
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create({ ...req.body, user: req.user?._id })

    // Notify admin
    await sendMail(
      process.env.ADMIN_EMAIL || 'admin@uniformspro.com',
      `New Order: ${order.orderId}`,
      `<h2>New Order Received</h2><p>Order ID: ${order.orderId}</p><p>Company: ${order.company}</p><p>Qty: ${order.qty}</p><p>Type: ${order.uniformType}</p>`
    )
    // Notify customer
    await sendMail(
      order.email,
      `Order Confirmed — ${order.orderId}`,
      `<h2>Thank you, ${order.contact}!</h2><p>Your order <strong>${order.orderId}</strong> has been received.</p><p>Our team will send you a detailed quote within 48 hours.</p>`
    )

    res.status(201).json({ success: true, order })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

// GET /api/orders — Admin: all orders | User: own orders
exports.getOrders = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id }
    const orders = await Order.find(filter).populate('user','name email').sort({ createdAt: -1 })
    res.json({ success: true, count: orders.length, orders })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET /api/orders/:id
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' })
    res.json({ success: true, order })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// PATCH /api/orders/:id/status — Admin only
exports.updateStatus = async (req, res) => {
  try {
    const { status, note } = req.body
    const order = await Order.findOne({ orderId: req.params.id })
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' })

    order.status = status
    order.statusHistory.push({ status, note, updatedBy: req.user._id })
    await order.save()

    // Notify customer
    await sendMail(
      order.email,
      `Order Update — ${order.orderId}`,
      `<h2>Order Status Updated</h2><p>Order <strong>${order.orderId}</strong> status: <strong>${status}</strong></p>${note ? `<p>Note: ${note}</p>` : ''}`
    )

    res.json({ success: true, order })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// Analytics — Admin
exports.getAnalytics = async (req, res) => {
  try {
    const total   = await Order.countDocuments()
    const revenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }])
    const byStatus = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }])
    const recent   = await Order.find().sort({ createdAt: -1 }).limit(5)
    res.json({ success: true, total, revenue: revenue[0]?.total || 0, byStatus, recent })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
