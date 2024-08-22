```mermaid
sequenceDiagram
    actor Utilisateur
    participant Systeme as Système

    alt Connexion
        Utilisateur ->> Systeme: Renseigner ses identifiants
        activate Systeme
        Systeme ->> Systeme: Vérifier identifiants
        alt Identifiants corrects
            Systeme ->> Systeme: Redirige vers tableau de bord
        else Identifiants incorrects
            Systeme ->> Utilisateur: Afficher message d'erreur
        end
        deactivate Systeme
    else Inscription
        Utilisateur ->> Systeme: Renseigner ses coordonnées
        activate Systeme
        Systeme ->> Systeme: Enregistrer les données
        Systeme ->> Utilisateur: Demander genres cinématographiques
        Utilisateur ->> Systeme: Choisir genres
        Systeme ->> Systeme: Enregistrer genres
        Systeme ->> Systeme: Redirige vers tableau de bord
        deactivate Systeme
    end
```