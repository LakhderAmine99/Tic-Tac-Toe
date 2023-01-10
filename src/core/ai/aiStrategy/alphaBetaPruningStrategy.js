import AIStrategy from './AIStrategy.js';
import { GameOptions } from '../../game/gameState.js';

/**
 * 
 * The minimax strategy based on the minimax algorithm with alpha-beta pruning, used to predict the best next move.
 * 
 * @extends AIStrategy
 * @class AlphaBetaPruningStrategy
 * @module AlphaBetaPruningStrategy
 * @type {AlphaBetaPruningStrategy}
 * 
 */
export default class AlphaBetaPruningStrategy extends AIStrategy {

    /**
     * @constructor
     * 
     * @example
     * 
     * let ai = new AlphaBetaPruningStrategy();
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
     * Predict the next move based on the current game state.
     * 
     * @override
     * @param {[[]]} board The current game board.
     * @param {number} state The current game state.
     * @returns {[]} A vector with the cell x and y cordinates.
     */
    predictNextMove(board,state){

        return;
    }
} 