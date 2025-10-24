import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { processSignupNotifications } from './notification-service.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Serve static files from dist folder
app.use(express.static(path.join(__dirname, 'dist')))

// Data storage (in-memory for demo, replace with database in production)
let signups = []
const signupsFile = path.join(__dirname, 'signups.json')

// Load existing signups from file
if (fs.existsSync(signupsFile)) {
  try {
    const data = fs.readFileSync(signupsFile, 'utf-8')
    signups = JSON.parse(data)
  } catch (err) {
    console.error('Error loading signups:', err)
  }
}

// Save signups to file
const saveSignups = () => {
  try {
    fs.writeFileSync(signupsFile, JSON.stringify(signups, null, 2))
  } catch (err) {
    console.error('Error saving signups:', err)
  }
}

// API Routes

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, company, phone, plan } = req.body

    // Validation
    if (!firstName || !lastName || !email || !company) {
      return res.status(400).json({
        message: 'Tous les champs obligatoires doivent être remplis',
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'L\'email fourni n\'est pas valide',
      })
    }

    // Check if email already exists
    if (signups.some(signup => signup.email === email)) {
      return res.status(400).json({
        message: 'Cet email est déjà inscrit',
      })
    }

    // Create new signup
    const newSignup = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      company,
      phone: phone || '',
      plan: plan || 'Professional',
      createdAt: new Date().toISOString(),
      status: 'pending',
    }

    // Add to list
    signups.push(newSignup)
    saveSignups()

    // Log to console
    console.log('📧 New signup:', newSignup)

    // Process notifications asynchronously (don't wait for them)
    processSignupNotifications(newSignup).catch(err => {
      console.error('Error processing notifications:', err)
    })

    // Send welcome response
    res.status(201).json({
      message: 'Inscription réussie! Vérifiez votre email pour confirmer.',
      signup: newSignup,
    })
  } catch (error) {
    console.error('Error processing signup:', error)
    res.status(500).json({
      message: 'Une erreur est survenue lors de l\'inscription',
    })
  }
})

// Get all signups (admin endpoint - should be protected)
app.get('/api/signups', (req, res) => {
  try {
    res.json({
      total: signups.length,
      signups: signups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching signups' })
  }
})

// Get signup statistics
app.get('/api/stats', (req, res) => {
  try {
    const stats = {
      totalSignups: signups.length,
      byPlan: {
        Starter: signups.filter(s => s.plan === 'Starter').length,
        Professional: signups.filter(s => s.plan === 'Professional').length,
        Enterprise: signups.filter(s => s.plan === 'Enterprise').length,
      },
      thisWeek: signups.filter(s => {
        const date = new Date(s.createdAt)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return date >= weekAgo
      }).length,
      thisMonth: signups.filter(s => {
        const date = new Date(s.createdAt)
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        return date >= monthAgo
      }).length,
    }
    res.json(stats)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Serve React app for all other routes (must be last)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ProspectAI Server running on http://localhost:${PORT}`)
  console.log(`📊 Admin stats: http://localhost:${PORT}/api/stats`)
  console.log(`📋 Signups: http://localhost:${PORT}/api/signups`)
  console.log(`\n📧 Notification Service:`)
  console.log(`   - Email notifications: ${process.env.EMAIL_USER ? '✅ Configured' : '⚠️ Not configured'}`)
  console.log(`   - Make webhooks: ${process.env.MAKE_WEBHOOK_URL ? '✅ Configured' : '⚠️ Not configured'}`)
  console.log(`   - Slack notifications: ${process.env.SLACK_WEBHOOK_URL ? '✅ Configured' : '⚠️ Not configured'}`)
})

