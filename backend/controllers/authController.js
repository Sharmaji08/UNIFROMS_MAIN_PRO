// controllers/authController.js
const jwt  = require('jsonwebtoken')
const User = require('../models/User')

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' })

// POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, company } = req.body
    if (await User.findOne({ email })) {
      return res.status(400).json({ success: false, message: 'Email already registered' })
    }
    const user = await User.create({ name, email, password, phone, company })
    const token = signToken(user._id)
    res.status(201).json({ success: true, token, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' })
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    const token = signToken(user._id)
    res.json({ success: true, token, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

// GET /api/auth/me
exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user })
}
