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
     * @type {[]} #remainingCells
     */
    #remainingCells = [];

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
     * @override
     * @param {[[]]} board The current game board.
     * @param {number} state The current game state.
     * @returns
     */
    predictNextMove(board,state){

        let cords;
        let cellNumber;

        this.#remainingCells = this.getRemainingCellsFromBoard(board);

        switch(state){
            
            case GameState.STARTING:

                cords = this.#getCordsFromCell(this.#getCenterCellNumber(board));

            break;

            case GameState.PLAYING:

                cellNumber = this.#winningMoveExists(board,GameOptions.AI_SIGN);

                if(cellNumber < 0){

                    cellNumber = this.#winningMoveExists(board,GameOptions.PLAYER_SIGN);

                    if(cellNumber < 0){

                        cellNumber = this.#getCenterCellNumber(board);

                        if(cellNumber < 0){
   
                            cellNumber =  this.#getSomeCornerCellNumber(board);
                            
                            if(cellNumber < 0){
                                
                                cellNumber =  this.#getRandomCellNumber();
                            }
                        }
                    }
                }

                cords = this.#getCordsFromCell(cellNumber);
                                
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
     * Returns the center cell number if it's empty.
     * @param {[[]]} board 
     * @returns 
     */
    #getCenterCellNumber(board){ 

        return board[1][1] == GameOptions.EMPTY_SIGN ? 4 : -1
    }

    /**
     * 
     * @param {[[]]} board 
     * @returns 
     */
    #getSomeCornerCellNumber(board){

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
     * @returns
     */
    #getRandomCellNumber(){

        return this.#remainingCells[Math.floor(Math.random()*this.#remainingCells.length)];
    }

    /**
     * 
     * @param {[]} row A numeric array.
     * @param {number} playerSign A numeric expression. 
     */
    #hasTwo(row,playerSign){

        if(!row.includes(GameOptions.EMPTY_SIGN)) return false;

        let counter = 0;

        row.forEach(cell => { if(cell == playerSign) counter++; });

        if(counter == 2) return true;

        return false;
    }

    /**
     * 
     * @param {number} cellNumber 
     * @returns 
     */
    #getCordsFromCell(cellNumber){ 
        
        return {
            x:Math.floor(cellNumber/3),
            y:cellNumber - 3*Math.floor(cellNumber/3)
        };
    }
}