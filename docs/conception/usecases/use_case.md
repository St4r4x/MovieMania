```mermaid
classDiagram
  direction TB

  class Utilisateur {
    <<acteur>>
  }

  class DataWrangler {
    <<acteur>>
  }

  class APIRecommandation {
    <<acteur>>
  }

  Utilisateur -- Inscription
  Utilisateur -- Connexion
  Utilisateur -- RechercherFilm
  Utilisateur -- ConsulterDetailsFilm
  Utilisateur -- NoterFilm
  Utilisateur -- LikerFilm
  Utilisateur -- GererProfil
  Utilisateur -- Deconnexion

  DataWrangler -- AjouterFilm
  DataWrangler -- ModifierFilm
  DataWrangler -- SupprimerFilm
  DataWrangler -- EnrichirDonnees

  APIRecommandation -- GenererRecommandations

  class Inscription {
    <<include>> GererProfil
  }

  class Connexion {
    <<include>> RechercherFilm
    <<include>> GererProfil
  }

  class RechercherFilm {
    <<extend>> ConsulterDetailsFilm
  }

  class ConsulterDetailsFilm {
    <<extend>> NoterFilm
    <<extend>> LikerFilm
      }

```