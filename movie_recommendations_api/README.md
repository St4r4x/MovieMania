# API de recommandations de films

## Description

Cette API fournit des recommandations de films personnalisées aux utilisateurs en fonction de leurs préférences et de leur historique de visionnage. Elle permet également aux utilisateurs de rechercher des films, de noter ceux qu'ils ont vus et de gérer leur profil de préférences.

## Fonctionnalités

- **Recommandations personnalisées :** Les utilisateurs reçoivent des recommandations de films basées sur leurs goûts.
- **Recherche de films :** Permet aux utilisateurs de trouver des films par titre, genre, acteur, ou réalisateur.
- **Gestion de profil :** Les utilisateurs peuvent gérer leurs préférences, comme les genres favoris et les films préférés.
- **Notes et avis :** Les utilisateurs peuvent noter les films qu'ils ont vus et laisser des commentaires.

## Technologies utilisées

- **Langage de programmation :** Python
- **Framework web :** FastAPI
- **Base de données :** MariaDB

## Utilisation

### Obtenir des recommandations

- **URL :** `/api/recommendations/`
- **Méthode :** `GET`
- **Paramètres :** `user_id=[integer]`
- **Réponse :** Liste de films recommandés pour l'utilisateur.

## Contribution

Les contributions sont les bienvenues. Veuillez ouvrir une issue pour discuter des changements proposés ou soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENCE` pour plus de détails.
