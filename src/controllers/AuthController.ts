import { StatusCodes } from "http-status-codes";
import { errorResponse, sendResponse } from "../utils/responseUtil";

export class AuthController {
    public async login(req: any, res: any) {
        try {
            console.log('Call Login')
            return sendResponse(res, StatusCodes.OK, 'Login Successfully', 'user');
        } catch (error) {
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Login SuccessFully', error);
        }
    }     
}