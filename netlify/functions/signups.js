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
    return {
      statusCode: 200,
      body: JSON.stringify({
        total: signups.length,
        signups: signups.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error fetching signups' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    }
  }
}
