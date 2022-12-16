import AIStrategy from './AIStrategy.js';
import { GameOptions, GameStrategies } from '../../game/gameState.js';

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

        let x,y;
        let cellNumber;

        if(!this.#started){

            this.#remainingCells = this.#getRemainingCellsFromBoard(board);
            this.#started = true;
        }

        // choose which strategy is used in the game,
        // if the ai is attacking which means that the ai player is the one who plays first, then we need
        // to check if there's a possible win for the ai, if so we will ruturn the cell which will make the ai win.
        // otherwise if the ai is defending, which means that the ai is trying to block the real player of winning the game,
        // in this case we will check if there's a possibl win for the real player if so the ai will block that line,
        // or that column for preventing the player of winning the game

        switch(this.playerStrategy){

            case GameStrategies.ATTACKING:

                cellNumber = this.#winningMoveExists(GameOptions.PLAYER_SIGN);

                if(cellNumber >= 0){

                    [x,y] = this.#getCordsFromCell(cellNumber);

                }else{

                    [x,y] = this.#getCordsFromCell(this.#getRandomCellNumber());
                }

            break;

            case GameStrategies.DEFENDING:

                cellNumber = this.#winningMoveExists(GameOptions.AI_SIGN);

                if(cellNumber >= 0){

                    [x,y] = this.#getCordsFromCell(cellNumber);

                }else{

                    [x,y] = this.#getCordsFromCell(this.#getRandomCellNumber());
                }
                
            break;
        }

        return [x,y];
    }

    /**
     * 
     * @param {number} cellNumber 
     */
    #getCordsFromCell(cellNumber){ return [Math.floor(cellNumber/3),cellNumber - 3*x]; }

    /**
     * If there's a winning move return the cell number, otherwise return -1.
     * 
     * @param {number} playerSign A numeric expression. 
     * @returns {number}
     */
    #winningMoveExists(playerSign){

        return -1;
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

        let cellIndex = this.#remainingCells.indexOf(cellNumber);

        if(cellIndex >= 0){

            this.#remainingCells.splice(cellIndex,1);
        }

        return this.#getCordsFromCell(cellNumber);
    }
}