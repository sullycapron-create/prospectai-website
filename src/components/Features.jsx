import React from 'react'
import {
  Search,
  Brain,
  Mail,
  Linkedin,
  Phone,
  BarChart3,
  Zap,
  Shield,
  Clock,
  Users,
  Settings,
  TrendingUp,
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Détection Intelligente',
    description: 'Identifiez automatiquement les prospects qualifiés avec des signaux d\'intention d\'achat',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Brain,
    title: 'IA Avancée',
    description: 'Algorithmes de machine learning pour qualifier et scorer vos prospects en temps réel',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Mail,
    title: 'Campagnes Email',
    description: 'Générez des séquences email personnalisées et optimisées pour la conversion',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Linkedin,
    title: 'Prospection LinkedIn',
    description: 'Automatisez votre présence sur LinkedIn avec des messages ciblés et pertinents',
    color: 'from-blue-600 to-blue-700',
  },
  {
    icon: Phone,
    title: 'Scripts d\'Appels',
    description: 'Obtenez des scripts d\'appels adaptés à chaque prospect pour augmenter vos taux de conversion',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: BarChart3,
    title: 'Scoring Avancé',
    description: 'Évaluez automatiquement le potentiel de chaque prospect selon des critères définis',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: Zap,
    title: 'Intégrations',
    description: 'Connectez HubSpot, Google Sheets, Salesforce et autres outils via Make',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    icon: Shield,
    title: 'Sécurité',
    description: 'Vos données sont protégées avec le chiffrement de grade entreprise',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: Clock,
    title: 'Temps Réel',
    description: 'Recevez les notifications instantanément pour les nouveaux prospects',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Travaillez en équipe avec des rôles et permissions personnalisables',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Settings,
    title: 'Personnalisation',
    description: 'Adaptez ProspectAI à votre processus de vente unique',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: TrendingUp,
    title: 'Analytics',
    description: 'Suivez vos performances avec des tableaux de bord détaillés et insights actionnables',
    color: 'from-lime-500 to-lime-600',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Fonctionnalités Puissantes</h2>
          <p className="section-subtitle">
            Tout ce dont vous avez besoin pour automatiser votre prospection B2B
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="card p-8 hover:shadow-xl transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

