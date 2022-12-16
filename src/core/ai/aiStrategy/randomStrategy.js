import AIStrategy from './AIStrategy.js';
import { GameOptions } from '../../game/gameState.js';

export default class RandomStrategy extends AIStrategy {

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
        let emptyCells = this.#getEmptyCells(board);
        let cellNumber = emptyCells[Math.floor(Math.random()*(emptyCells.length-1))];

        x = Math.floor(cellNumber/3);
        y = cellNumber - 3*x;

        return [x,y];
    }

    /**
     * 
     * @param {[[]]} board 
     * @returns
     */
    #getEmptyCells(board){

        let emptyCells = [];

        for(let i=0; i<board.length; i++){

            for(let j=0; j<board[i].length; j++){

                if(board[i][j] == GameOptions.EMPTY_SIGN){

                    emptyCells.push(3*i+j);
                }
            }
        }

        return emptyCells;
    }
}