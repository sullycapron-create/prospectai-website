# ⚡ Quick Start - Déployer ProspectAI en 15 minutes

## 🎯 Objectif
Déployer le site ProspectAI sur Railway et le rendre accessible publiquement.

## 📋 Étapes rapides

### 1️⃣ Créer un compte GitHub (2 min)
- Allez sur https://github.com
- Cliquez "Sign up"
- Complétez l'inscription
- Vérifiez votre email

### 2️⃣ Créer un repository GitHub (2 min)
- Cliquez sur "New" (bouton vert)
- Nommez-le : `prospectai-website`
- Sélectionnez "Public"
- Cliquez "Create repository"

### 3️⃣ Pousser le code (2 min)
Exécutez ces commandes :
```bash
cd /home/ubuntu/prospectai-website
git remote add origin https://github.com/VOTRE_USERNAME/prospectai-website.git
git branch -M main
git push -u origin main
```

**Remplacez `VOTRE_USERNAME` par votre username GitHub**

### 4️⃣ Créer un compte Railway (2 min)
- Allez sur https://railway.app
- Cliquez "Start Project"
- Connectez-vous avec GitHub
- Autorisez Railway

### 5️⃣ Déployer sur Railway (3 min)
1. Cliquez "New Project"
2. Sélectionnez "Deploy from GitHub"
3. Cherchez `prospectai-website`
4. Cliquez "Deploy"
5. Attendez le déploiement (2-3 min)

### 6️⃣ Configurer les variables (2 min)
1. Allez dans l'onglet "Variables"
2. Ajoutez :
```
ADMIN_EMAIL=sully.capron@synolia.com
NODE_ENV=production
```
3. Cliquez "Save"

### 7️⃣ Accéder au site (1 min)
1. Allez dans "Deployments"
2. Cliquez sur le domaine généré
3. Votre site est en ligne ! 🎉

## 🔗 Résultat
Votre site sera accessible à :
```
https://prospectai-website-production.up.railway.app
```

## 📧 Notifications email (Optionnel)

Pour recevoir les emails d'inscription :

1. Créez un compte Gmail
2. Activez l'authentification 2FA
3. Générez un mot de passe d'application : https://myaccount.google.com/apppasswords
4. Dans Railway, ajoutez les variables :
```
EMAIL_SERVICE=gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
```

## ✅ Vérification

1. Allez sur votre site
2. Testez le formulaire d'inscription
3. Vérifiez que vous recevez l'email (si configuré)
4. Consultez les logs dans Railway

## 🆘 Aide

- **GitHub Setup** : Voir `GITHUB_SETUP.md`
- **Railway Détails** : Voir `RAILWAY_DEPLOYMENT.md`
- **Dépannage** : Voir `DEPLOYMENT_SUMMARY.md`

## ⏱️ Temps total : ~15 minutes

---

**C'est tout ! Votre site est maintenant en production ! 🚀**
