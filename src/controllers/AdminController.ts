import { StatusCodes } from "http-status-codes";
import { errorResponse, sendResponse } from "../utils/responseUtil";
import AppDataSource from "../data-source";
import { User } from "../entity/user.entity";
import { INTERNAL_SERVER_ERROR } from "../constants/message";
import { UserWallet } from "../entity/wallet.entity";
import { Withdraw } from "../entity/withdraw.entity";
import { ContactUs } from "../entity/contactUs.entity";

export class AdminController {
    public async updateAdmin(req: any, res: any) {
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
    public async getUserList(req: any, res: any) {
        try {
            const userList = await AppDataSource.getRepository(User).find({
                where: { role: 0 }
            });
            return sendResponse(res, StatusCodes.OK, "User List Find Successfully", userList);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }

    // get wallet list
    public async getWalletList(req: any, res: any) {
        try {
            const walletList = await AppDataSource.getRepository(UserWallet).find({
                relations: ['userDetail']
            });
            return sendResponse(res, StatusCodes.OK, "User Wallet History Find Successfully", walletList);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }

    //  approve money to wallet or decline monet to wallet
    public async actionOnWallet(req: any, res: any) {
        try {
            const { id, status } = req?.body;

            const walletDetails = await AppDataSource.getRepository(UserWallet).findOne({
                where: { id: id }
            });

            if (!walletDetails) {
                return errorResponse(res, StatusCodes.NOT_FOUND, 'Wallet Details Not Found');
            }

            if(walletDetails['status'] === 1 && status == 2) {
                const userDetails: any = await AppDataSource.getRepository(User).findOne({
                    where: { id: walletDetails?.user_id }
                });

                if (walletDetails['amount'] == '0' || !walletDetails['amount']) {
                    walletDetails['amount'] = '0';
                }

                const totalAmount = Number(userDetails['amount']) - Number(walletDetails['amount']);

                userDetails['amount'] = String(totalAmount);

                await AppDataSource.getRepository(User).save(userDetails);
            }

            walletDetails['status'] = status;

            const walletAction = await AppDataSource.getRepository(UserWallet).save(walletDetails);

            if (walletAction['status'] === 1) {
                const userDetails: any = await AppDataSource.getRepository(User).findOne({
                    where: { id: walletAction?.user_id }
                });

                if (walletAction['amount'] == '0' || !walletAction['amount']) {
                    walletAction['amount'] = '0';
                }

                const totalAmount = Number(userDetails['amount']) + Number(walletAction['amount']);

                userDetails['amount'] = String(totalAmount);

                await AppDataSource.getRepository(User).save(userDetails);
            }

            return sendResponse(res, StatusCodes.OK, "User Wallet History Find Successfully", walletAction);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }


    // get withdraw list
    public async getWithdrawList(req: any, res: any) {
        try {
            const withdrawList = await AppDataSource.getRepository(Withdraw).find({
                relations: ['userDetail']
            });
            return sendResponse(res, StatusCodes.OK, "User Withdraw History Find Successfully", withdrawList);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }

    // add edit contact us
    public async addEditContactUs(req: any, res: any) {
        try {
            const contactUsData = req?.body;

            const addEditContactData = await AppDataSource.getRepository(ContactUs).save(contactUsData);

            return sendResponse(res, StatusCodes.OK, "Add Edit Contact Details Successfully.", addEditContactData);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }

    // Get contact details
    public async getContactUs(req: any, res: any) {
        try {
            const contactUsDetails = await AppDataSource.getRepository(ContactUs).find();

            return sendResponse(res, StatusCodes.OK, "Get Contact Details Successfully.", contactUsDetails[0]);
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }
}