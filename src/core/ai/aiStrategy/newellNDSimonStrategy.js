import AIStrategy from './AIStrategy.js';
import { GameCombo, GameOptions, GameStrategies } from '../../game/gameState.js';

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

        let cords;
        let cellNumber;

        this.#remainingCells = this.#getRemainingCellsFromBoard(board);

        switch(this.playerStrategy){

            case GameStrategies.ATTACKING:

                cellNumber = this.#winningMoveExists(board,GameOptions.PLAYER_SIGN);

                cords = this.#getCordsFromCell(cellNumber >= 0 ? cellNumber : this.#getRandomCellNumber());

            break;

            case GameStrategies.DEFENDING:

                cellNumber = this.#winningMoveExists(board,GameOptions.AI_SIGN);
                
                cords = this.#getCordsFromCell(cellNumber >= 0 ? cellNumber : this.#getRandomCellNumber());
                
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