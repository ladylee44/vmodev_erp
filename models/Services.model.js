const Sequelize = require('sequelize');
const db = require('../configdb/configdb');
const Branches = require('./../models/Branches.model');
const Customers = require('./../models/Customers.model');

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
    },
    name: {
        type: Sequelize.STRING
    },
    description: {
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

Services.belongsTo(Branches,{
    foreignKey: 'branchID'
});

Services.associate = (models) => {
    Services.belongsToMany(models.Customers, 
        {
            through: models.Services_Customers, 
            foreignKey: 'serviceID'
        });
}

module.exports = Services;