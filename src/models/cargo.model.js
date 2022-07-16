var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize');


var Cargo = sequelize.define('cargos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    
    }
},
{
    timestamps: false,
});


module.exports = Cargo;
