import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jwt_auth'
});

const [rows] = await connection.execute('SELECT 1');
console.log(rows);