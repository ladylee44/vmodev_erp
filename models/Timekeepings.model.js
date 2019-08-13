const Sequelize = require('sequelize');
const db = require('../configdb/configdb');
const Employees = require('./Employees.model');

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
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    workDay:{
        type: Sequelize.DOUBLE(10,1)
    },
    
    dueDay:{
        type: Sequelize.STRING
    },
    checkIn: {
        type: Sequelize.TIME,
        allowNull: false
    },
    checkOut: {
        type: Sequelize.TIME,
        allowNull: false
    },
    workTime: {
        type: Sequelize.DECIMAL(10, 1),
        allowNull: false
    },
    dayOff: {
        type: Sequelize.INTEGER
    },
    OT: {
        type: Sequelize.DECIMAL(10,1)
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