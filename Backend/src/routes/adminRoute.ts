import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticateAdmin } from '../middlewares/authAdmin';// Adjust the path based on your structure
const router = express.Router();

const ADMIN_USERNAME = 'Tejash';
const ADMIN_PASSWORD = 'gadaRiya07&&';

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        const token = jwt.sign({ role: 'admin' }, ' jwt_secret_key', { expiresIn: '1h' }); // Use a secure secret
        return res.status(200).json({ token });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});
router.get('/dashboard', authenticateAdmin, (req, res) => {
    // Return admin dashboard data
    res.status(200).json({ message: 'Welcome to the Admin Dashboard!' });
});
export default router;
