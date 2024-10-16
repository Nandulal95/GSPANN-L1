import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * User registrations resource
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, message: 'Validation error', errors: errors.mapped() });
        }

        const user = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            password: await bcrypt.hash(req.body.password, 10)
        });

        if (!user) {
            return res.json({ status: false, message: "Something went creating user!" });
        }

        return res.json({ status: true, message: "You have been registered successfully!" })
    } catch (error) {
        next(error)
    }
}

/**
 * User Login resource
 * 
 * @param req 
 * @param res 
 * @returns 
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ status: false, message: 'Validation error', errors: errors.mapped() });
        }

        const { email, password } = req.body;

        const user: any = await User.findOne({
            where: {
                email: email,
            },
        });

        if (!user) {
            return res.status(422).json({ status: false, message: "You have not been registred yet!" });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(422).json({ status: false, message: "Invalid credentials!" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).json({ status: true, message: "You are successfully logged in!", data: token });
    } catch (error) {
        next(error)
    }
}
/**
 * Get user profile
 * 
 * @param req 
 * @param res 
 * @param next 
 */
export const profile = (req: Request, res: Response, next: NextFunction): any => {
    res.status(200).json({ status: true, message: "Profile info returned!", data: req });
}