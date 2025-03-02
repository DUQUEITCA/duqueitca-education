const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres' // Asegúrate de que el dialecto sea 'postgres'
});

//console.log("PRUEBA...");
//console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST);

app.use('/api/users', userRoutes);

sequelize.authenticate().then(() => {
  console.log('Database connected...');
}).catch(err => {
  console.log('Error: ' + err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

