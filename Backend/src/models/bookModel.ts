// backend/models/bookModel.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Database connection

// Book interface definition (optional)
export interface BookAttributes {
    book_id?: number;
    title: string;
    author: string;
    isbn: string; // unique ISBN
    genre?: string;
    cover_image_url?: string;
    available_copies: number;
    total_copies: number;
    created_at?: Date; // optional, if you want to handle it manually
}

// Defining Book model using Sequelize
export class Book extends Model<BookAttributes> implements BookAttributes {
    public book_id!: number;
    public title!: string;
    public author!: string;
    public isbn!: string;
    public genre?: string;
    public cover_image_url?: string;
    public available_copies!: number;
    public total_copies!: number;
    public created_at!: Date;
}

// Initialize Book model schema
Book.init({
    book_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING(20),
        allowNull: false,
        // unique: true
    },
    genre: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    cover_image_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    available_copies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_copies: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize, // Pass the sequelize instance
    tableName: 'Books', // Define the table name
    timestamps: false // Disable automatic createdAt, updatedAt columns
});

// Synchronize model with the database (creates table if not exists)
export const createBookTable = async () => {
    await Book.sync({ alter: true });
};
