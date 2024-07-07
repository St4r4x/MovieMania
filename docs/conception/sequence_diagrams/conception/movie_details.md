```mermaid
sequenceDiagram
    actor Utilisateur
    participant Dashboard as Tableau de bord
    participant Dialogue as Page Détails Film
    participant Controleur as Backend
    participant Entite as Base de Données

    Utilisateur ->> Dashboard: Sélectionner un film
    activate Dashboard
    Dashboard ->> Dialogue: Récupérer l'id du film
    activate Dialogue
    Dialogue ->> Controleur: Requête détails film
    activate Controleur
    Controleur ->> Entite: Check data
    activate Entite
    alt Données trouvées
        Entite ->> Controleur: Données film
        Controleur ->> Dialogue: Sérialisation du résultat
    else Données non trouvées
        Entite ->> Controleur: Renvoie un message d'erreur
        Controleur ->> Dialogue: Renvoie un message d'erreur
    end
    Controleur ->> Dialogue: Sérialisation du résultat
    Dialogue ->> Utilisateur: Affiche détails du film
    deactivate Entite
    deactivate Controleur
    deactivate Dialogue
    deactivate Dashboard
```