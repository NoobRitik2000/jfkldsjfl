// backend/controllers/userController.ts
import { Request, Response } from 'express';
import { User } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Function to create a new user
export const createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user using Sequelize's create method
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'User created successfully.', user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user. Please check your input.' });
    }
};

// Function to get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Fetch all users using Sequelize's findAll method
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
};

// Function to update a user
export const updateUser = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const { name, email, role } = req.body;

    try {
        // Find the user by ID
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Update the user with new data
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save(); // Save the updated user details
        res.status(200).json({ message: 'User updated successfully.', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Failed to update user.' });
    }
};

// Function to delete a user
export const deleteUser = async (req: Request, res: Response) => {
    const { user_id } = req.params;

    try {
        // Find the user by ID and delete
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.destroy(); // Delete the user
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};
// backend/controllers/userController.ts
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email: email } });
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Accessing the stored password from dataValues
        const storedPassword = user.dataValues.password;

        // Check if the password field is present
        if (!storedPassword) {        
            return res.status(500).json({ error: 'User found but password is missing.' });
        }

        // Validate the password against the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, storedPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password.' });
        }
    // Access the dataValues
   
        const token = jwt.sign({ id: user.user_id, role: user.role }, 'jwt_secret_key', { expiresIn: '24h' });
        res.status(200).json({ message: 'Login successful.', token, user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to login.' });
    }
    
};
