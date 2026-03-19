// routes/users.js
const router = require('express').Router()
const { protect, adminOnly } = require('../middleware/auth')
const User = require('../models/User')

// Admin: get all users
router.get('/', protect, adminOnly, async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 })
  res.json({ success: true, count: users.length, users })
})

// Update own profile
router.patch('/me', protect, async (req, res) => {
  const { name, phone, company } = req.body
  const user = await User.findByIdAndUpdate(req.user._id, { name, phone, company }, { new: true, runValidators: true })
  res.json({ success: true, user })
})

module.exports = router
