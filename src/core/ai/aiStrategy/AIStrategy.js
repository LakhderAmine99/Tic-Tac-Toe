import { GameOptions } from "../../game/gameState.js";

/**
 * 
 * The base class for all AI strategies.
 * 
 * @abstract
 * @virtual
 * @class AIStrategy
 * @module AIStrategy
 * @type {AIStrategy}
 * 
 */
export default class AIStrategy {

    /**
     * @type {[]} remainingCells
     */
    remainingCells = [];

    /**
     * 
     */
    constructor(){ }

    /**
     * 
     * Predict the next move based on the current game state.
     * 
     * @virtual
     * @param {[[]]} board The current game board.
     * @param {number} state The current game state.
     * @returns {[]} A vector with the cell x and y cordinates.
     */
    predictNextMove(board,state){}

    /**
     * 
     * Returns the remaining cells from the board.
     * 
     * @param {[[]]} board 
     * @returns {[]} An array with the remaining cells.
     */
    getRemainingCellsFromBoard(board){

        let emptyCells = [];
        
        for(let i=0; i<board.length; i++){

            for(let j=0; j<board[i].length; j++){

                if(board[i][j] == GameOptions.EMPTY_SIGN)
                    emptyCells.push(3*i+j);
            }
        }

        return emptyCells;
    }

    /**
     * 
     * @param {number} cellNumber 
     * @returns 
     */
    getCordsFromCell(cellNumber){ 
        
        return {
            x:Math.floor(cellNumber/3),
            y:cellNumber - 3*Math.floor(cellNumber/3)
        };
    }

    /**
     * Returns the center cell number if it's empty.
     * 
     * @param {[[]]} board 
     * @returns {number} The center cell number.
     */
    getCenterCellNumber(board){ 

        return board[1][1] == GameOptions.EMPTY_SIGN ? 4 : -1
    }

    /**
     * 
     * Returns a corner cell number if it's empty.
     * 
     * @param {[[]]} board 
     * @returns {number} A corner cell number.
     */
    getSomeCornerCellNumber(board){

        let corners = [];

        if(board[0][0] == GameOptions.EMPTY_SIGN)
            corners.push(0);
        
        if(board[0][2] == GameOptions.EMPTY_SIGN)
            corners.push(2);
        
        if(board[2][0] == GameOptions.EMPTY_SIGN)
            corners.push(6);
        
        if(board[2][2] == GameOptions.EMPTY_SIGN)
            corners.push(8);

        if(corners.length > 0) return corners[Math.floor(Math.random()*(corners.length-1))];

        return -1;
    }

    /**
     * 
     * Returns a random cell number from the remaining cells.
     * 
     * @returns {number} A random cell number.
     */
    getRandomCellNumber(){

        return this.remainingCells[Math.floor(Math.random()*this.remainingCells.length)];
    }
}