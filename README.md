# ProspectAI - Assistant Commercial Intelligent

Un site web moderne et professionnel pour **ProspectAI**, un assistant commercial intelligent spécialisé en prospection B2B multicanal (Email, LinkedIn, téléphone).

## 🎯 Vue d'ensemble

ProspectAI aide les business developers B2B à :
- **Identifier** automatiquement les prospects qualifiés
- **Qualifier** les leads avec des signaux d'intention d'achat
- **Scorer** les prospects selon des critères définis
- **Engager** via email, LinkedIn et téléphone
- **Synchroniser** les données vers HubSpot, Google Sheets via Make
- **Notifier** instantanément les nouvelles inscriptions

## 🚀 Fonctionnalités

### Frontend (React + Tailwind CSS)
- ✅ Page d'accueil moderne et responsive
- ✅ Section des fonctionnalités (12 fonctionnalités principales)
- ✅ Processus "Comment ça marche" en 6 étapes
- ✅ Tarification transparente (3 plans)
- ✅ Formulaire d'inscription modal
- ✅ Validation de formulaire côté client
- ✅ Navigation fluide avec scroll smooth

### Backend (Node.js + Express)
- ✅ API REST pour les inscriptions
- ✅ Stockage des données (JSON)
- ✅ Statistiques d'inscriptions
- ✅ Système de notifications intégré
- ✅ Support des webhooks Make
- ✅ Gestion des erreurs robuste

### Notifications
- 📧 **Email** - Emails de bienvenue et notifications admin
- 🔗 **Make Webhooks** - Intégration avec HubSpot, Google Sheets, Salesforce
- 💬 **Slack** - Notifications en temps réel
- 📊 **Statistiques** - Suivi des inscriptions par plan et période

## 📋 Structure du projet

```
prospectai-website/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation et logo
│   │   ├── Hero.jsx            # Section héro avec CTA
│   │   ├── Features.jsx        # 12 fonctionnalités
│   │   ├── HowItWorks.jsx      # Processus en 6 étapes
│   │   ├── Pricing.jsx         # Plans de tarification
│   │   ├── SignupModal.jsx     # Formulaire d'inscription
│   │   └── Footer.jsx          # Pied de page
│   ├── App.jsx                 # Composant principal
│   ├── main.jsx                # Point d'entrée React
│   └── index.css               # Styles globaux
├── dist/                       # Build de production
├── server.js                   # Serveur Node.js/Express
├── notification-service.js     # Service de notifications
├── package.json                # Dépendances
├── vite.config.js             # Configuration Vite
├── tailwind.config.js         # Configuration Tailwind
├── postcss.config.js          # Configuration PostCSS
├── index.html                 # HTML d'entrée
└── signups.json               # Données des inscriptions
```

## 🛠️ Installation et démarrage

### Prérequis
- Node.js 16+ 
- npm ou yarn

### Installation
```bash
cd prospectai-website
npm install
```

### Développement
```bash
# Terminal 1 - Frontend (Vite dev server)
npm run dev

# Terminal 2 - Backend
node server.js
```

Le site sera accessible à `http://localhost:3000` et l'API à `http://localhost:5000`.

### Production
```bash
# Build du frontend
npm run build

# Démarrer le serveur
node server.js
```

## 🔧 Configuration des notifications

### Email (Nodemailer)
```bash
export EMAIL_SERVICE=gmail
export EMAIL_USER=votre-email@gmail.com
export EMAIL_PASSWORD=votre-mot-de-passe
export ADMIN_EMAIL=admin@prospectai.com
```

### Make Webhooks
```bash
export MAKE_WEBHOOK_URL=https://hook.make.com/...
```

### Slack
```bash
export SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
```

## 📊 API Endpoints

### Inscriptions
```
POST /api/signup
Crée une nouvelle inscription
Body: {
  firstName: string,
  lastName: string,
  email: string,
  company: string,
  phone?: string,
  plan: 'Starter' | 'Professional' | 'Enterprise'
}
```

### Statistiques
```
GET /api/stats
Retourne les statistiques d'inscriptions
Response: {
  totalSignups: number,
  byPlan: { Starter: number, Professional: number, Enterprise: number },
  thisWeek: number,
  thisMonth: number
}
```

### Inscriptions (Admin)
```
GET /api/signups
Retourne toutes les inscriptions
Response: {
  total: number,
  signups: Signup[]
}
```

### Santé du serveur
```
GET /api/health
Vérifie l'état du serveur
Response: { status: 'ok', timestamp: string }
```

## 🎨 Personnalisation

### Couleurs
Modifiez `tailwind.config.js` pour changer la palette de couleurs :
```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    600: '#0284c7',
    // ...
  }
}
```

### Textes
Modifiez les composants React pour changer les textes et contenus.

### Plans de tarification
Modifiez `src/components/Pricing.jsx` pour ajouter/modifier les plans.

## 📦 Dépendances principales

- **React 18** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Express** - Backend framework
- **Nodemailer** - Email service
- **Axios** - HTTP client

## 🔐 Sécurité

- ✅ Validation des emails
- ✅ Vérification des doublons
- ✅ CORS configuré
- ✅ Gestion des erreurs robuste
- ✅ Pas de données sensibles en dur

## 📈 Monitoring et Analytics

### Logs du serveur
```bash
tail -f /tmp/prospectai-server.log
```

### Vérifier les inscriptions
```bash
curl http://localhost:5000/api/stats
curl http://localhost:5000/api/signups
```

## 🚀 Déploiement

### Sur Vercel (Frontend + Backend)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel
```

### Sur Heroku
```bash
# Créer une application
heroku create prospectai-website

# Déployer
git push heroku main
```

### Sur un serveur personnel
```bash
# Compiler le frontend
npm run build

# Démarrer le serveur
NODE_ENV=production node server.js
```

## 📞 Support et contact

- Email: support@prospectai.com
- Website: https://prospectai.com
- Documentation: https://docs.prospectai.com

## 📄 Licence

© 2025 ProspectAI. Tous droits réservés.

## 🤝 Contribution

Les contributions sont bienvenues! Veuillez créer une issue ou un pull request.

## 📝 Changelog

### v1.0.0 (2025-10-23)
- ✅ Lancement initial du site
- ✅ Système d'inscription fonctionnel
- ✅ Notifications par email
- ✅ Intégration Make webhooks
- ✅ API REST complète
- ✅ Design responsive

