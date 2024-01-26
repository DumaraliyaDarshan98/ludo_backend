import { StatusCodes } from "http-status-codes";
import { errorResponse, sendResponse } from "../utils/responseUtil";
import AppDataSource from "../data-source";
import { User } from "../entity/user.entity";
import { INTERNAL_SERVER_ERROR } from "../constants/message";

export class AdminController {
    public async updateAdmin(req:any, res:any) {
        try {
            console.log('updateAdmin')
            const userDetails = req?.body;

            const existUser: any = await AppDataSource.getRepository(User).findOne({
                where: { id: userDetails?.id }
            });

            if (!existUser) {
                return errorResponse(res, StatusCodes.NOT_FOUND, 'User Not Found');
            }

            userDetails['full_name'] = userDetails['full_name'] || existUser['full_name'];
            userDetails['mobile_no'] = userDetails['mobile_no'] || existUser['mobile_no'];
            userDetails['email'] = userDetails['email'] || existUser['email'];
            userDetails['password'] = existUser['password'];
            userDetails['refer_code'] = existUser['refer_code'];
            userDetails['amount'] = existUser['amount'];
            userDetails['role'] = existUser['role'];

            const updateUser = await AppDataSource.getRepository(User).save(userDetails);
            return sendResponse(res, StatusCodes.OK, "Update User Successfully", updateUser);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }   
}