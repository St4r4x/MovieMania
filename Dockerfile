# Utiliser une image de base officielle Python
FROM python:3.9

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers requirements.txt et installer les dépendances
COPY movie_recommendations_api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier tout le contenu du répertoire 'movie_recommendations_api' dans le répertoire de travail
COPY movie_recommendations_api /app/movie_recommendations_api

# Exposer le port sur lequel l'application sera disponible
EXPOSE 8000

# Démarrer l'application
CMD ["python", "-m", "uvicorn", "movie_recommendations_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
