import { Router } from 'express';
import {register,login,profile} from '../controllers/authController';
import { registrationRule, loginRule } from '../utils/validations/auth';
import verifyToken from '../middlewares/verifyToken';

const router = Router();

router.post('/api/auth/register', registrationRule, register);
router.post('/api/auth/login', loginRule, login);
router.get('/api/auth/profile', verifyToken, profile);

export default router;