import { Request, Response, NextFunction } from 'express';
// src/middleware/authenticateAdmin.ts
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).send('Access denied.');
    }

    jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token.');
        }
        (req as  any).decoded = decoded;

        next();
    });
};

