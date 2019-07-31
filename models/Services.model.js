const Sequelize = require('sequelize');
const db = require('./../configdb/configdb');
const Services = require('../models/Employees.model');

const Services = db.define('services',
{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    branchID:{
        type: Sequelize.INTEGER,
        references: {
            model: Branches,
            key: 'id'
        }
    }
})