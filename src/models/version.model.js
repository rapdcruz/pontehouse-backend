var Sequelize = require('sequelize');
var sequelize = require('../config/sequelize');


var Version = sequelize.define('version', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    version: {
        type: Sequelize.STRING,
        allowNull: false
    },
    timestamp: {
        type: Sequelize.STRING,
        allowNull: false
    
    }
},
{
    timestamps: false,
});


module.exports = Version;
