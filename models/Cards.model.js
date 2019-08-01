var Sequelize = require('sequelize');
var connect = require('../configdb/configdb');
var customer = require('./Customers.model')

var card = connect.define('cards',{
    
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },

    customerID: {
        type: Sequelize.INTEGER,
        reference:{
            model: customer,
            key: 'id'
        },
        unique: {
            args: true,
            message: 'Username must be unique.',
            // fields: [connect.fn('lower', connect.col('username'))]
        },
    },

    type: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },

    totalPay: {
        type: Sequelize.INTEGER,
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

card.belongsTo(customer, {foreignKey: 'id'});

module.exports = card;