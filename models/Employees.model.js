const Sequelize = require('sequelize');
const db = require('./../configdb/configdb');
const Branches = require('../models/Branches.model');

const Employees = db.define('employees', 
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    branchID: {
        type: Sequelize.INTEGER,
        references: {
            model: Branches,
            key: 'id'
        }
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    dob: {      
        type: Sequelize.STRING
    },
    address:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    },
    role: {
        type: Sequelize.STRING
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
});

module.exports = Employees;