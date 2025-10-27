# 🚀 Guide de déploiement sur Railway

Ce guide vous montre comment déployer ProspectAI sur **Railway** en quelques minutes.

## 📋 Prérequis

- Un compte GitHub (gratuit)
- Un compte Railway (gratuit avec crédit initial)
- L'adresse email : sully.capron@synolia.com

## ✅ Étapes de déploiement

### Étape 1 : Créer un compte Railway

1. Allez sur [railway.app](https://railway.app)
2. Cliquez sur **"Start Project"**
3. Connectez-vous avec GitHub (ou créez un compte)
4. Autorisez Railway à accéder à votre compte GitHub

### Étape 2 : Créer un nouveau projet

1. Cliquez sur **"New Project"**
2. Sélectionnez **"Deploy from GitHub"**
3. Connectez votre compte GitHub si ce n'est pas fait
4. Cherchez le repository `prospectai-website`
5. Cliquez sur **"Deploy"**

### Étape 3 : Configurer les variables d'environnement

Une fois le déploiement lancé :

1. Allez dans l'onglet **"Variables"**
2. Ajoutez les variables suivantes :

```
ADMIN_EMAIL=sully.capron@synolia.com
NODE_ENV=production
PORT=3000
```

3. Cliquez sur **"Save"**

### Étape 4 : Attendre le déploiement

- Railway va automatiquement :
  - Installer les dépendances (`npm install`)
  - Compiler le frontend (`npm run build`)
  - Démarrer le serveur (`node server.js`)

- Le déploiement prend environ 2-3 minutes

### Étape 5 : Accéder à votre site

Une fois le déploiement terminé :

1. Allez dans l'onglet **"Deployments"**
2. Cliquez sur le domaine généré (ex: `prospectai-website-production.up.railway.app`)
3. Votre site est maintenant en ligne ! 🎉

## 🔗 URL de votre site

Votre site sera accessible à une URL comme :
```
https://prospectai-website-production.up.railway.app
```

## 📧 Configuration des notifications email

Pour activer les notifications email, vous devez configurer les variables d'environnement :

### Option 1 : Gmail (Recommandé)

1. Créez un compte Gmail ou utilisez un existant
2. Activez l'authentification 2FA
3. Générez un mot de passe d'application : https://myaccount.google.com/apppasswords
4. Dans Railway, ajoutez les variables :

```
EMAIL_SERVICE=gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-application
ADMIN_EMAIL=sully.capron@synolia.com
```

### Option 2 : SendGrid (Gratuit jusqu'à 100 emails/jour)

1. Créez un compte sur [sendgrid.com](https://sendgrid.com)
2. Créez une clé API
3. Ajoutez les variables dans Railway :

```
EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=votre-clé-api
ADMIN_EMAIL=sully.capron@synolia.com
```

## 🔗 Configuration des webhooks Make

Pour intégrer avec HubSpot, Google Sheets, etc. :

1. Créez un compte sur [make.com](https://make.com)
2. Créez un webhook entrant
3. Copiez l'URL du webhook
4. Dans Railway, ajoutez la variable :

```
MAKE_WEBHOOK_URL=https://hook.make.com/...
```

## 📊 Monitoring

### Voir les logs

1. Dans Railway, allez dans l'onglet **"Logs"**
2. Vous verrez tous les logs en temps réel
3. Cherchez les erreurs ou problèmes

### Redéployer

Pour redéployer après des modifications :

1. Poussez vos changements sur GitHub
2. Railway va automatiquement redéployer

```bash
git push origin main
```

## 🆘 Dépannage

### Le site ne démarre pas

1. Vérifiez les logs dans Railway
2. Vérifiez que `PORT` est défini (par défaut 3000)
3. Assurez-vous que `npm run build` fonctionne localement

### Les notifications ne fonctionnent pas

1. Vérifiez que `EMAIL_USER` et `EMAIL_PASSWORD` sont corrects
2. Vérifiez les logs pour les erreurs d'email
3. Testez localement : `node server.js`

### Le site est lent

1. Railway peut être lent au premier accès (démarrage à froid)
2. Attendez quelques secondes et réessayez
3. Vérifiez les logs pour les goulots d'étranglement

## 💰 Coûts

- **Railway** : Gratuit avec crédit initial ($5/mois)
- **Domaine personnalisé** : Optionnel (~$10-15/an)
- **Email** : Gratuit (Gmail) ou payant (SendGrid)

## 🎯 Prochaines étapes

### Ajouter un domaine personnalisé

1. Dans Railway, allez dans **"Settings"** → **"Domains"**
2. Cliquez sur **"Add Domain"**
3. Entrez votre domaine (ex: prospectai.com)
4. Configurez les DNS records selon les instructions

### Configurer les notifications

1. Configurez l'email (voir ci-dessus)
2. Testez une inscription
3. Vérifiez que vous recevez l'email

### Ajouter une base de données

1. Dans Railway, cliquez sur **"New"**
2. Sélectionnez **"PostgreSQL"**
3. Connectez-la à votre projet
4. Mettez à jour votre code pour utiliser PostgreSQL

## 📞 Support

- **Railway Docs** : https://docs.railway.app
- **GitHub Issues** : Signalez les bugs
- **Email** : support@railway.app

## ✅ Checklist de déploiement

- [ ] Compte Railway créé
- [ ] Repository GitHub connecté
- [ ] Projet créé dans Railway
- [ ] Variables d'environnement configurées
- [ ] Déploiement réussi
- [ ] Site accessible via l'URL Railway
- [ ] Email configuré (optionnel)
- [ ] Webhooks Make configurés (optionnel)
- [ ] Domaine personnalisé ajouté (optionnel)

---

**Votre site ProspectAI est maintenant en production ! 🚀**

