"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdminController_1 = require("../controllers/AdminController");
const express_1 = require("express");
const adminRoute = (0, express_1.Router)();
const adminController = new AdminController_1.AdminController();
adminRoute.post('/admin-update', adminController.updateAdmin);
// get user list
adminRoute.get('/user-list', adminController.getUserList);
adminRoute.post('/user-status-change', adminController.changeUserStatus);
// get user wallet history
adminRoute.get('/user-wallet-list', adminController.getWalletList);
adminRoute.post('/wallet-action', adminController.actionOnWallet);
// get user withdraw history
adminRoute.get('/user-withdraw-list', adminController.getWithdrawList);
adminRoute.post('/withdraw-action', adminController.actionOnWithdraw);
// contact-us CURD
adminRoute.post("/add-edit-contact-us", adminController.addEditContactUs);
adminRoute.get("/get-contact-us", adminController.getContactUs);
// Dashboard details
adminRoute.get("/get-dashboard-details", adminController.getDashboardDetails);
// admin commission details
adminRoute.post("/add-edit-commission", adminController.addEditAdminCommission);
adminRoute.get("/get-commission", adminController.getAdminCommission);
// admin refer commission details
adminRoute.post("/refer-add-edit-commission", adminController.addEditReferCommission);
adminRoute.get("/refer-get-commission", adminController.getReferAdminCommission);
// custom result update for admin side 
adminRoute.post("/verify-result", adminController.verifyResult);
exports.default = adminRoute;
