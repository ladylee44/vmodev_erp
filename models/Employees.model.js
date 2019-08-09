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
        type: Sequelize.STRING,
        allowNull: false,
    },
    gender:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    address:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    idCard: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {     
            len: [5, 12]
        }
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            max: 50
        }
    },
    role: {
        type: Sequelize.STRING
    },
    imageUrl:{
        type: Sequelize.STRING,
        validate: {
            isUrl: true
        }
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

Employees.belongsTo(Branches,{
    foreignKey: 'branchID'
});

module.exports = Employees;