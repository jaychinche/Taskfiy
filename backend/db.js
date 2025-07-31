const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'todo-2.cbw046ieqygc.ap-south-1.rds.amazonaws.com',
  user:'admin',
  password: '123B2B308',
  database: 'taskify',
  multipleStatements: true
});

connection.connect((err) => {
  if (err) {
    console.error('❌ DB Connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');
});

module.exports = connection;
