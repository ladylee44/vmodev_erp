const Sequelize = require('sequelize');
var database = 'vmodev';

const sequelize = new Sequelize(database, 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// authenticate to check connection is OK
sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been connnected successfully to ' + database);
    })
    .catch(err => {
    console.log('Unable to connect to the database:' + database, err);
});

module.exports = sequelize;