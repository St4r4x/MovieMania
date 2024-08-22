```mermaid
sequenceDiagram
    actor Utilisateur
    participant Systeme as Système

    Utilisateur ->> Systeme: Accès à la barre de recherche
    Systeme ->> Systeme: Soumettre la recherche
    Systeme ->> Systeme: Requête la bdd
    alt Données trouvées
        Systeme ->> Systeme: Résultat de requête
        Systeme ->> Systeme: Afficher les résultats
    else Données non trouvées
        Systeme ->> Systeme: Retourne une erreur
        Systeme ->> Systeme: Renvoie un message d'erreur
    end
    Systeme ->> Utilisateur: Affiche liste de films
```

