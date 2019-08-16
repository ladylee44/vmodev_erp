var Sequelize = require('sequelize');
var db = require('../configdb/configdb');
var customer = require('./Customers.model')

var card = db.define('cards',{
    
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true,
    },

    customerID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference:{
            model: customer,
            key: 'id'
        }
    },

    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            max: 50
        }
    },

    totalPay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            len: [0, 50]
        }
    },

    createdBy: {
        type: Sequelize.STRING,
        validate: {
            len: [0, 50]
        }
    },

    editedBy: {
        type: Sequelize.INTEGER,
        validate: {
            len: [0, 50]
        }
    },

    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },

    editedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    
    status:{
        type: Sequelize.INTEGER,
        validate:{
            max: 1
        }
    }
}, 
    {timestamps: false},    
    // {sequelize, modelName: 'customer'}
);

card.belongsTo(customer, {foreignKey: 'customerID'});

module.exports = card;