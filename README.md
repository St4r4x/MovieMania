# Docker Branch

## Introduction

Cette branche `Docker` contient uniquement le fichier `docker-compose.yml` nécessaire pour orchestrer et déployer les services suivants en utilisant Docker Compose :
- MariaDB
- phpMyAdmin
- FastAPI

Toutes les informations sensibles (comme les mots de passe et les ports) ont été anonymisées pour des raisons de sécurité.

## Objectif

L'objectif principal de cette branche est de fournir une configuration Docker Compose simple et sécurisée pour déployer l'application FastAPI et ses services associés, en coordination avec les images Docker compilées dans d'autres branches du projet.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Docker
- Docker Compose

## Configuration

Remplacez `root_password`, `testdb`, `username`, `user_password`, `port_extern`, `port_intern`, et `port` par les valeurs appropriées avant de lancer les services.

## Instructions de Déploiement

1. Clonez le dépôt et changez de branche :
   ```sh
   git clone https://github.com/St4r4x/MovieMania.git
   cd MovieMania
   git checkout Docker

2. Déployez les services en utilisant Docker Compose :

   `docker-compose up -d`
