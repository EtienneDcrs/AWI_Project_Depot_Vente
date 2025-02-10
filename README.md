# Gestion de dépôt-vente de jeux de société

## Description du projet
Ce projet vise à développer une application web permettant de gérer un système de dépôt-vente de jeux de société, principalement utilisé lors d'événements tels que des festivals de jeux. 
L'application permettra au gérant de mettre en vente des jeux déposés par des vendeurs, d'enregistrer l'achat d'un jeu et d'avoir un historique des ventes par vendeur.
Le gérant peut gérer sa trésorerie grâce à cette application.

## Fonctionnalités principales
### 1. Dépôt d'un jeu
- Les vendeurs peuvent déposer des jeux.
- Chaque jeu reçoit un identifiant unique sous forme d'étiquette.

### 2. Vente d'un jeu
- Gestion des transactions avec mise à jour automatique des stocks.
- Calcul des commissions et mise à jour du bilan financier du vendeur.
- Historique des ventes disponible.

### 3. Gestion des stocks
- Consultation des jeux encore disponibles et des jeux déjà vendus.
- Suivi des stocks par vendeur.

### 4. Transactions et bilans financiers
- Bilan général des transactions, commissions et frais encaissés.
- Bilan individuel pour chaque vendeur avec ses gains, ses jeux vendus.

### 5. Gestion des utilisateurs
- Enregistrement des vendeurs avec informations de contact.
- Possibilité pour les acheteurs de demander une facture et d'être enregistrés.

## Technologies utilisées
- **Front-end** : Angular
- **Back-end** : Node.js / Express
- **Base de données** : MongoDB

## Installation et exécution en local
1. **Cloner le projet** :
   ```sh
   git clone https://github.com/EtienneDcrs/AWI_Project_Depot_Vente.git
   cd AWI_Project_Depot_Vente
   ```

2. **Installation des dépendances** :
   ```sh
   npm install 
   ```

3. **Configuration des variables d'environnement** :
   - Copier le fichier `.env.example` en `.env` et renseigner les variables nécessaires.

4. **Démarrage de l'application** :
   ```sh
   cd backend
   npm start  # Pour le back-end
   cd frontend
   ng serve  # Pour le front-end
   ```

## Déploiement
Le projet est déployé sur un serveur. Il est accessible à l'url : https://depot-vente.losherrmannos.duckdns.org

## Auteurs
- **Auteurs** : Ducros Etienne & Herrmann Lennon
- **Organisation** : Polytech Montpellier
