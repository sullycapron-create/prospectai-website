import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let signups = []
const signupsFile = path.join(__dirname, '../../signups.json')

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

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  }

  try {
    const { firstName, lastName, email, company, phone, plan } = JSON.parse(event.body)

    // Validation
    if (!firstName || !lastName || !email || !company) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Tous les champs obligatoires doivent être remplis',
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'L\'email fourni n\'est pas valide',
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    }

    // Check if email already exists
    if (signups.some(signup => signup.email === email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Cet email est déjà inscrit',
        }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
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

    // Send welcome response
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Inscription réussie! Vérifiez votre email pour confirmer.',
        signup: newSignup,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (error) {
    console.error('Error processing signup:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Une erreur est survenue lors de l\'inscription',
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
}
