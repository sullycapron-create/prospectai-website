#!/bin/bash

# ProspectAI - Fly.io Deployment Script
# This script deploys ProspectAI to Fly.io

set -e

echo "🚀 ProspectAI - Fly.io Deployment Script"
echo "=========================================="
echo ""

# Step 1: Install Fly CLI if not already installed
echo "📦 Step 1: Installing Fly CLI..."
if ! command -v flyctl &> /dev/null; then
    echo "Installing Fly CLI..."
    curl -L https://fly.io/install.sh | sh
    export FLYCTL_INSTALL="/home/ubuntu/.fly"
    export PATH="$FLYCTL_INSTALL/bin:$PATH"
    echo "✅ Fly CLI installed"
else
    echo "✅ Fly CLI already installed"
fi

# Ensure PATH is set
export FLYCTL_INSTALL="/home/ubuntu/.fly"
export PATH="$FLYCTL_INSTALL/bin:$PATH"

# Step 2: Authenticate with Fly.io
echo ""
echo "🔐 Step 2: Authenticating with Fly.io..."
echo "Please login with your Fly.io credentials (sully.capron@synolia.com)"
flyctl auth login

# Step 3: Navigate to project directory
echo ""
echo "📁 Step 3: Navigating to project directory..."
cd /home/ubuntu/prospectai-website
echo "✅ In directory: $(pwd)"

# Step 4: Create Fly.io app
echo ""
echo "🎯 Step 4: Creating Fly.io application..."
echo "App name: prospectai-website"
flyctl launch --name prospectai-website --region cdg --no-deploy

# Step 5: Set environment variables
echo ""
echo "🔧 Step 5: Setting environment variables..."
flyctl secrets set ADMIN_EMAIL=sully.capron@synolia.com
flyctl secrets set NODE_ENV=production

# Step 6: Deploy the application
echo ""
echo "🚀 Step 6: Deploying application..."
flyctl deploy

# Step 7: Get the URL
echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎉 Your ProspectAI site is now live!"
echo ""
flyctl info

# Display the URL
echo ""
echo "📍 Your site URL:"
flyctl open --url

echo ""
echo "✨ Deployment successful! Your site is now in production."
echo ""
echo "Next steps:"
echo "1. Visit your site URL above"
echo "2. Test the signup form"
echo "3. Check the logs: flyctl logs"
echo ""

