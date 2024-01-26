import { AdminController } from '../controllers/AdminController';
import { UserController } from './../controllers/UserController';
import { Router } from "express";

const adminRoute = Router();
const adminController = new AdminController();

adminRoute.post('/admin-update', adminController.updateAdmin);

export default adminRoute;