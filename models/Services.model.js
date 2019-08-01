const Sequelize = require('sequelize');
const db = require('../configdb/configdb');
const Branches = require('./Branches.model');

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
})

Services.belongsTo(Branches,{
    foreignKey: 'branchID'
});

module.exports = Services;