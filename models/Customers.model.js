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
        allowNull: false,
        validate: {
            len: [1, 20]
        }
    },
    dob: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [3, 20]
        }
       
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [4, 20]
        }
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [10, 20]
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 20]
        }
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 20]
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
        isNull: false,
        validate: {
           len: [1, 10],
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