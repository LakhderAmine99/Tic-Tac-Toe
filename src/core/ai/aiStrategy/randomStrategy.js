import AIStrategy from './AIStrategy.js';
import { GameOptions } from '../../game/gameState.js';

export default class RandomStrategy extends AIStrategy {

    constructor(){}
    
    /**
     * 
     * @override
     * @param {[[]]} board The current game board.
     * @returns 
     */
    predictNextMove(board){

        let x,y;

        

        return {
            x:x,
            y:y
        };
    }
}