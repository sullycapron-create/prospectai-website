# Guide de déploiement - ProspectAI

Ce guide couvre le déploiement de l'application ProspectAI sur différentes plateformes.

## 📋 Prérequis

- Node.js 16+ installé
- npm ou yarn
- Un compte sur la plateforme de déploiement choisie
- (Optionnel) Un domaine personnalisé

## 🌐 Déploiement sur Vercel

Vercel est la plateforme idéale pour déployer des applications React + Node.js.

### Étapes

1. **Installer Vercel CLI**
```bash
npm install -g vercel
```

2. **Préparer le projet**
```bash
cd prospectai-website
npm run build
```

3. **Déployer**
```bash
vercel
```

4. **Configurer les variables d'environnement**
   - Allez sur votre tableau de bord Vercel
   - Sélectionnez votre projet
   - Allez dans Settings → Environment Variables
   - Ajoutez vos variables (EMAIL_USER, MAKE_WEBHOOK_URL, etc.)

5. **Redéployer après configuration**
```bash
vercel --prod
```

### Configuration Vercel (vercel.json)

Créez un fichier `vercel.json` à la racine du projet :

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "functions": {
    "server.js": {
      "runtime": "nodejs18.x"
    }
  },
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/server.js"
    }
  ]
}
```

## 🚀 Déploiement sur Heroku

### Étapes

1. **Installer Heroku CLI**
```bash
npm install -g heroku
```

2. **Se connecter à Heroku**
```bash
heroku login
```

3. **Créer une application**
```bash
heroku create prospectai-website
```

4. **Ajouter les variables d'environnement**
```bash
heroku config:set EMAIL_USER=votre-email@gmail.com
heroku config:set EMAIL_PASSWORD=votre-mot-de-passe
heroku config:set MAKE_WEBHOOK_URL=https://hook.make.com/...
```

5. **Déployer**
```bash
git push heroku main
```

6. **Vérifier les logs**
```bash
heroku logs --tail
```

### Procfile pour Heroku

Créez un fichier `Procfile` à la racine :

```
web: npm run build && node server.js
```

## 🖥️ Déploiement sur un serveur personnel (VPS)

### Avec PM2 (gestion des processus)

1. **Installer PM2 globalement**
```bash
npm install -g pm2
```

2. **Créer un fichier ecosystem.config.js**
```javascript
module.exports = {
  apps: [
    {
      name: 'prospectai',
      script: './server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
        MAKE_WEBHOOK_URL: process.env.MAKE_WEBHOOK_URL,
      },
    },
  ],
}
```

3. **Démarrer l'application**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

4. **Configurer Nginx comme reverse proxy**

Créez `/etc/nginx/sites-available/prospectai` :

```nginx
server {
    listen 80;
    server_name prospectai.com www.prospectai.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. **Activer le site**
```bash
sudo ln -s /etc/nginx/sites-available/prospectai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Configurer SSL avec Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d prospectai.com -d www.prospectai.com
```

## 🐳 Déploiement avec Docker

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["node", "server.js"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  prospectai:
    build: .
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      EMAIL_USER: ${EMAIL_USER}
      EMAIL_PASSWORD: ${EMAIL_PASSWORD}
      MAKE_WEBHOOK_URL: ${MAKE_WEBHOOK_URL}
    volumes:
      - ./signups.json:/app/signups.json
    restart: unless-stopped
```

### Déployer avec Docker

```bash
docker-compose up -d
```

## 📊 Configuration du domaine personnalisé

### Avec Vercel
1. Allez dans Settings → Domains
2. Ajoutez votre domaine
3. Configurez les DNS records selon les instructions

### Avec Heroku
```bash
heroku domains:add prospectai.com
```

### Avec un serveur personnel
Configurez les DNS records de votre registraire :
- **A record** : Pointez vers l'IP de votre serveur
- **CNAME** : Pour les sous-domaines

## 🔒 Configuration de la sécurité

### Variables d'environnement
```bash
# Ne jamais committer les secrets
echo ".env" >> .gitignore
echo ".env.local" >> .gitignore
```

### HTTPS
- Vercel : Automatique
- Heroku : Automatique
- Serveur personnel : Let's Encrypt (voir ci-dessus)

### Headers de sécurité
Ajoutez à votre serveur Express :

```javascript
import helmet from 'helmet'

app.use(helmet())
```

## 📈 Monitoring et logs

### Vercel
- Tableau de bord Vercel → Logs

### Heroku
```bash
heroku logs --tail
```

### Serveur personnel avec PM2
```bash
pm2 logs prospectai
pm2 monit
```

## 🔄 CI/CD avec GitHub Actions

Créez `.github/workflows/deploy.yml` :

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## ✅ Checklist de déploiement

- [ ] Tester localement : `npm run build && node server.js`
- [ ] Vérifier les variables d'environnement
- [ ] Tester le formulaire d'inscription
- [ ] Vérifier les notifications (email, webhooks)
- [ ] Configurer le domaine personnalisé
- [ ] Configurer SSL/HTTPS
- [ ] Mettre en place le monitoring
- [ ] Configurer les backups
- [ ] Documenter les processus
- [ ] Tester la performance
- [ ] Vérifier la sécurité

## 🆘 Dépannage

### Le serveur ne démarre pas
```bash
# Vérifier les erreurs
node server.js

# Vérifier les dépendances
npm install
npm audit fix
```

### Les notifications ne fonctionnent pas
```bash
# Vérifier les variables d'environnement
echo $EMAIL_USER
echo $MAKE_WEBHOOK_URL

# Tester l'API
curl http://localhost:5000/api/health
```

### Performance lente
- Activer la compression : `npm install compression`
- Mettre en cache les réponses statiques
- Utiliser un CDN pour les assets

## 📞 Support

Pour toute question sur le déploiement, consultez :
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Heroku](https://devcenter.heroku.com/)
- [Documentation Node.js](https://nodejs.org/docs/)

