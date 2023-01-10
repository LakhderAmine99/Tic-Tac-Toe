import AIStrategy from './AIStrategy.js';
import { GameCombo, GameOptions, GameState } from '../../game/gameState.js';

/**
 * The newell and simon's main algorithm for tic tac toe game, this is a simple implementaion of the
 * algorithm.
 * 
 * @extends AIStrategy
 * @class NewellNDSimonStrategy
 * @module NewellNDSimonStrategy
 * @type {NewellNDSimonStrategy}
 * 
 * @see https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
 */
export default class NewellNDSimonStrategy extends AIStrategy {

    /**
     * 
     * @constructor
     * @example
     * 
     * let ai = new NewellNDSimonStrategy();
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

        let cords;
        let cellNumber;

        super.remainingCells = this.getRemainingCellsFromBoard(board);

        switch(state){
            
            case GameState.STARTING:

                cords = this.getCordsFromCell(this.getCenterCellNumber(board));

            break;

            case GameState.PLAYING:

                cellNumber = this.#winningMoveExists(board,GameOptions.AI_SIGN);

                if(cellNumber < 0){

                    cellNumber = this.#winningMoveExists(board,GameOptions.PLAYER_SIGN);

                    if(cellNumber < 0){

                        cellNumber = this.getCenterCellNumber(board);

                        if(cellNumber < 0){
   
                            cellNumber =  this.getSomeCornerCellNumber(board);
                            
                            if(cellNumber < 0){
                                
                                cellNumber =  this.getRandomCellNumber();
                            }
                        }
                    }
                }

                cords = this.getCordsFromCell(cellNumber);
                                
            break;
        }

        return [cords.x,cords.y];
    }

    /**
     * If there's a winning move return the cell number, otherwise return -1.
     * 
     * @param {[[]]} board A 3x3 matrix. 
     * @param {number} playerSign A numeric expression. 
     * @returns {number}
     */
    #winningMoveExists(board,playerSign){

        for(let gc of GameCombo){

            let row = [

                board[Math.floor(gc[0]/3)][gc[0] - 3*Math.floor(gc[0]/3)],
                board[Math.floor(gc[1]/3)][gc[1] - 3*Math.floor(gc[1]/3)],
                board[Math.floor(gc[2]/3)][gc[2] - 3*Math.floor(gc[2]/3)]
            ];

            if(this.#hasTwo(row,playerSign)){

                return gc[row.indexOf(GameOptions.EMPTY_SIGN)];
            }
        }

        return -1;
    }

    /**
     * 
     * Check if the given row has two player signs and one empty sign.
     * 
     * @param {[]} row A numeric array.
     * @param {number} playerSign A numeric expression.
     * @returns {boolean} True if the row has two player signs and one empty sign, otherwise false.
     */
    #hasTwo(row,playerSign){

        if(!row.includes(GameOptions.EMPTY_SIGN)) return false;

        let counter = 0;

        row.forEach(cell => { if(cell == playerSign) counter++; });

        if(counter == 2) return true;

        return false;
    }
}