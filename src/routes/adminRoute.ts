import { AdminController } from '../controllers/AdminController';
import { UserController } from './../controllers/UserController';
import { Router } from "express";

const adminRoute = Router();
const adminController = new AdminController();

adminRoute.post('/admin-update', adminController.updateAdmin);
// get user list
adminRoute.get('/user-list', adminController.getUserList);

// get user wallet history
adminRoute.get('/user-wallet-list', adminController.getWalletList);

// get user withdraw history
adminRoute.get('/user-withdraw-list', adminController.getWithdrawList);

export default adminRoute;