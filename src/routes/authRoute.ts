import {Router} from 'express';
import {AuthController} from '../controllers/AuthController';
// import {validate, validateEmail, validatePassword, validatePasswordMatch} from '../middleware/validationMiddleware';

const authRoutes = Router();
const authController = new AuthController();

// User Login functionality  
authRoutes.post('/login', authController.login);

// // User Forgot Password functionality  
// authRoutes.post('/forgot-password', validate([
//     validateEmail('email'),
// ]), authController.forgotPassword);

// // User Reset Password functionality  
// authRoutes.post('/reset-password', validate([
//     validateEmail('email'),
//     validatePassword('password'),
//     validatePasswordMatch('password', 'confirm_password')
// ]), authController.resetPassword);

export default authRoutes;