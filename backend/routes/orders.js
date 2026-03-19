// routes/orders.js
const router = require('express').Router()
const { protect, adminOnly } = require('../middleware/auth')
const {
  createOrder, getOrders, getOrder, updateStatus, getAnalytics,
} = require('../controllers/orderController')

router.post('/',              createOrder)                     // Public — bulk order form
router.get('/',   protect,    getOrders)                       // Auth — list orders
router.get('/analytics', protect, adminOnly, getAnalytics)     // Admin only
router.get('/:id',            getOrder)                        // Public — track by ID
router.patch('/:id/status', protect, adminOnly, updateStatus)  // Admin only

module.exports = router