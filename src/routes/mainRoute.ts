import { Router } from "express";
import authRoutes from "./authRoute";

const mainRoutes = Router();

mainRoutes.use('/auth', authRoutes);
// mainRoutes.use('/user', [verifyIp, verifyToken], userRoutes);   
// mainRoutes.use('/practice', [verifyIp, verifyToken], practiceRoutes);
// mainRoutes.use('/client', [verifyIp, verifyToken], clientRoute);
// mainRoutes.use('/master', [verifyIp, verifyToken], masterRoutes);
// mainRoutes.use('/job', [verifyIp, verifyToken], jobRoutes);
// mainRoutes.use('/adhoc-task', [verifyIp, verifyToken], adhocTaskRoute);
// mainRoutes.use('/adhoc-task-template', [verifyIp, verifyToken], adhocTaskTemplateRoute);
// mainRoutes.use('/holiday', [verifyIp, verifyToken], holidayRoute);
// mainRoutes.use('/task', [verifyIp, verifyToken], taskRoutes);
// mainRoutes.use('/timeSheet', [verifyIp, verifyToken], taskTimeSheetRoutes);
// mainRoutes.use('', commonRoutes);
// mainRoutes.use('/query',[verifyIp,verifyToken],queryRoute)
// mainRoutes.use('/access-management', [verifyIp, verifyToken], accessManagementRoute);
// mainRoutes.use('/notification',[verifyIp,verifyToken],notificationRoute)


export default mainRoutes;