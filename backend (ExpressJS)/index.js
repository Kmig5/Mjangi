require('dotenv').config();
const express   = require('express');
const connectDB = require('./config/database');
const apiRouter = require('./routes/api');

const app = express();
connectDB();
app.use(express.json());
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));