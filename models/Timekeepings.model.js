const Sequelize = require('sequelize');
const db = require('../configdb/configdb');
const Employees = require('../models/Employees.model');

const Timekeepings = db.define('timekeepings', 
{
    id:{
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
    numberWorkDay:{
        type:Sequelize.INTEGER
    },
    
    dueDay:{
        type: Sequelize.STRING
    },
    checkIn: {
        type: Sequelize.DATE
    },
    checkOut: {
        type: Sequelize.DATE
    },
    workTime: {
        type: Sequelize.INTEGER
    },
    dayOff: {
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
    }
    // status: {
    //     type: Sequelize.INTEGER
    // }
},
{
    timestamps: false
});

Timekeepings.belongsTo(Employees,  {
    foreignKey: 'employeeID' 
});

module.exports = Timekeepings;