// backend/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token ko split karna


    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, 'jwt_secret_key', (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        (req as any).user = user; // Token se user ki details ko req mein add karna
        next();
    });
};
