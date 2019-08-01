const Sequelize = require('sequelize');
const db = require('./../configdb/configdb');
const Services = require('./../models/Services.model');
const Customers = require('./../models/Customers.model');
const Employees = require('./../models/Employees.model');

const Services_Customers = db.define('services_customers', 
{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    serviceID: {
        type:Sequelize.INTEGER,
        references: {
            model: Services,
            key: 'id'
        }
    },
    customerID:{
        type:Sequelize.INTEGER,
        references: {
            model: Customers,
            key: 'id'
        }
    },
    employeeID:{
        type:Sequelize.INTEGER,
        references: {
            model: Employees,
            key: 'id'
        }
    },
    materialPrice:{
        type:Sequelize.INTEGER
    },
    customerPay:{
        type:Sequelize.INTEGER
    },
    performPrice:{
        type:Sequelize.INTEGER
    },
    startAt: {
        type:Sequelize.TIME
    },
    endAt:{
        type:Sequelize.TIME
    },
    overtime:{
        type:Sequelize.INTEGER
    }
},
{
    timestamp: false
});

