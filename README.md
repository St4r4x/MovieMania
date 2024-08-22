# Projet de site web de recommandations de films personnalisés

## Membres du projet:

Jean Marie\
Heloisa\
Benjamin\
Arnaud

## Objectif du projet:

Créer un site web qui permet aux utilisateurs de recevoir des recommandations de films personnalisées en fonction de leurs goûts et préférences.

## Fonctionnalités principales:

Système de recommandation: Le site web devrait utiliser un algorithme de recommandation pour suggérer des films aux utilisateurs en fonction de leur profil et de leurs interactions avec le site.
Profils utilisateur: Les utilisateurs devraient pouvoir créer un profil pour enregistrer leurs films préférés, leurs genres préférés, leurs réalisateurs préférés et d'autres informations pertinentes.
Recherche et navigation: Le site web devrait proposer une fonction de recherche pour que les utilisateurs puissent trouver des films par titre, genre, acteur, réalisateur, etc. Il devrait également proposer une navigation par catégories et par recommandations personnalisées.
Notes et avis: Les utilisateurs devraient pouvoir noter et commenter les films qu'ils ont vus.
Partage de recommandations: Les utilisateurs devraient pouvoir partager leurs recommandations avec d'autres utilisateurs.


## Usage

Be sur you have a .env file in root directory with rights credentials (refer to .env.developpment).

Build the stack with (dev):
    - `docker compose up -d`

For production build : 
    - `docker compose -f docker-compose.yml up -d`
    
Import the database with backup