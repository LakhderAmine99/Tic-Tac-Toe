import AIStrategy from './AIStrategy.js';
import { GameOptions } from '../../game/gameState.js';

/**
 * 
 * The minimax strategy based on the minimax algorithm, used to predict the next move.
 * 
 * @extends AIStrategy
 * @class MinimaxStrategy
 * @module MinimaxStrategy
 * @type {MinimaxStrategy}
 * 
 */
export default class MinimaxStrategy extends AIStrategy {

    /**
     * @constructor
     * @example
     * 
     * let ai = new MinimaxStrategy();
     * 
     * let board = [
     * 
     *  [0,0,0],
     *  [0,0,0],
     *  [0,0,0]
     * 
     * ];
     * 
     * let nextMove = ai.predictNextMove(board,GameState.STARTING);
     * 
     * console.log(nextMove); // [1,1]
     */
    constructor(){ super(); }

    /**
     * 
     * @override
     * @param {[[]]} board The current game board.
     * @param {number} state The current game state.
     * @returns {[]} A vector with the cell x and y cordinates.
     */
    predictNextMove(board,state){

        let cords;

        cords = this.getCordsFromCell(this.#minimax(board));

        return [cords.x,cords.y];
    }

    /**
     * 
     * @param {[[]]} board The current game board.
     * @returns {number} A numeric expression.
     */
    #minimax(board){

        return;
    }
} 