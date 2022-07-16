
var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize');

var Produto = sequelize.define('produtos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ref: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    min: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    max: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ativo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
},
{
    timestamps: false,
});

module.exports = Produto;
