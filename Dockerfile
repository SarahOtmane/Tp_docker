# Utilise une image Node.js avec Alpine
FROM node:lts-alpine3.14

# Définit le répertoire de travail à l'intérieur du conteneur
WORKDIR /home/node/app/src/

# Copie le fichier package.json dans le conteneur
COPY ./src/package.json .

# Installe les dépendances du projet
RUN npm install

# Copie tous les fichiers dans le répertoire de travail
COPY . .

# Définit l'utilisateur Node pour l'exécution
USER node

# Expose le port 3000
EXPOSE 3000

# Commande par défaut pour démarrer l'application
CMD ["npm", "run", "dev"]
