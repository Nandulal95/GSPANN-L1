import { body } from "express-validator";
import User from "../../models/user";

export const registrationRule = [
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("mobile_no")
        .notEmpty()
        .custom(async (value: number) => {
            const user = await User.findOne({ where: { mobile_no: value } });

            if (user) {
                throw new Error('Mobile number already in use');
            }
        }),
    body("email").isEmail().custom(async (value: string) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body("password").notEmpty(),
]

export const loginRule = [
    body("email").notEmpty(),
    body("password").notEmpty()
]