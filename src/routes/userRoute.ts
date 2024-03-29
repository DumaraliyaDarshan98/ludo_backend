import { UserController } from './../controllers/UserController';
import { Router } from "express";

const userRoutes = Router();
const userController = new UserController();
// update user
userRoutes.post('/user-update', userController.updateUser);

// add wallet
userRoutes.post('/add-wallet', userController.addWalletAmount);
userRoutes.get('/wallet-history', userController.walletHistory);
userRoutes.get('/wallet-amount', userController.getWalletAmount);
userRoutes.get('/get-account-details', userController.getAccountDetails);

userRoutes.post('/cash-transaction', userController.cashFree);
userRoutes.get('/check-transaction-status/:orderId', userController.getCashFreeLink);

// withdraw amount
userRoutes.post('/withdraw-request', userController.addWithdrawRequest);
userRoutes.get('/withdraw-history', userController.withdrawHistory);
userRoutes.get('/withdraw-details/:id', userController.getWithdrawDetails);

// update user ludo name
userRoutes.post('/update-ludo-name', userController.updateLudoName);

// get user refer details
userRoutes.get('/refer-details', userController.getReferUserDetails);

export default userRoutes;