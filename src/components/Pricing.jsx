import React from 'react'
import { Check, X } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '99',
    description: 'Pour les entrepreneurs et petites équipes',
    features: [
      { name: 'Jusqu\'à 100 prospects/mois', included: true },
      { name: 'Détection automatique', included: true },
      { name: 'Scoring de base', included: true },
      { name: '1 utilisateur', included: true },
      { name: 'Email & LinkedIn', included: true },
      { name: 'Support email', included: true },
      { name: 'Intégrations', included: false },
      { name: 'API', included: false },
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: '299',
    description: 'Pour les équipes de vente en croissance',
    features: [
      { name: 'Jusqu\'à 500 prospects/mois', included: true },
      { name: 'Détection automatique', included: true },
      { name: 'Scoring avancé', included: true },
      { name: 'Jusqu\'à 5 utilisateurs', included: true },
      { name: 'Email, LinkedIn & Téléphone', included: true },
      { name: 'Support prioritaire', included: true },
      { name: 'Intégrations (HubSpot, Salesforce)', included: true },
      { name: 'API', included: false },
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    description: 'Pour les grandes organisations',
    features: [
      { name: 'Prospects illimités', included: true },
      { name: 'Détection automatique avancée', included: true },
      { name: 'Scoring personnalisé', included: true },
      { name: 'Utilisateurs illimités', included: true },
      { name: 'Tous les canaux', included: true },
      { name: 'Support 24/7 dédié', included: true },
      { name: 'Intégrations illimitées', included: true },
      { name: 'API complète', included: true },
    ],
    popular: false,
  },
]

export default function Pricing({ onSignupClick }) {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title">Tarifs Transparents</h2>
          <p className="section-subtitle">
            Choisissez le plan qui correspond à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? 'card shadow-2xl scale-105 border-2 border-blue-600 p-8'
                  : 'card p-8'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Populaire
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              <div className="mb-8">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== 'Sur devis' && <span className="text-gray-600 ml-2">/mois</span>}
                </div>
              </div>

              <button
                onClick={onSignupClick}
                className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all duration-200 ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {plan.price === 'Sur devis' ? 'Contacter' : 'Commencer'}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span
                      className={
                        feature.included ? 'text-gray-900' : 'text-gray-400'
                      }
                    >
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Questions Fréquentes
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Puis-je changer de plan ?</h4>
              <p className="text-gray-600">
                Oui, vous pouvez passer à un plan supérieur ou inférieur à tout moment. Les changements prennent effet immédiatement.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Y a-t-il une période d'essai ?</h4>
              <p className="text-gray-600">
                Oui, 14 jours gratuits sans carte bancaire requise pour tous les plans.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Quelle est votre politique d'annulation ?</h4>
              <p className="text-gray-600">
                Vous pouvez annuler à tout moment. Pas de contrat à long terme, pas de frais cachés.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Offrez-vous des remises annuelles ?</h4>
              <p className="text-gray-600">
                Oui, 20% de réduction si vous payez annuellement. Contactez notre équipe pour plus de détails.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

