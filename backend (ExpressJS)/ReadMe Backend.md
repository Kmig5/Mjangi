Pour créer le Backend Express JS voici les étapes

- initialiser le projet: npm init -y
- créer une app express JS dans le projet: npm install express
- créer un fichier index.js et mettre le code suivant :
"""
const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
"""

- installer mongoose: npm install mongoose dotenv

- créer un fichier .dev qui contient l'URL de la BD MongoDB Atlas

- Créer un fichier /config/database.js pour gérer la connection à MongoDB

- créer les models /models/members.js et /models/tontineGroups.js qui contient le modèle des collections de notre BD

