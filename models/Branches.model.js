const Sequelize = require('sequelize');
const db = require('../configdb/configdb');

const Branches = db.define('branches', 
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    address:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    hotline:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    bossName:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    bossEmail:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    bossPhone:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    staffName:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    staffEmail:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    staffPhone:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    receptionName:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    receptionEmail:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    receptionPhone:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdBy:{
        type: Sequelize.STRING
    },
    editedBy:{
        type: Sequelize.STRING
    },
    createdAt:{
        type: Sequelize.DATE
    },
    editedAt:{
        type: Sequelize.DATE
    },
    status:{
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false
    }
);

module.exports = Branches;