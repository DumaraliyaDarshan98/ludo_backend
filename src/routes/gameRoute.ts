import { Router } from "express";
import { GameController } from '../controllers/GameController';

const gameRoute = Router();
const gameController = new GameController();

// get user list
gameRoute.post('/get-game-code', gameController.getGameCode);

// get game list
gameRoute.get('/get-battle-list', gameController.getGameBattle);

// play-game
gameRoute.post('/pay-game', gameController.playGame);

// get user list
gameRoute.post('/get-game-result', gameController.getGameResult);

export default gameRoute;