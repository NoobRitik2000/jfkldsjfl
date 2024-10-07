import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db'; // Database connection

// Transaction interface definition (optional)
export interface TransactionAttributes {
    transaction_id?: number;
    book_id: number;
    user_id: number;
    borrow_date: Date;
    due_date: Date;
    return_date?: Date | null; // Nullable for not returned yet
    status: 'borrowed' | 'returned' | 'overdue';
    fine_amount?: number;
}

// Defining Transaction model using Sequelize
export class Transaction extends Model<TransactionAttributes> implements TransactionAttributes {
    public transaction_id!: number;
    public book_id!: number;
    public user_id!: number;
    public borrow_date!: Date;
    public due_date!: Date;
    public return_date?: Date | null; // Nullable
    public status!: 'borrowed' | 'returned' | 'overdue';
    public fine_amount!: number;
}

// Initialize Transaction model schema
Transaction.init({
    transaction_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    book_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'books', // Name of the books table
            key: 'book_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'users', // Name of the users table
            key: 'user_id'
        }
    },
    borrow_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    return_date: {
        type: DataTypes.DATE,
        allowNull: true // Nullable since it may not be returned yet
    },
    status: {
        type: DataTypes.ENUM('borrowed', 'returned', 'overdue'),
        allowNull: false,
        defaultValue: 'borrowed'
    },
    fine_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    }
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'loans', // Define the table name
    timestamps: false // Disable automatic createdAt, updatedAt columns
});

// Synchronize model with the database (creates table if not exists)
export const createLoanTable = async () => {
    await Transaction.sync({ alter: true });
};

export default Transaction;
