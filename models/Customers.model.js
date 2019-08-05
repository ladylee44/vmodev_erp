var Sequelize = require('sequelize');
var db = require('../configdb/configdb');
const Services = require('./../models/Services.model');

var Customers = db.define('customers',
{    
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },
    dob: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },
    gender: {
        type: Sequelize.STRING,
        validate: {
            max: 6
        }
    },
    phone: {
        type: Sequelize.STRING,
        validate: {
            len: [10, 20]
        }
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            max: 50,
            isEmail: true
        }
    },
    address: {
        type: Sequelize.STRING,
        validate: {
            max: 255
        }
    },
    createdBy: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },
    editedBy: {
        type: Sequelize.STRING,
        validate: {
            max: 50
        }
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    editedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    status:{
        type: Sequelize.INTEGER,
        validate:{
            max: 1
        }
    }
}, 
{
    timestamps: false
}
);

// Customers.associate = (models) => {
//     Customers.belongsToMany(models.Services, 
//         {
//             through: models.Services_Customers, 
//             foreignKey: 'customerID'
//         });
// }

// Customers.belongsToMany(Services, {
//     through: 'Services_Customers',
//     foreignKey: 'customerID'
// });

Customers.associate = (models) => {
    Services.belongsToMany(models.Customers, 
        {
            through: models.Services_Customers, 
            foreignKey: 'customerID'
        });
}
module.exports = Customers;