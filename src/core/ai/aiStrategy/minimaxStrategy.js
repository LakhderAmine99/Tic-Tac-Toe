import AIStrategy from './AIStrategy.js';
import { GameOptions } from '../../game/gameState.js';

export default class MinimaxStrategy extends AIStrategy {

    /**
     * @constructor
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

        cords = this.#getCordsFromCell(this.#minimax(board));

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

    /**
     * 
     * @param {number} cellNumber 
     * @returns 
     */
    #getCordsFromCell(cellNumber){

        return;
    }
} 