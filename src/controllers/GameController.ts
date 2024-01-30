import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { INTERNAL_SERVER_ERROR } from '../constants/message';
import { errorResponse, sendResponse } from '../utils/responseUtil';

export class GameController {
    public async getGameCode(req: any, res: any) {
        // const axios = require('axios');
        console.log('get roome code call')
        const options = {
            method: 'GET',
            url: 'https://ludoking-api-with-result.p.rapidapi.com/rapidapi/results/classic/',
            headers: {
                'X-RapidAPI-Key': 'cdb375f6ccmsh5c088e8ad7ca632p1e0041jsn2fe08856ffac',
                'X-RapidAPI-Host': 'ludoking-api-with-result.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return sendResponse(res, StatusCodes.OK, "Get Game Code", response.data);
        } catch (error) {
            console.error(error);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }

    // get Game result
    public async getGameResult(req: any, res: any) {
        const { gameCode } = req?.body;
        console.log('get roome code', typeof gameCode);
        // const axios = require('axios');
        const options = {
            method: 'GET',
            url: 'https://ludoking-api-with-result.p.rapidapi.com/rapidapi/results/result/',
            params: {
                roomcode: String(gameCode) || '06467585',
                type: 'classic'
            },
            headers: {
                'X-RapidAPI-Key': 'cdb375f6ccmsh5c088e8ad7ca632p1e0041jsn2fe08856ffac',
                'X-RapidAPI-Host': 'ludoking-api-with-result.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return sendResponse(res, StatusCodes.OK, "Get Game Result", response.data);
        } catch (error) {
            console.error(error);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR, error);
        }
    }
}