import { Sequelize } from 'sequelize';

const host = 'localhost';
const database = 'hicare';
const username = 'root';
const password = '';

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
});

export default db;
