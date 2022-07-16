var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize');
var Cargo = require('./cargo.model');

var Utilizador = sequelize.define('utilizadores', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    primeiroNome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    ultimoNome: {
        type: Sequelize.STRING,
        allowNull: true
    },
    atualizarPassword: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    
    cargoId: {
        type: Sequelize.INTEGER,
        // referência a outro modelo references: 
        references: {
            model: Cargo,
            key: 'id'
        }
    },

    token: {
        type: Sequelize.VIRTUAL(Sequelize.STRING),
    }
    //TODO: Fazer logout
},
{
    timestamps: false,
});

Utilizador.belongsTo(Cargo);

module.exports = Utilizador;


