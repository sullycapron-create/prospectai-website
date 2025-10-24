/**
 * Notification Service
 * Handles email notifications and webhook triggers for new signups
 */

import nodemailer from 'nodemailer'
import axios from 'axios'

// Email configuration (configure with your email service)
const emailConfig = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  user: process.env.EMAIL_USER || 'noreply@prospectai.com',
  pass: process.env.EMAIL_PASSWORD || '',
}

// Make webhook URL for integration
const MAKE_WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL || ''

// Create email transporter
let transporter = null
if (emailConfig.user && emailConfig.pass) {
  transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.pass,
    },
  })
}

/**
 * Send welcome email to new signup
 */
export async function sendWelcomeEmail(signup) {
  if (!transporter) {
    console.log('📧 Email service not configured. Skipping welcome email.')
    return
  }

  try {
    const mailOptions = {
      from: emailConfig.user,
      to: signup.email,
      subject: 'Bienvenue chez ProspectAI! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Bienvenue chez ProspectAI!</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre assistant commercial intelligent</p>
          </div>
          
          <div style="padding: 40px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
            <p>Bonjour ${signup.firstName},</p>
            
            <p>Merci de vous être inscrit à ProspectAI! Nous sommes ravis de vous accueillir.</p>
            
            <p>Voici les prochaines étapes:</p>
            <ol style="color: #333;">
              <li><strong>Vérifiez votre email</strong> - Cliquez sur le lien de confirmation ci-dessous</li>
              <li><strong>Accédez à votre compte</strong> - Connectez-vous à votre tableau de bord</li>
              <li><strong>Commencez votre essai gratuit</strong> - 14 jours sans carte bancaire</li>
            </ol>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://prospectai.com/verify?email=${signup.email}" 
                 style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
                Vérifier mon email
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Plan sélectionné: <strong>${signup.plan}</strong><br>
              Email: <strong>${signup.email}</strong><br>
              Entreprise: <strong>${signup.company}</strong>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="color: #666; font-size: 12px;">
              Des questions? Contactez notre équipe support à support@prospectai.com<br>
              © 2025 ProspectAI. Tous droits réservés.
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`✅ Welcome email sent to ${signup.email}`)
  } catch (error) {
    console.error('❌ Error sending welcome email:', error)
  }
}

/**
 * Send admin notification about new signup
 */
export async function sendAdminNotification(signup) {
  if (!transporter) {
    console.log('📧 Email service not configured. Skipping admin notification.')
    return
  }

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@prospectai.com'
    
    const mailOptions = {
      from: emailConfig.user,
      to: adminEmail,
      subject: `🎉 Nouvelle inscription: ${signup.firstName} ${signup.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
            <h2 style="margin: 0;">Nouvelle inscription!</h2>
          </div>
          
          <div style="padding: 20px; background: #f8f9fa; border-radius: 0 0 10px 10px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold; width: 150px;">Nom:</td>
                <td style="padding: 10px;">${signup.firstName} ${signup.lastName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Email:</td>
                <td style="padding: 10px;"><a href="mailto:${signup.email}">${signup.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Entreprise:</td>
                <td style="padding: 10px;">${signup.company}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Téléphone:</td>
                <td style="padding: 10px;">${signup.phone || 'Non fourni'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Plan:</td>
                <td style="padding: 10px;"><strong>${signup.plan}</strong></td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Date:</td>
                <td style="padding: 10px;">${new Date(signup.createdAt).toLocaleString('fr-FR')}</td>
              </tr>
            </table>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log(`✅ Admin notification sent about ${signup.email}`)
  } catch (error) {
    console.error('❌ Error sending admin notification:', error)
  }
}

/**
 * Trigger Make webhook for new signup
 * This allows integration with HubSpot, Google Sheets, etc.
 */
export async function triggerMakeWebhook(signup) {
  if (!MAKE_WEBHOOK_URL) {
    console.log('🔗 Make webhook URL not configured. Skipping webhook trigger.')
    return
  }

  try {
    const payload = {
      type: 'new_signup',
      timestamp: new Date().toISOString(),
      data: {
        id: signup.id,
        firstName: signup.firstName,
        lastName: signup.lastName,
        email: signup.email,
        company: signup.company,
        phone: signup.phone,
        plan: signup.plan,
        createdAt: signup.createdAt,
      },
    }

    const response = await axios.post(MAKE_WEBHOOK_URL, payload, {
      timeout: 5000,
    })

    console.log(`✅ Make webhook triggered for ${signup.email}`)
    return response.data
  } catch (error) {
    console.error('❌ Error triggering Make webhook:', error.message)
  }
}

/**
 * Send Slack notification (if webhook is configured)
 */
export async function sendSlackNotification(signup) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

  if (!slackWebhookUrl) {
    return
  }

  try {
    const message = {
      text: `🎉 Nouvelle inscription ProspectAI`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '🎉 Nouvelle inscription ProspectAI',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Nom:*\n${signup.firstName} ${signup.lastName}`,
            },
            {
              type: 'mrkdwn',
              text: `*Email:*\n${signup.email}`,
            },
            {
              type: 'mrkdwn',
              text: `*Entreprise:*\n${signup.company}`,
            },
            {
              type: 'mrkdwn',
              text: `*Plan:*\n${signup.plan}`,
            },
          ],
        },
      ],
    }

    await axios.post(slackWebhookUrl, message)
    console.log(`✅ Slack notification sent for ${signup.email}`)
  } catch (error) {
    console.error('❌ Error sending Slack notification:', error.message)
  }
}

/**
 * Process all notifications for a new signup
 */
export async function processSignupNotifications(signup) {
  console.log(`\n📬 Processing notifications for ${signup.email}...`)

  // Send welcome email
  await sendWelcomeEmail(signup)

  // Send admin notification
  await sendAdminNotification(signup)

  // Trigger Make webhook for integrations
  await triggerMakeWebhook(signup)

  // Send Slack notification
  await sendSlackNotification(signup)

  console.log(`✅ All notifications processed for ${signup.email}\n`)
}

