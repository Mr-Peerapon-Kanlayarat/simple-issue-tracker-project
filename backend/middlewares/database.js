const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'data_db_8uei',
  process.env.DB_USER || 'data_db_8uei_user',
  process.env.DB_PASSWORD || 'dAaIS0sD00QseRIsIpglcxudH7YnxNfB',
  {
    host: process.env.DB_HOST || 'dpg-d27qj08gjchc738jggc0-a.singapore-postgres.render.com',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;