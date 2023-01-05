import { GameOptions } from "../../game/gameState.js";

/**
 * 
 * @abstract
 * @class
 * @interface
 */
export default class AIStrategy {

    /**
     * 
     */
    constructor(){ }

    /**
     * 
     * @abstract
     * @virtual
     * @param {[[]]} board The current game board.
     * @param {number} state The current game state.
     * @returns {[]} A vector with the cell x and y cordinates.
     */
    predictNextMove(board,state){}

    /**
     * 
     * @param {[[]]} board 
     * @returns 
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
}