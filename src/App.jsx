import React, { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
import SignupModal from './components/SignupModal'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [showSignupModal, setShowSignupModal] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header onSignupClick={() => setShowSignupModal(true)} />
      <Hero onSignupClick={() => setShowSignupModal(true)} />
      <Features />
      <HowItWorks />
      <Pricing onSignupClick={() => setShowSignupModal(true)} />
      <Footer onSignupClick={() => setShowSignupModal(true)} />
      
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} />
      )}
    </div>
  )
}

export default App

