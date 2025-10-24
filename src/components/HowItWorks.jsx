import React from 'react'
import { CheckCircle2 } from 'lucide-react'

const steps = [
  {
    number: '1',
    title: 'Connectez vos données',
    description: 'Intégrez vos sources de données (LinkedIn, sites web, bases de données) pour que ProspectAI commence à identifier les prospects',
  },
  {
    number: '2',
    title: 'Définissez vos critères',
    description: 'Spécifiez les caractéristiques de vos prospects idéaux : secteur, taille d\'entreprise, rôle, budget, etc.',
  },
  {
    number: '3',
    title: 'Laissez l\'IA travailler',
    description: 'Notre IA détecte automatiquement les prospects qualifiés et les score en temps réel',
  },
  {
    number: '4',
    title: 'Engagez via multicanal',
    description: 'Lancez des campagnes email, LinkedIn et téléphone personnalisées générées par l\'IA',
  },
  {
    number: '5',
    title: 'Suivez et optimisez',
    description: 'Analysez les performances et ajustez votre stratégie avec nos insights détaillés',
  },
  {
    number: '6',
    title: 'Convertissez en clients',
    description: 'Transformez vos prospects qualifiés en clients avec des séquences optimisées',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Comment ça marche</h2>
          <p className="section-subtitle">
            Un processus simple et efficace en 6 étapes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400 to-transparent"></div>
              )}

              <div className="card p-8 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="flex items-center space-x-2 text-blue-600">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-semibold">Étape {step.number}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Prêt à transformer votre prospection ?</h3>
          <p className="text-lg mb-8 opacity-90">
            Rejoignez des centaines d'entreprises qui utilisent ProspectAI pour augmenter leurs ventes
          </p>
          <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Commencer gratuitement
          </button>
        </div>
      </div>
    </section>
  )
}

