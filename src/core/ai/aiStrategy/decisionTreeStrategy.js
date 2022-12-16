import AIStrategy from "./AIStrategy.js";
import { GameOptions } from "../../game/gameState.js";

export default class DecisionTreeStrategy extends AIStrategy {

    /**
     * 
     * @constructor
     * @param {number} playerStrategy
     */
    constructor(playerStrategy){ super(playerStrategy); }

    /**
     * 
     * @override
     * @param {[[]]} board The current game board.
     * @returns 
     */
    predictNextMove(board){

        let x,y;

        return [x,y];
    }
}