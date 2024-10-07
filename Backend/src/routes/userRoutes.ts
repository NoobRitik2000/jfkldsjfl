// backend/routes/userRoutes.ts
import { Router } from 'express';
import {
    loginUser,
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router: Router = Router();
// User login route
router.post('/login', loginUser);
router.post('/signup', createUser); // Create a new user
router.get('/users',authenticateToken, getAllUsers); // Get all users
router.put('/users/:id', updateUser); // Update user by ID
router.delete('/users/:id', deleteUser); // Delete user by ID

export default router;
