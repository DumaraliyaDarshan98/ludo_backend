import { Router } from "express";
import { GameController } from '../controllers/GameController';

const gameRoute = Router();
const gameController = new GameController();

// get user list
gameRoute.get('/get-game-code', gameController.getGameCode);
// get user list
gameRoute.post('/get-game-result', gameController.getGameResult);

export default gameRoute;