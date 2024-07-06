```mermaid
sequenceDiagram
    actor Utilisateur
    participant Systeme as Système

    Utilisateur ->> Systeme: Accès au profil
    Systeme ->> Systeme: Récupération de l'id user
    Systeme ->> Systeme: Requête le profil utilisateur
    alt Données trouvées
        Systeme ->> Systeme: Données profil utilisateur
        Systeme ->> Systeme: Sérialisation du résultat
    else Données non trouvées
        Systeme ->> Systeme: Renvoie un message d'erreur
        Systeme ->> Systeme: Renvoie un message d'erreur
    end
    Systeme ->> Utilisateur: Affiche données utilisateur
```