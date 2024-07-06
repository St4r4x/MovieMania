```mermaid
sequenceDiagram
    actor Utilisateur
    participant Systeme as Système

    alt Connexion
        Utilisateur ->> Systeme: Renseigner ses identifiants
        Systeme ->> Systeme: Envoie des données
        Systeme ->> Systeme: Enregistrement des données
        Systeme ->> Systeme: Confirmation
        Systeme ->> Systeme: Redirige vers sa dashboard
    else Inscription
        Utilisateur ->> Systeme: Renseigner ses coordonnées
        Systeme ->> Systeme: Envoie des données
        Systeme ->> Systeme: Enregistrement des données
        Systeme ->> Systeme: Confirmation
        Systeme ->> Systeme: Redirige vers sa dashboard
    end

```