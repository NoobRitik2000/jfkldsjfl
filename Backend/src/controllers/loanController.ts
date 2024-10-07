import { Request, Response } from 'express';
import Transaction, { TransactionAttributes } from '../models/loanModel';

// Create a new transaction (borrow a book)
export const borrowBook = async (req: Request, res: Response) => {
    const { book_id, user_id, borrow_date, due_date }: TransactionAttributes = req.body;
   // Input validation
   if (!book_id || !user_id || !borrow_date || !due_date) {
    return res.status(400).json({ error: 'Missing required fields' });
}
    try {
        const transaction = await Transaction.create({
            book_id,
            user_id,
            borrow_date,
            due_date,
            status: 'borrowed',
            fine_amount: 0.00 // Initial fine amount
        });
        return res.status(201).json(transaction);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to borrow book', details: error });
    }
};
// Return a book
export const returnBook = async (req: Request, res: Response) => {
    const { transaction_id, return_date, fine_amount } = req.body;

    try {
        const transaction = await Transaction.findByPk(transaction_id);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        // Update transaction status and return date
        transaction.return_date = return_date;
        transaction.status = 'returned';
        transaction.fine_amount = fine_amount; // Update the fine amount if applicable
        await transaction.save();

        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to return book', details: error });
    }
};

// Get all transactions
export const getAllTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.findAll();
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch transactions', details: error });
    }
};

// Get transactions for a specific user
export const getUserTransactions = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        const transactions = await Transaction.findAll({
            where: { user_id }
        });
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch user transactions', details: error });
    }
};

// Get a specific transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
    const { transaction_id } = req.params;

    try {
        const transaction = await Transaction.findByPk(transaction_id);
        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch transaction', details: error });
    }
};
