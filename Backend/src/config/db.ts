import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

// Create a Sequelize instance for the database connection
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: Number(process.env.DB_PORT), // Ensure port is a number
  logging: false,
});


export default sequelize;
