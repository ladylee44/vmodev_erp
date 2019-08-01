const Sequelize = require('sequelize');
const db = require('./../configdb/configdb');
const Services = require('../models/Services.model');

const ServiceDetails = db.define('service_details',
{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    serviceID:{
        type:Sequelize.INTEGER,
        references: {
            model: Services,
            key: 'id'
        }
    },
    materialPrice:{
        type: Sequelize.INTEGER
    }, 
    customerPay: {
        type: Sequelize.INTEGER
    },
    performPrice: {
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
                fields: ['serviceID']
            }
        ]
});

ServiceDetails.belongsTo(Services, {
    foreignKey: 'serviceID'
});

module.exports = ServiceDetails;
