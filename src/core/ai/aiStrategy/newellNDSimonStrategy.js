import AIStrategy from './AIStrategy.js';
import { GameCombo, GameOptions, GameState, GameStrategies } from '../../game/gameState.js';

export default class NewellNDSimonStrategy extends AIStrategy {

    /**
     * @type {[]} #remainingCells
     */
    #remainingCells = [];

    /**
     * @type {boolean} #started
     */
    #started = false;

    /**
     * 
     * @constructor
     * @param {number} gameState
     */
    constructor(){ super(); }

    /**
     * 
     * @override
     * @param {[[]]} board The current game board.
     * @returns
     */
    predictNextMove(board){

        let cords;
        let cellNumber;

        this.#remainingCells = this.#getRemainingCellsFromBoard(board);

        switch(this.gameState){

            case GameState.STARTING:

                cords = this.#getCordsFromCell(this.#getCenterCellNumber(board));

            break;

            case GameState.PLAYING:

                cellNumber = this.#winningMoveExists(board,GameOptions.AI_SIGN);

                if(cellNumber < 0){

                    cellNumber = this.#winningMoveExists(board,GameOptions.PLAYER_SIGN);

                    if(cellNumber < 0){

                        cellNumber =  this.#getRandomCellNumber();
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
     * 
     * @param {[[]]} board 
     * @returns 
     */
    #getCenterCellNumber(board){ return 4; }

    /**
     * 
     * @param {[[]]} board 
     * @returns 
     */
    #getSomeCornerCellNumber(board){

        if(board[0][0] == GameOptions.EMPTY_SIGN)
            return 0;
        
        if(board[0][2] == GameOptions.EMPTY_SIGN)
            return 2;
        
        if(board[2][0] == GameOptions.EMPTY_SIGN)
            return 6;
        
        if(board[2][2] == GameOptions.EMPTY_SIGN)
            return 8;
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
     * @param {[[]]} board 
     * @returns 
     */
    #getRemainingCellsFromBoard(board){

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
     * @returns
     */
    #getRandomCellNumber(){

        return this.#remainingCells[Math.floor(Math.random()*this.#remainingCells.length)];
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