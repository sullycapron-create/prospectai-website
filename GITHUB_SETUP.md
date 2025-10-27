# 📤 Configuration GitHub pour Railway

## Étape 1 : Créer un repository GitHub

1. Allez sur [github.com](https://github.com)
2. Connectez-vous ou créez un compte
3. Cliquez sur **"New"** (bouton vert en haut à gauche)
4. Nommez le repository : `prospectai-website`
5. Sélectionnez **"Public"** ou **"Private"**
6. Cliquez sur **"Create repository"**

## Étape 2 : Pousser le code sur GitHub

Exécutez ces commandes dans votre terminal :

```bash
cd /home/ubuntu/prospectai-website

# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE_USERNAME/prospectai-website.git

# Renommer la branche en 'main'
git branch -M main

# Pousser le code
git push -u origin main
```

**Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.**

## Étape 3 : Vérifier sur GitHub

1. Allez sur votre repository GitHub
2. Vous devriez voir tous les fichiers du projet
3. Vous êtes prêt pour Railway !

## 🔑 Authentification GitHub

Si vous n'avez pas configuré l'authentification SSH :

### Option 1 : Utiliser un Personal Access Token

1. Allez sur https://github.com/settings/tokens
2. Cliquez sur **"Generate new token"**
3. Sélectionnez les scopes : `repo`, `workflow`
4. Copiez le token
5. Utilisez-le comme mot de passe lors du push

### Option 2 : Configurer SSH

```bash
ssh-keygen -t ed25519 -C "votre-email@example.com"
cat ~/.ssh/id_ed25519.pub
```

Puis ajoutez la clé publique sur GitHub : https://github.com/settings/keys

---

Une fois le code sur GitHub, Railway peut le déployer automatiquement !
