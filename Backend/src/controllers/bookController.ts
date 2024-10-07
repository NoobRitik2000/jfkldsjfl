// backend/controllers/bookController.ts
import { Request, Response } from 'express';
import { Book, BookAttributes } from '../models/bookModel';
// Create a new book
export const createBook = async (req: Request, res: Response) => {
    try {
        const bookData: BookAttributes = req.body;
        const newBook = await Book.create(bookData);
        return res.status(201).json(newBook);
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.findAll()
            res.json(books);
        }
         catch (error:any) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Internal Server Error' });    }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findByPk(bookId);

        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        const errorMessage = (error as Error).message || 'Internal Server Error'; // Cast error
        res.status(500).json({ error: errorMessage });
    }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const [updated] = await Book.update(req.body, {
            where: { book_id: bookId }
        });

        if (!updated) {
            return res.status(404).json({ message: 'Book not found' });
        }

        const updatedBook = await Book.findByPk(bookId);
        return res.status(200).json(updatedBook);
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const bookId = req.params.id;
        const deleted = await Book.destroy({
            where: { book_id: bookId }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(204).send(); // No content to send back
    } catch (error:any) {
        return res.status(500).json({ error: error.message });
    }
};
