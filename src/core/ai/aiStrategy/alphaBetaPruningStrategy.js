import AIStrategy from './AIStrategy.js';
import { GameOptions,GameState,GameCombo } from '../../game/gameState.js';

/**
 * 
 * The minimax strategy based on the minimax algorithm with alpha-beta pruning, used to predict the best next move.
 * 
 * @extends AIStrategy
 * @class AlphaBetaPruningStrategy
 * @module AlphaBetaPruningStrategy
 * @type {AlphaBetaPruningStrategy}
 * 
 */
export default class AlphaBetaPruningStrategy extends AIStrategy {

    /**
     * @constructor
     * 
     * @example
     * 
     * let ai = new AlphaBetaPruningStrategy();
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

        switch(state){

            case GameState.STARTING:

                cords = this.getCordsFromCell(this.getSomeCornerCellNumber(board));

            break;

            case GameState.PLAYING:

                cords = this.getCordsFromCell(this.#getNextMoveCellNumber(board));

            break;
        }

        return [cords.x,cords.y];
    }

    /**
     * 
     * Get the cell number of the best score found by the minimaxalgorithm with pruning.
     * 
     * @param {[[]]} board 
     * @returns {number} The cell number of the best score found by the minimax algorithm with pruning.
     */
    #getNextMoveCellNumber(board){

        let bestScore = -Infinity;
        let alpha = -Infinity;
        let beta = Infinity;
        let cellNumber;

        for(let i=0; i<board.length; i++){

            for(let j=0; j<board[i].length; j++){

                if(board[i][j] == GameOptions.EMPTY_SIGN){

                    board[i][j] = GameOptions.AI_SIGN;

                    let score = this.#minimaxWithABPruning(board,0,false,alpha,beta);

                    if(bestScore < score){

                        bestScore = score;
                        cellNumber = 3*i + j;
                    }

                    board[i][j] = GameOptions.EMPTY_SIGN;
                }
            }
        }

        return cellNumber;
    }

    /**
     * The minimax algorithm with alpha beta pruning Implementation for Tic Tac Toe game.
     * 
     * @private
     * @see https://en.wikipedia.org/wiki/AlphaBetaPruningStrategy
     * 
     * @param {[[]]} board The current game board.
     * @param {number} depth The depth of our tree.
     * @param {boolean} isMaximizing Either the maximizer player or the minimizer. 
     * @returns {number} The score of the current board.
     */
    #minimaxWithABPruning(board,depth,isMaximizing,alpha,beta){

        let endStateScore = this.#evaluate(board,depth);

        if(endStateScore != null) return endStateScore;

        if(isMaximizing){

            let bestScore = -Infinity;

            for(let i=0; i<board.length; i++){

                for(let j=0; j<board[i].length; j++){

                    if(board[i][j] == GameOptions.EMPTY_SIGN){

                        board[i][j] = GameOptions.AI_SIGN;

                        let score = this.#minimaxWithABPruning(board,depth+1,false,alpha,beta);

                        bestScore = Math.max(bestScore,score);
        
                        board[i][j] = GameOptions.EMPTY_SIGN;
                        
                        if(bestScore >= beta) return bestScore;

                        alpha = Math.max(bestScore,alpha);
                    }
                }
            }

            return bestScore;

        }else{

            let bestScore = Infinity;

            for(let i=0; i<board.length; i++){

                for(let j=0; j<board[i].length; j++){

                    if(board[i][j] == GameOptions.EMPTY_SIGN){

                        board[i][j] = GameOptions.PLAYER_SIGN;

                        let score = this.#minimaxWithABPruning(board,depth+1,true,alpha,beta);

                        bestScore = Math.min(bestScore,score);

                        board[i][j] = GameOptions.EMPTY_SIGN;

                        if(bestScore <= alpha) return bestScore;

                        beta = Math.min(bestScore,beta);
                    }
                }
            }

            return bestScore;
        }
    }

    /**
     * 
     * Check if the game has ended and return the score of the current board.
     * 
     * @param {[[]]} board 
     * @param {number} depth 
     * @returns {number} The score of the current board or null if the game has not ended.
     */
    #evaluate(board,depth){

        for(let gc of GameCombo){

            let c1 = board[Math.floor(gc[0]/3)][gc[0]-3*Math.floor(gc[0]/3)];
            let c2 = board[Math.floor(gc[1]/3)][gc[1]-3*Math.floor(gc[1]/3)];
            let c3 = board[Math.floor(gc[2]/3)][gc[2]-3*Math.floor(gc[2]/3)];

            if(c1 != GameOptions.EMPTY_SIGN && c2 != GameOptions.EMPTY_SIGN && c3 != GameOptions.EMPTY_SIGN){

                if(c1 == c2 && c2 == c3){

                    if(c1 == GameOptions.AI_SIGN)
                        return 10 - depth;
                    return depth - 10;
                } 
            }
        };

        if(this.getRemainingCellsFromBoard(board).length == 0)
            return 0;
        return null;
    }
} 