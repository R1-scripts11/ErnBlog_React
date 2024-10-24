import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

// Configuration de la connexion à la base de données MySQL
const dbConfig = {
  host: 'localhost',
  user: 'root', // Remplacez par votre utilisateur MySQL
  password: '', // Remplacez par votre mot de passe MySQL
  database: 'ernblog', // Remplacez par le nom de votre base de données
  timezone: '+02:00' // Fuseau horaire de Paris
};

let connection;

// Fonction pour se connecter à la base de données MySQL
async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}

// Configuration de Sequelize
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql'
});

// Fonction pour tester la connexion Sequelize
async function connectSequelize() {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connected to the database');
  } catch (error) {
    console.error('Sequelize connection failed:', error.message);
    throw error;
  }
}

// Exporter les fonctions et les objets de connexion
export { connectToDatabase, connection, sequelize, connectSequelize };
