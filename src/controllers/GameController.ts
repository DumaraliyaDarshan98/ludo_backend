import { GamePlayer } from './../entity/gamePlayer.entity';
import { StatusCodes } from "http-status-codes";
import AppDataSource from "../data-source";
import { User } from "../entity/user.entity";
import { errorResponse, sendResponse } from "../utils/responseUtil";
import { AdminCommission } from "../entity/adminCommission.entity";
import axios from 'axios';
import { GameTable } from "../entity/gameTable.entity";
import { GameStatus, PlayerStatus } from "../constants/gameStatus";
import { getIO } from "../socket/socket";
import { INTERNAL_SERVER_ERROR } from "../constants/message";

export class GameController {
    // create game
    public async createGame(req: any, res: any) {
        try {
            const gameTableDetails = req?.body

            const userDetails = await AppDataSource.getRepository(User).findOne({
                where: { id: gameTableDetails?.user_id }
            });

            if (!userDetails) {
                return errorResponse(res, StatusCodes.NOT_FOUND, 'User Not Found');
            }

            const getCommission = await AppDataSource.getRepository(AdminCommission).find();

            // origin data
            const options = {
                method: 'GET',
                url: 'https://ludoking-api-with-result.p.rapidapi.com/rapidapi/results/classic/',
                headers: {
                    'X-RapidAPI-Key': 'cdb375f6ccmsh5c088e8ad7ca632p1e0041jsn2fe08856ffac',
                    'X-RapidAPI-Host': 'ludoking-api-with-result.p.rapidapi.com'
                }
            };

            // testing data
            // const options = {
            //     method: 'GET',
            //     url: 'https://ludoking-api-with-result.p.rapidapi.com/rapidapi/results/classic/',
            //     headers: {
            //         'X-RapidAPI-Key': 'asasascdb375f6ccmsh5c088e8ad7ca632p1e0041jsn2fe08856ffac',
            //         'X-RapidAPI-Host': 'ludoking-api-with-result.p.rapidapi.com'
            //     }
            // };

            const gameCodeAPIRes: any = await axios.request(options);

            if (!gameCodeAPIRes?.data['roomcode']) {
                return errorResponse(res, StatusCodes.NOT_FOUND, 'Game Code Not Found');
            }

            // const gameCode = "09287844";

            // Calculate winner amount and owner commission amount
            const commissionPer = getCommission[0]?.commission || 0;

            const ownerCommission = ((Number(gameTableDetails?.amount) * 2) * commissionPer) / 100;

            const winnerAmount = (Number(gameTableDetails?.amount) * 2) - ownerCommission;

            const payload = {
                game_code: gameCodeAPIRes?.data['roomcode'],
                amount: gameTableDetails?.amount,
                winner_amount: String(winnerAmount),
                admin_commission: String(ownerCommission),
                game_owner_id: userDetails?.id,
                status: GameStatus.Created
            }

            const createGameTable = await AppDataSource.getRepository(GameTable).save(payload);

            const playerPayload = {
                game_table_id: createGameTable?.id,
                p_id: userDetails?.id,
                p_name: gameTableDetails?.name || userDetails?.ludo_name,
                p_status: PlayerStatus.Created
            }

            await AppDataSource.getRepository(GamePlayer).save(playerPayload);

            const io = getIO();
            io.emit('create_battle', { title: 'Create Game' });

            return sendResponse(res, StatusCodes.OK, "Get Table Created.", createGameTable);
        } catch (error) {
            console.error(error);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
        }
    }

    // cancel game (Delete game)
    public async deleteGame(req: any, res: any) {
        try {
            const gameBattleId = Number(req.params.id);

            if (!gameBattleId) {
                return errorResponse(res, StatusCodes.NOT_FOUND, INTERNAL_SERVER_ERROR);
            }

            await AppDataSource.getRepository(GamePlayer).delete({
                game_table_id: gameBattleId
            });

            await AppDataSource.getRepository(GameTable).delete({
                id: gameBattleId
            });

            const io = getIO();
            io.emit('create_battle', { title: 'Create Game' });

            return sendResponse(res, StatusCodes.OK, "Get Table Created.", { id: gameBattleId });
        } catch (error) {
            console.log('Error deleting game', error);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
        }
    }

    // click to play button
    public async playGame(req: any, res: any) {
        const playerDetails = req?.body;
        try {
            const userDetails = await AppDataSource.getRepository(User).findOne({
                where: { id: playerDetails?.user_id || req?.userId }
            });

            if (!userDetails) {
                return errorResponse(res, StatusCodes.NOT_FOUND, 'User Not Found');
            }

            const battleDetails = await AppDataSource.getRepository(GameTable).findOne({
                where: { id: playerDetails?.battle_id }
            });

            if (!battleDetails) {
                return errorResponse(res, StatusCodes.NOT_FOUND, 'Battle Not Found');
            }

            battleDetails['status'] = GameStatus.Requested

            const gameDetails = await AppDataSource.getRepository(GameTable).save(battleDetails);

            const playerPayload = {
                game_table_id: gameDetails?.id,
                p_id: userDetails?.id,
                p_name: playerDetails?.name || userDetails?.ludo_name,
                p_status: PlayerStatus.Requested
            }

            await AppDataSource.getRepository(GamePlayer).save(playerPayload);

            const playerList = await AppDataSource.getRepository(GamePlayer).find({
                where: { game_table_id: gameDetails?.id }
            });

            playerList?.map((element) => {
                element['p_status'] = PlayerStatus.Requested
                AppDataSource.getRepository(GamePlayer).save(element);
            });

            const io = getIO();
            io.emit('create_battle', { title: 'Create Game' });

            return sendResponse(res, StatusCodes.OK, "Game Played Successfully", gameDetails);
        } catch (error) {
            console.log('Error play game', error);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
        }
    }

    // start game
    public async startGame(req: any, res: any) {
        const gameBattleId = Number(req.params.id);
        try {
            const gameDetails: any = await AppDataSource.getRepository(GameTable).findOne({
                where: { id: gameBattleId }
            });

            if (!gameDetails) {
                return errorResponse(res, StatusCodes.NOT_FOUND, 'Game Not Found');
            }
            gameDetails['status'] = GameStatus.Running;
            await AppDataSource.getRepository(GameTable).save(gameDetails);

            const playerList = await AppDataSource.getRepository(GamePlayer).find({
                where: { game_table_id: gameBattleId }
            });

            await playerList?.map(async (element) => {
                element['p_status'] = PlayerStatus.Running
                await AppDataSource.getRepository(GamePlayer).save(element);

                const gameList = await AppDataSource.getRepository(GamePlayer).find({
                    where: { p_id: element['p_id'] }
                });

                gameList?.map(async (game: any) => {
                    if (game?.game_table_id != gameBattleId) {
                        const data: any = await AppDataSource.getRepository(GameTable).findOne({
                            where: { id: game?.game_table_id }
                        });

                        data['status'] = GameStatus.Created
                        await AppDataSource.getRepository(GameTable).save(data);
                        await AppDataSource.getRepository(GamePlayer).delete({
                            id: game?.id
                        });
                    }
                })
            });

            const io = getIO();
            io.emit('create_battle', { title: 'Create Game' });

            return sendResponse(res, StatusCodes.OK, "Successfully", gameDetails);
        } catch (error) {
            console.log('Error Start game', error);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
        }
    }

    // get game list
    public async gameList(req: any, res: any) {
        try {
            let gameQuery = await AppDataSource.getRepository(GameTable).createQueryBuilder('game_table');

            if (req?.role != 1) {
                gameQuery = gameQuery.andWhere(`game_table.status != :Status`, { Status: GameStatus?.Cancel });
                gameQuery = gameQuery.andWhere(`game_table.status != :Status`, { Status: GameStatus?.Completed });
            }

            gameQuery = gameQuery.leftJoinAndSelect('game_table.gameOwner', 'users');
            gameQuery = gameQuery.leftJoinAndSelect('game_table.gamePlayer', 'game_player');

            gameQuery = gameQuery.orderBy(`game_table.id`, 'DESC');

            const gameList = await gameQuery.getMany();

            return sendResponse(res, StatusCodes.OK, "Game List Found Successfully", gameList);

        } catch (error) {
            console.log('Error Listing game', error);
            return errorResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, INTERNAL_SERVER_ERROR);
        }
    }
}