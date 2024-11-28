## API Gestion de stock pour les pharmacies 

## Description

Cette Api permet de gérer les fonctionnalité CRUD (Create, Read, Update, Delete) de gestion de stock pour le pharmacie : la gestion de produit, gestion de vente, gestion de reception, gestion de lots de produit, gestion de commande, gestion de utilisateur et gestion d'authentification.  et une authentification pour controler l'accés developpé avec node.js, prisma  et express.js pour le backend, ainsi que postgres pour la gestion des données.  

## Prérequis

Avant de démarrer, assurez_vous d'avoir installé les logiciels suivants :

- Node.js (version v20.12.1)
- Postgres (version 14.x ou supérieur)
- Postman (pour tester l'API)
- npm (le gestionnaire de paquets Node.js)

## Technologies Utilisées

- **Node.js** : Plateforme Javascript coté serveur.
- **Express** : Fremework web pour Node.js.
- **Postgres** : Systéme de gestion de base de données.
- **Postman** : Utilisé pour tester l'API.

## Installation 

1. Clonez le dépot sur machine local :

```
git clone https://github.com/Mangassouba/gestion-pharmacie-api.git

```

2. Accedez au répertoire du projet : 

```
cd gestion-pharmacie-api
```

3. Installez les dépendances du projet :

```
npm install
```

## Utilisation

Pour démarrer l'application, exécutez la commande suiuvante : 

```
npm start
```

## Configuration de la base de donnée
Assurez-vous que vous avez postgreSQL et créez une base de donnée (gestion_stock) et
dans le projet le fichier .env.example faut le renommé en .env et ajouter vos identifiant pour pouvoir se conncter à la base de donnée

```
DATABASE_URL="postgresql://USENAME:PASSWORD@localhost:5432/DATABASE_NAME"

JWT_SECRET= SECRET_AUTHENTIFICATION
JWT_REFRESH_SECRET= SECRETE

EMAIL_USER = YOUR_EMAIL
EMAIL_PASS = YOUR_PASSWORD
```

## Migrations Prisma : 

Déployez les migrations pour initialiser la base de données 
```
npx prisma migrate deploy 
```
## Génération des données avec le script Seed

Générez des données de test dans la base de données pour les entités.

```
npm run seed
```

## Endpoints de l'API

voici un exemple de collection de postman. vous pouvez importé  la collection sur le racine de projet pour tester les differents endpoints de l'API. 

## GET / user

- Description : Récupére toutes les utilisateur
- Réponse 
```
[
    {
        "id": 33,
        "name": "Admin",
        "email": "admin@example.com",
        "password": "2a$10$eu0ToA2YJJ5VIhGFzx621un5",
        "role": "ADMIN",
        "status": "ACTIVE"
    }
]
```
## POST /user
- Description : Crée une nouvelle utilisateur.
- Corps de la requête :
```
{
    "name": "med",
    "email": "med@gmail.com",
    "password": "123456",
    "role": "CAISSIER",
    "status": "ACTIVE"
}
```

## PUT /user/id

- Description : Met à jour une recette existante.
- Corps de la requête :
```
{
    "id": 35,
    "name": "Baradji",
    "email": "Baradji@gmail.com",
    "password": "2a$10$UFMmQUX7CWlp.Iub6ROCnu60dwe4mCjmP.",
    "role": "ADMIN",
    "status": "ACTIVE"
}

```
## Auteur

[Hama Houllah Sourakhata Mangassouba](https://github.com/Mangassouba)
