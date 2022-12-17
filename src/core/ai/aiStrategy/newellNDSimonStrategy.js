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

        // choose which strategy is used in the game,
        // if the ai is attacking which means that the ai player is the one who plays first, then we need
        // to check if there's a possible win for the ai, if so we will ruturn the cell which will make the ai win.
        // otherwise if the ai is defending, which means that the ai is trying to block the real player of winning the game,
        // in this case we will check if there's a possibl win for the real player if so the ai will block that line,
        // or that column for preventing the player of winning the game

        switch(this.playerStrategy){

            case GameStrategies.ATTACKING:

                cellNumber = this.#winningMoveExists(board,GameOptions.PLAYER_SIGN);

                if(cellNumber >= 0){

                    cords = this.#getCordsFromCell(cellNumber);

                }else{

                    cords = this.#getCordsFromCell(this.#getRandomCellNumber());
                }

            break;

            case GameStrategies.DEFENDING:

                cellNumber = this.#winningMoveExists(board,GameOptions.AI_SIGN);

                if(cellNumber >= 0){

                    cords = this.#getCordsFromCell(cellNumber);

                }else{

                    cords = this.#getCordsFromCell(this.#getRandomCellNumber());
                }
                
            break;
        }

        return [cords.x,cords.y];
    }

    /**
     * 
     * @param {number} cellNumber 
     */
    #getCordsFromCell(cellNumber){ 
        
        return {
            x:Math.floor(cellNumber/3),
            y:cellNumber - 3*Math.floor(cellNumber/3)
        };
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

                let emptyCellIndex = row.indexOf(GameOptions.EMPTY_SIGN);

                let x = Math.floor(gc[emptyCellIndex]/3);
                let y = gc[emptyCellIndex] - 3*Math.floor(gc[emptyCellIndex]/3);

                return 3*x+y;
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

        let cellNumber = this.#remainingCells[Math.floor(Math.random()*this.#remainingCells.length)];

        return cellNumber;
    }
}