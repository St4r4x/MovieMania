```mermaid
usecaseDiagram
  direction TB

  actor Utilisateur
  actor DataCrawler
  actor APIRecommandation
  actor APIUtilisateur
  actor Redis

  usecase Inscription as "Inscription"
  usecase Connexion as "Connexion"
  usecase RechercherFilm as "Rechercher un Film"
  usecase ConsulterDetailsFilm as "Consulter Détails Film"
  usecase NoterFilm as "Noter un Film"
  usecase LikerFilm as "Liker un Film"
  usecase GererProfil as "Gérer le Profil"
  usecase Deconnexion as "Déconnexion"
  usecase AjouterFilm as "Ajouter un Film"
  usecase ModifierFilm as "Modifier un Film"
  usecase SupprimerFilm as "Supprimer un Film"
  usecase EnrichirDonnees as "Enrichir les Données"
  usecase GenererRecommandations as "Générer des Recommandations"
  usecase StockerRecommandations as "Stocker les Recommandations"

  Utilisateur --> Inscription
  Utilisateur --> Connexion
  Utilisateur --> RechercherFilm
  Utilisateur --> ConsulterDetailsFilm
  Utilisateur --> NoterFilm
  Utilisateur --> LikerFilm
  Utilisateur --> GererProfil
  Utilisateur --> Deconnexion

  DataCrawler --> AjouterFilm
  DataCrawler --> ModifierFilm
  DataCrawler --> SupprimerFilm
  DataCrawler --> EnrichirDonnees

  APIRecommandation --> GenererRecommandations
  APIUtilisateur --> Inscription
  APIUtilisateur --> Connexion
  APIUtilisateur --> GererProfil
  APIUtilisateur --> Deconnexion

  Redis --> StockerRecommandations

  GenererRecommandations --> StockerRecommandations

  Connexion ..> RechercherFilm : <<include>>
  Connexion ..> GererProfil : <<include>>
  Inscription ..> GererProfil : <<include>>
  RechercherFilm ..> ConsulterDetailsFilm : <<extend>>
  ConsulterDetailsFilm ..> NoterFilm : <<extend>>
  ConsulterDetailsFilm ..> LikerFilm : <<extend>>

```
