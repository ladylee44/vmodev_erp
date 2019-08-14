const Sequelize = require('sequelize');
const db = require('./../configdb/configdb');
const Employees = require('../models/Employees.model');

const Contracts = db.define('contracts', 
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    employeeID:{
        type:Sequelize.INTEGER,
        references: {
            model: Employees,
            key: 'id'
        }
    },
    type:  {
        type: Sequelize.STRING
    },
    applyFrom:{
        type: Sequelize.STRING
    },
    salary: {
        type: Sequelize.INTEGER
    },
    createdBy: {
        type: Sequelize.STRING
    },
    editedBy: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    editedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    status: {
        type: Sequelize.INTEGER
    }
},
{
    timestamps: false
},
{
    indexes:[
        {
            unique: true,
            fields: ['employeeID']
        }
    ]
});

// Will add a contractID attribute to Employees to hold the primary key value for Empoyees
Contracts.belongsTo(Employees, {
    foreignKey: 'employeeID' 
}); 
module.exports = Contracts;