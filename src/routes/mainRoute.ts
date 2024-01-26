import { Router } from "express";
import authRoutes from "./authRoute";
import userRoutes from "./userRoute";
import { verifyToken } from "../middleware/tokenMiddleware";
import adminAuthRoutes from "./adminAuthRoute";
import adminRoute from "./adminRoute";

const mainRoutes = Router();

// Usr APIS
mainRoutes.use('/user/auth', authRoutes);
mainRoutes.use('/user', verifyToken, userRoutes);

// Admin APIS
mainRoutes.use('/admin/auth', adminAuthRoutes);
mainRoutes.use('/admin', verifyToken, adminRoute);

export default mainRoutes;