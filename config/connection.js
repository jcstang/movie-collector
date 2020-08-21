// import the Sequelize constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

//create connection to our database, pass in your MySQL information for username and password
const sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) :
new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else if(process.env.DB_NAME) {
//   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
//   host: 'localhost',
//   dialect: 'mysql',
//   port: 3306
// })
// } else {
//   //something
// }

module.exports = sequelize;