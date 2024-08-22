```mermaid
sequenceDiagram
    actor Utilisateur
    participant Systeme as Système

    Utilisateur ->> Systeme: Sélectionner un film
    activate Systeme
    Systeme ->> Systeme: Récupérer l'id du film
    Systeme ->> Systeme: Requête détails film
    alt Données trouvées
        Systeme ->> Systeme: Données films
        Systeme ->> Systeme: Sérialisation du résultat
    else Données non trouvées
        Systeme ->> Systeme: Renvoie un message d'erreur
    end
    Systeme ->> Utilisateur: Affiche détails du film
    deactivate Systeme
```