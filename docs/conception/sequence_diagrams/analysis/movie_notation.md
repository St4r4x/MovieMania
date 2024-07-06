```mermaid
sequenceDiagram
    actor Utilisateur
    participant Systeme as Système

    Utilisateur ->> Systeme: Sélectionner un film
    Systeme ->> Systeme: Noter le film
    Systeme ->> Systeme: Envoie des données
    Systeme ->> Systeme: Enregistrement de la note
    Systeme ->> Systeme: Confirmation
    Systeme ->> Systeme: Mise à jour de la view
```