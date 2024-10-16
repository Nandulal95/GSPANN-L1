import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
dotenv.config();

export const SECRET_KEY: Secret = process.env.JWT_SECRET!;

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}


/**
 * Authenticate middleware
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
const authenticate = (req: Request, res: Response, next: NextFunction): any => {

    try {
        const token = req.header('Authorization')?.split(" ")[1];

        if (!token) {
            return res.status(422).json({ status: false, message: "Auth token is required!" })
        }

        jwt.verify(token!, SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(400).json({ message: 'Invalid token provided' });
            }
            (req as CustomRequest).token = decoded!;
            next();
        });
    } catch (error) {
        next(error);
    }
}

export default authenticate;