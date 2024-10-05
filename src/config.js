require('dotenv').config();
module.exports = {
    database: process.env.DB_NAME || 'mydatabase',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
  };
  