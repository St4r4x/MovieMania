# Docker_FastAPI_Reco Branch

## Introduction

Cette branche `Docker_FastAPI_Reco` est dédiée à la compilation de l'image Docker pour l'application FastAPI. L'image Docker générée à partir de cette branche est conçue pour fonctionner en conjonction avec le Docker Compose défini dans la branche `Docker`.

## Objectif

L'objectif principal de cette branche est de fournir une configuration et un environnement pour compiler et déployer l'application FastAPI en utilisant Docker. Cela permet une intégration facile et une gestion simplifiée des dépendances et des configurations de l'environnement de production.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :
- Docker
- Docker Compose

## Instructions de Compilation de l'Image Docker

Pour compiler l'image Docker de l'application FastAPI, suivez les étapes ci-dessous :

1. Clonez le dépôt et changez de branche :
   ```sh
   git clone https://github.com/St4r4x/MovieMania.git
   cd MovieMania
   git checkout Docker_FastAPI_Reco
   docker build -t myfastapiapp:latest .
   ```
