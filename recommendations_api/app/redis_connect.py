import redis

def connect_to_redis():
    try:
        # Connexion à la base de données Redis
        client = redis.Redis(host='los-santos.fr', port=7195, password=None)
        
        # Vérification de la connexion
        if client.ping():
            print("Connexion réussie à la base de données Redis")
        else:
            print("Échec de la connexion à la base de données Redis")
    
    except Exception as e:
        print(f"Erreur lors de la connexion à Redis : {e}")

if __name__ == "__main__":
    connect_to_redis()