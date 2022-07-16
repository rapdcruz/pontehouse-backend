var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize');
var Utilizador = require('./utilizador.model');
var Cargo = require('./utilizador.model');

var Historico = sequelize.define('historico', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: Utilizador,
            key: 'id'
        }
    },
    timestamp: {
        type: Sequelize.STRING,
        allowNull: false
    },
    log: {
        type: Sequelize.STRING,
        allowNull: false
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        timestamps: false,
    });

Historico.belongsTo(Utilizador);


module.exports = Historico;
