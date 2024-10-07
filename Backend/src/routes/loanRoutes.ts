import { Router } from 'express';
import {
    borrowBook,
    returnBook,
    getAllTransactions,
    getUserTransactions,
    getTransactionById
} from '../controllers/loanController';

const router = Router();

router.post('/borrow', borrowBook);
router.post('/return', returnBook);
router.get('/', getAllTransactions);
router.get('/user/:id', getUserTransactions);
router.get('/:transaction_id', getTransactionById);

export default router;
