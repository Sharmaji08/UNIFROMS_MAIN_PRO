// models/Order.js
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  orderId:     { type: String, unique: true, required: true },
  user:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },

  // Company info
  company:     { type: String, required: true },
  contact:     { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  whatsapp:    { type: String },

  // Order details
  uniformType: { type: String, required: true },
  qty:         { type: Number, required: true, min: 20 },
  fabric:      { type: String },
  sizes:       { type: String },
  customizations: [{ type: String }],
  logoFile:    { type: String, default: null }, // uploaded file path

  // Delivery
  deliveryAddress: { type: String, required: true },
  deliveryCity:    { type: String, required: true },
  deliveryState:   { type: String, required: true },
  deliveryPincode: { type: String, required: true },
  notes:           { type: String },
  budget:          { type: String },

  // Status & Payment
  status: {
    type: String,
    enum: ['received','processing','production','shipped','delivered'],
    default: 'received',
  },
  amount:        { type: Number, default: 0 },         // in INR
  paymentStatus: { type: String, enum: ['pending','paid','partial','refunded'], default: 'pending' },
  paymentMethod: { type: String, default: null },

  // Tracking
  statusHistory: [{
    status: String,
    note:   String,
    updatedAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  }],
}, { timestamps: true })

// Auto-generate orderId
orderSchema.pre('validate', function(next) {
  if (!this.orderId) {
    this.orderId = 'UP-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 9000 + 1000)
  }
  next()
})

module.exports = mongoose.model('Order', orderSchema)
