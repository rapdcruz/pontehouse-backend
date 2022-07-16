const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Sqlite3 in memory connection
const squiteInMemory = new Sequelize('sqlite::memory:')

// Initialize Postgres connection
const postgres = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres'
});

if (process.env.DATABASE == "POSTGRESQL") {
    sequelize = postgres;
} else if (process.env.DATABASE == "SQLITE_MEMORY") {
    sequelize = squiteInMemory;
} else {
    console.error("A base de dados especificada não é suportada, vamos usar a default: SQLITE_MEMORY.")
    sequelize = squiteInMemory;
}

sequelize.authenticate()
    .then(() => console.log('Base de Dados conectada com sucesso!!'))
    .catch(err => console.log('Erro de conexão à base de dados! ' + err));

module.exports = sequelize;
