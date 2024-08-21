# Étape de base
FROM node:18-alpine AS base

# 1. Installation des dépendances uniquement si nécessaire
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copier les fichiers package.json et package-lock.json depuis le dossier frontend/moviemania
COPY ../../frontend/moviemania/package.json ./
COPY ../../frontend/moviemania/package-lock.json ./

# Installer les dépendances avec npm
RUN npm ci

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# Copier tous les fichiers nécessaires pour la build depuis le dossier frontend/moviemania
COPY ../../frontend/moviemania .

# Copier le fichier .env depuis le dossier frontend/moviemania
COPY ../../frontend/moviemania/.env .env

# Installer sharp pour l'optimisation des images
RUN npm install sharp

# Build de l'application
RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Créer un utilisateur non root pour des raisons de sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copier les fichiers nécessaires pour exécuter l'application en production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Lancer l'application Next.js
CMD ["npm", "start"]
