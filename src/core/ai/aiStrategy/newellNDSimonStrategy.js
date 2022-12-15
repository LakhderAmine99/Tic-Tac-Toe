import AIStrategy from './AIStrategy.js';
import { GameOptions } from '../../game/gameState.js';

export default class NewellNDSimonStrategy extends AIStrategy {

    /**
     * 
     * @constructor
     */
    constructor(){ super(); }

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