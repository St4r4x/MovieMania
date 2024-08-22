# Étape de base : Installation des dépendances
FROM node:18-alpine AS base

WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY ./frontend/moviemania/package.json .
COPY ./frontend/moviemania/package-lock.json .

# Installer les dépendances
RUN npm ci

# Étape de construction de l'application
FROM base AS builder

WORKDIR /app

# Copier le reste du projet
COPY ./frontend/moviemania .

# Copier le fichier .env
COPY ./frontend/moviemania/.env .env

# Construire l'application Next.js
RUN npm run build

# Créer manuellement le dossier cache et ajuster les permissions
RUN mkdir -p /app/.next/cache/images && chown -R 1001:1001 /app/.next/cache && chmod -R 777 /app/.next/cache

# Étape finale : Préparer l'image de production
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Créer un utilisateur non-root pour des raisons de sécurité
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copier les fichiers nécessaires à l'exécution
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Réappliquer les permissions au dossier cache
RUN mkdir -p /app/.next/cache/images && chown -R nextjs:nodejs /app/.next && chmod -R 777 /app/.next/cache

RUN apk add --no-cache curl

USER nextjs

EXPOSE 3000

# Lancer l'application Next.js
CMD ["npm", "start"]