# API de recommandations de films

## Description

Cette API fournit des recommandations de films personnalisées aux utilisateurs en fonction de leurs préférences et de leur historique de visionnage. Elle permet également aux utilisateurs de rechercher des films, de consulter les détails des films, et d'obtenir les crédits des films.

## Fonctionnalités

- **Recommandations personnalisées :** Les utilisateurs reçoivent des recommandations de films basées sur leurs goûts et interactions précédentes.
- **Recherche de films :** Permet aux utilisateurs de trouver des films par titre, genre, et date de sortie.
- **Détails des films :** Les utilisateurs peuvent consulter les détails complets d'un film spécifique.
- **Crédits des films :** Les utilisateurs peuvent consulter les crédits associés à un film, comme les acteurs et réalisateurs.

## Technologies utilisées

- **Langage de programmation :** Python
- **Framework web :** FastAPI
- **Base de données :** MariaDB
- **Cache :** Redis pour le stockage des recommandations

## Routes de l'API

### Obtenir des recommandations

- **URL :** `/recommendations/`
- **Méthode :** `GET`
- **Description :** Retourne les recommandations de films pour l'utilisateur actuel.
- **Réponse :** Un dictionnaire avec des recommandations de films.

### Détails d'un film

- **URL :** `/movies/{movie_id}`
- **Méthode :** `GET`
- **Description :** Récupère les détails d'un film spécifique.
- **Paramètre :** `movie_id` (int) - L'identifiant du film.
- **Réponse :** Un objet JSON contenant les détails du film.

### Liste des genres

- **URL :** `/genres`
- **Méthode :** `GET`
- **Description :** Récupère une liste des genres de films disponibles.
- **Paramètres :**
  - `skip` (int) - Le nombre de genres à ignorer pour la pagination.
  - `limit` (int) - Le nombre maximum de genres à retourner.
- **Réponse :** Une liste d'objets `GenreSchema`.

### Crédits d'un film

- **URL :** `/movies/{movie_id}/credits`
- **Méthode :** `GET`
- **Description :** Récupère les crédits associés à un film spécifique.
- **Paramètre :** `movie_id` (int) - L'identifiant du film.
- **Réponse :** Une liste d'objets `CreditSchema`.

### Recherche de films

- **URL :** `/movies/search/`
- **Méthode :** `GET`
- **Description :** Recherche des films en fonction de critères comme le titre, la date de sortie, et le genre.
- **Paramètres :**
  - `title` (str, optionnel) - Le titre du film à rechercher.
  - `release_date` (str, optionnel) - La date de sortie du film (format YYYY-MM-DD).
  - `genre` (str, optionnel) - Le genre du film.
  - `skip` (int, optionnel) - Le nombre de films à ignorer pour la pagination.
  - `limit` (int, optionnel) - Le nombre maximum de films à retourner.
- **Réponse :** Une liste d'objets `MovieSchema` correspondant aux critères de recherche.

## Contribution

Les contributions sont les bienvenues. Veuillez ouvrir une issue pour discuter des changements proposés ou soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENCE` pour plus de détails.