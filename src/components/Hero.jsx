import React from 'react'
import { ArrowRight, Zap, Target, TrendingUp } from 'lucide-react'

export default function Hero({ onSignupClick }) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">Prospection B2B Automatisée</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Trouvez les bons prospects,
              <span className="gradient-text"> plus vite</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ProspectAI est votre assistant commercial intelligent. Identifiez, qualifiez et engagez les meilleurs prospects via email, LinkedIn et téléphone. Automatisez votre prospection B2B et augmentez vos conversions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={onSignupClick}
                className="btn-primary flex items-center justify-center space-x-2 group"
              >
                <span>Commencer gratuitement</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-outline flex items-center justify-center space-x-2">
                <span>Voir la démo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-gray-900">+500</p>
                <p className="text-sm text-gray-600">Entreprises utilisent ProspectAI</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">3x</p>
                <p className="text-sm text-gray-600">Plus de conversions en moyenne</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">24h</p>
                <p className="text-sm text-gray-600">Support client réactif</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="space-y-4">
                {/* Card 1 */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Identification</p>
                      <p className="text-sm text-gray-600">Détection automatique de prospects</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Scoring</p>
                      <p className="text-sm text-gray-600">Évaluation du potentiel</p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Engagement</p>
                      <p className="text-sm text-gray-600">Multicanal (Email, LinkedIn, Téléphone)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

