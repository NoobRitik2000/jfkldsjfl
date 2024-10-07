// backend/models/userModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Database connection

// User interface definition (optional)
export interface UserAttributes {
    user_id?: number;
    name: string;
    email: string;
    password: string; // hashed password
    role:  'Librarian' | 'Patron';
}

// Defining User model using Sequelize
export class User extends Model<UserAttributes> implements UserAttributes {
    public user_id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!:  'Librarian' | 'Patron';
}

// Initialize User model schema
User.init({
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    //    unique:true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM( 'Librarian', 'Patron'),
        allowNull: false,
        defaultValue:'Patron'
    }
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'users', // Define the table name
    timestamps:false // Disable automatic createdAt, updatedAt columns
});

// Synchronize model with the database (creates table if not exists)
export const createUserTable = async () => {
    await User.sync({ alter: true });
};
export default User;