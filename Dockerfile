# Utilise une image de base Node.js pour construire le backend
FROM node:latest

# Crée un répertoire de travail
WORKDIR /usr/src/app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste des fichiers
COPY . .

# Expose le port d'écoute du backend
EXPOSE 4000

# Commande de démarrage
CMD ["npm", "run", "watch"]