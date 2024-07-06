```mermaid
sequenceDiagram
    actor Utilisateur
    participant Dashboard as Tableau de bord
    participant Dialogue as Page Détails film
    participant Controleur as Backend/Prisma
    participant Entite as Base de données

    Utilisateur ->> Dashboard: Sélectionner un film
    Dashboard ->> Dialogue: Noter le film
    Dialogue ->> Controleur: Envoie des données
    Controleur ->> Entite: Enregistrement de la note
    Entite ->> Controleur: Confirmation
    Controleur ->> Dialogue: Mise à jour de la view
```