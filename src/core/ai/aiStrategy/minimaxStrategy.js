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
     * @returns 
     */
    predictNextMove(board,state){

        return;
    }
} 