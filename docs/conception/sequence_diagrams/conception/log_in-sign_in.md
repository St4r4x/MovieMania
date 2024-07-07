```mermaid
sequenceDiagram
    actor Utilisateur
    participant Navigateur
    participant Controleur as Backend
    participant Entite as Base de données

    alt Connexion
        Utilisateur ->> Navigateur: Renseigner ses identifiants
        Navigateur ->> Controleur: Envoie des données
        Controleur ->> Entite: Enregistrement des données
        Entite ->> Controleur: Confirmation
        Controleur ->> Navigateur: Redirige vers sa dashboard
    else Inscription
        Utilisateur ->> Navigateur: Renseigner ses coordonnées
        Navigateur ->> Controleur: Envoie des données
        Controleur ->> Entite: Enregistrement des données
        Entite ->> Controleur: Confirmation
        Controleur ->> Navigateur: Redirige vers sa dashboard
    end
```