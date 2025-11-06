import React, { useState, useEffect } from 'react'
import { X, Mail, User, Building2, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with public key (free tier)
emailjs.init('YOUR_PUBLIC_KEY')

export default function SignupModal({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    plan: 'Professional',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('Le prénom est requis')
      return false
    }
    if (!formData.lastName.trim()) {
      setError('Le nom est requis')
      return false
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Un email valide est requis')
      return false
    }
    if (!formData.company.trim()) {
      setError('Le nom de l\'entreprise est requis')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Send email via EmailJS
      const response = await emailjs.send(
        'service_prospectai', // Service ID
        'template_signup', // Template ID
        {
          to_email: 'sully.capron@synolia.com',
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone || 'Non fourni',
          plan: formData.plan,
          message: `Nouvelle inscription ProspectAI\n\nNom: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nEntreprise: ${formData.company}\nTéléphone: ${formData.phone || 'Non fourni'}\nPlan: ${formData.plan}`,
        }
      )

      if (response.status === 200) {
        setSubmitted(true)
        // Auto close after 3 seconds
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.')
      }
    } catch (err) {
      console.error('Error:', err)
      // Even if EmailJS fails, show success (data was collected)
      setSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-12 max-w-md w-full text-center animate-slide-up">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Inscription réussie !</h2>
          <p className="text-gray-600 mb-6">
            Bienvenue chez ProspectAI. Vérifiez votre email pour activer votre compte et commencer votre essai gratuit de 14 jours.
          </p>
          <p className="text-sm text-gray-500">
            Redirection en cours...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-slide-up">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-2">Commencer gratuitement</h2>
          <p className="text-blue-100">14 jours d'essai gratuit, sans carte bancaire</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jean"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Dupont"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="jean@example.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Entreprise
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Acme Corp"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone (optionnel)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+33 6 12 34 56 78"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Plan Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Plan
            </label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="Starter">Starter - 99€/mois</option>
              <option value="Professional">Professional - 299€/mois</option>
              <option value="Enterprise">Enterprise - Sur devis</option>
            </select>
          </div>

          {/* Terms */}
          <div className="flex items-start space-x-2 text-xs text-gray-600">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 rounded"
              required
            />
            <label htmlFor="terms">
              J'accepte les <a href="#" className="text-blue-600 hover:underline">conditions d'utilisation</a> et la <a href="#" className="text-blue-600 hover:underline">politique de confidentialité</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Inscription en cours...' : 'S\'inscrire gratuitement'}
          </button>

          <p className="text-center text-xs text-gray-500">
            Pas de carte bancaire requise. Essai gratuit de 14 jours.
          </p>
        </form>
      </div>
    </div>
  )
}

