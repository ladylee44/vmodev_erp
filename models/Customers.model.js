var Sequelize = require('sequelize');
var connect = require('../configdb/configdb');

var customers = connect.define('customers',{
    
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },
    dob: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },
    gender: {
        type: Sequelize.STRING,
        validate: {
            max: 6
        }
    },
    phone: {
        type: Sequelize.STRING,
        validate: {
            len: [10, 20]
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            max: 50,
            isEmail: true
        }
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            max: 255
        }
    },
    createdBy: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },
    editedBy: {
        type: Sequelize.STRING,
        validate: {
            max: 50
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
}, {timestamps: false}
);

module.exports = customers;