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

export const handler = async (event) => {
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
    return {
      statusCode: 200,
      body: JSON.stringify(stats),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching stats' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
}
