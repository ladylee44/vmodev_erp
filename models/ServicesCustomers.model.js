const Sequelize = require('sequelize');
const db = require('../configdb/configdb');
const Services = require('./Services.model');
const Customers = require('./Customers.model');
const Employees = require('./Employees.model');

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
    payToEmployee:{
        type:Sequelize.INTEGER
    },
    customerPay:{
        type:Sequelize.INTEGER
    },
    startAt: {
        type:Sequelize.TIME
    },
    endAt:{
        type:Sequelize.TIME
    }
},
{
    timestamps: false
});

Services_Customers.belongsTo(Services, {
    foreignKey: 'serviceID'
});

Services_Customers.belongsTo(Customers, {
    foreignKey: 'customerID'
});

Services_Customers.belongsTo(Employees,{
    foreignKey: 'employeeID'
});

// Services_Customers.associate = (models)=>{
//     Services_Customers.belongsTo(models.Services, {
//         foreignKey: 'serviceID'
//     })
//     Services_Customers.belongsTo(models.Customers,{
//         foreignKey: 'customerID'
//     })
// }

module.exports = Services_Customers;