import { AdminController } from '../controllers/AdminController';
import { Router } from "express";

const adminRoute = Router();
const adminController = new AdminController();

adminRoute.post('/admin-update', adminController.updateAdmin);
// get user list
adminRoute.get('/user-list', adminController.getUserList);

// get user wallet history
adminRoute.get('/user-wallet-list', adminController.getWalletList);
adminRoute.post('/wallet-action', adminController.actionOnWallet);

// get user withdraw history
adminRoute.get('/user-withdraw-list', adminController.getWithdrawList);

// contact-us CURD
adminRoute.post("/add-edit-contact-us", adminController.addEditContactUs);
adminRoute.get("/get-contact-us", adminController.getContactUs);

export default adminRoute;