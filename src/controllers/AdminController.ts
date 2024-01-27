import { StatusCodes } from "http-status-codes";
import { errorResponse, sendResponse } from "../utils/responseUtil";
import AppDataSource from "../data-source";
import { User } from "../entity/user.entity";
import { INTERNAL_SERVER_ERROR } from "../constants/message";
import { UserWallet } from "../entity/wallet.entity";
import { Withdraw } from "../entity/withdraw.entity";

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

    // get user list
    public async getUserList(req:any, res:any) {
        try {
            const userList = await AppDataSource.getRepository(User).find({
                where : { role : 0 }
            });
            return sendResponse(res, StatusCodes.OK, "User List Find Successfully", userList);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }

    // get wallet list
    public async getWalletList(req:any, res:any) {
        try {
            const walletList = await AppDataSource.getRepository(UserWallet).find({
                relations : ['userDetail']
            });
            return sendResponse(res, StatusCodes.OK, "User Wallet History Find Successfully", walletList);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    } 

    // get withdraw list
    public async getWithdrawList(req:any, res:any) {
        try {
            const withdrawList = await AppDataSource.getRepository(Withdraw).find({
                relations : ['userDetail']
            });
            return sendResponse(res, StatusCodes.OK, "User Withdraw History Find Successfully", withdrawList);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    } 
}