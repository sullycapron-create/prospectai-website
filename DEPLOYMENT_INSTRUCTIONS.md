# 📋 Instructions de déploiement - ProspectAI

## 🎯 Vue d'ensemble

Votre site web ProspectAI est **prêt à être déployé** sur Railway. Ce document vous guide étape par étape pour mettre votre site en production.

## ✨ Ce que vous avez

Un projet complet avec :
- ✅ Frontend React moderne et responsive
- ✅ Backend Node.js avec API REST
- ✅ Système d'inscription avec validation
- ✅ Service de notifications email
- ✅ Code source versionné avec Git
- ✅ Build de production optimisé
- ✅ Configuration pour Railway et Vercel

## 🚀 Déploiement en 3 étapes

### Étape 1 : Pousser le code sur GitHub

**Durée estimée** : 5 minutes

Vous devez d'abord créer un repository GitHub et pousser votre code.

**Commandes à exécuter** :

```bash
# 1. Allez dans le dossier du projet
cd /home/ubuntu/prospectai-website

# 2. Créez un repository GitHub sur https://github.com/new
#    Nommez-le : prospectai-website
#    Sélectionnez "Public"

# 3. Connectez votre repository local à GitHub
git remote add origin https://github.com/VOTRE_USERNAME/prospectai-website.git

# 4. Renommez la branche en 'main'
git branch -M main

# 5. Poussez le code
git push -u origin main
```

**Important** : Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

**Vérification** : Allez sur https://github.com/VOTRE_USERNAME/prospectai-website et vérifiez que tous les fichiers sont présents.

### Étape 2 : Créer un compte Railway et déployer

**Durée estimée** : 5 minutes

1. **Créer un compte Railway**
   - Allez sur https://railway.app
   - Cliquez sur **"Start Project"**
   - Connectez-vous avec GitHub
   - Autorisez Railway à accéder à votre compte

2. **Créer un nouveau projet**
   - Cliquez sur **"New Project"**
   - Sélectionnez **"Deploy from GitHub"**
   - Cherchez `prospectai-website`
   - Cliquez sur **"Deploy"**

3. **Attendre le déploiement**
   - Railway va automatiquement installer les dépendances
   - Compiler le frontend
   - Démarrer le serveur
   - Cela prend environ 2-3 minutes

### Étape 3 : Configurer et vérifier

**Durée estimée** : 5 minutes

1. **Configurer les variables d'environnement**
   - Dans Railway, allez dans l'onglet **"Variables"**
   - Ajoutez les variables suivantes :

```
ADMIN_EMAIL=sully.capron@synolia.com
NODE_ENV=production
```

   - Cliquez sur **"Save"**

2. **Accéder à votre site**
   - Allez dans l'onglet **"Deployments"**
   - Cliquez sur le domaine généré (ex: `prospectai-website-production.up.railway.app`)
   - Votre site est maintenant en ligne ! 🎉

3. **Tester le site**
   - Visitez votre URL
   - Testez le formulaire d'inscription
   - Vérifiez que tout fonctionne correctement

## 📧 Configuration des notifications email (Optionnel)

Pour recevoir les emails d'inscription, suivez ces étapes :

### Option 1 : Gmail (Recommandé)

1. **Créer un mot de passe d'application Gmail**
   - Allez sur https://myaccount.google.com/apppasswords
   - Connectez-vous avec votre compte Gmail
   - Sélectionnez "Mail" et "Windows Computer"
   - Générez un mot de passe
   - Copiez le mot de passe généré

2. **Ajouter les variables dans Railway**
   - Dans Railway, allez dans **"Variables"**
   - Ajoutez les variables suivantes :

```
EMAIL_SERVICE=gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-app
```

   - Cliquez sur **"Save"**
   - Railway va redéployer automatiquement

3. **Tester l'email**
   - Testez une inscription
   - Vérifiez que vous recevez l'email

### Option 2 : SendGrid (Alternative gratuite)

1. **Créer un compte SendGrid**
   - Allez sur https://sendgrid.com
   - Créez un compte gratuit
   - Générez une clé API

2. **Ajouter les variables dans Railway**

```
SENDGRID_API_KEY=votre-clé-api
```

## 🔗 Configuration des webhooks Make (Optionnel)

Pour intégrer avec HubSpot, Google Sheets, Salesforce, etc. :

1. **Créer un webhook Make**
   - Allez sur https://make.com
   - Créez un webhook entrant
   - Copiez l'URL du webhook

2. **Ajouter la variable dans Railway**

```
MAKE_WEBHOOK_URL=https://hook.make.com/...
```

## 📊 Monitoring et logs

### Voir les logs en temps réel

1. Dans Railway, allez dans l'onglet **"Logs"**
2. Vous verrez tous les logs du serveur
3. Cherchez les erreurs ou problèmes

### Redéployer après des modifications

```bash
# Modifiez votre code
# Committez les changements
git add .
git commit -m "Description de vos changements"

# Poussez sur GitHub
git push origin main

# Railway va automatiquement redéployer
```

## 🆘 Dépannage

| Problème | Solution |
|----------|----------|
| **Le build échoue** | Vérifiez les logs, assurez-vous que `npm run build` fonctionne localement |
| **Le site ne démarre pas** | Vérifiez que `PORT` est défini, consultez les logs |
| **Les emails ne sont pas reçus** | Vérifiez `EMAIL_USER` et `EMAIL_PASSWORD`, testez localement |
| **Le site est lent** | Railway peut être lent au premier accès, attendez quelques secondes |
| **Erreur 502** | Le serveur a crashé, vérifiez les logs |

## 📚 Documentation complète

Pour plus de détails, consultez :

- **QUICK_START.md** - Guide rapide (15 minutes)
- **RAILWAY_DEPLOYMENT.md** - Guide détaillé Railway
- **GITHUB_SETUP.md** - Configuration GitHub
- **DEPLOYMENT_SUMMARY.md** - Résumé complet
- **README.md** - Documentation du projet

## ✅ Checklist finale

- [ ] Compte GitHub créé
- [ ] Repository créé et code poussé
- [ ] Compte Railway créé
- [ ] Projet Railway créé et déployé
- [ ] Variables d'environnement configurées
- [ ] Site accessible via URL Railway
- [ ] Formulaire d'inscription testé
- [ ] Email configuré (optionnel)
- [ ] Webhooks Make configurés (optionnel)
- [ ] Logs consultés et pas d'erreurs

## 🎉 Résultat

Une fois le déploiement terminé, vous aurez :

✅ Un site web professionnel en production  
✅ Une URL publique accessible 24/7  
✅ Un système d'inscription fonctionnel  
✅ Des notifications email automatiques  
✅ Des statistiques en temps réel  
✅ Une API REST complète  
✅ Un code source sur GitHub  
✅ Des logs et monitoring  

## 📞 Support

- **Railway Documentation** : https://docs.railway.app
- **GitHub Help** : https://docs.github.com
- **Email** : support@railway.app

## ⏱️ Temps total estimé

- **Étape 1 (GitHub)** : 5 minutes
- **Étape 2 (Railway)** : 5 minutes
- **Étape 3 (Configuration)** : 5 minutes
- **Total** : 15 minutes

---

**Vous êtes prêt ! Commencez le déploiement maintenant ! 🚀**

Pour des questions, consultez les guides détaillés fournis dans le projet.

