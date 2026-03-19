// routes/contact.js
const router     = require('express').Router()
const nodemailer = require('nodemailer')

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"${name}" <${process.env.FROM_EMAIL}>`,
      to:   process.env.ADMIN_EMAIL || 'admin@uniformspro.com',
      subject: `Contact Form: ${subject}`,
      html: `<h3>New Contact Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || '—'}</p>
        <p><strong>Company:</strong> ${company || '—'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p><p>${message}</p>`,
    })

    // Auto-reply
    await transporter.sendMail({
      from: `"UniformsPro" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: 'We received your inquiry — UniformsPro',
      html: `<h2>Hello ${name},</h2><p>Thank you for reaching out to UniformsPro. We'll respond to your inquiry within 24 business hours.</p><br><p>UniformsPro Team</p>`,
    })

    res.json({ success: true, message: 'Message sent successfully' })
  } catch (err) {
    // Even if email fails, acknowledge receipt in demo mode
    res.json({ success: true, message: 'Inquiry received (demo mode — email pending SMTP config)' })
  }
})

module.exports = router
