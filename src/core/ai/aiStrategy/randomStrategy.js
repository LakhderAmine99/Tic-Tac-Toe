import AIStrategy from './AIStrategy.js';

/**
 * 
 * The random strategy, used to predict the next move randomly.
 * 
 * @extends AIStrategy
 * @class RandomStrategy
 * @module RandomStrategy
 * @type {RandomStrategy}
 * 
 */
export default class RandomStrategy extends AIStrategy {

    /**
     * 
     * @constructor
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

        let x,y;
        let emptyCells = this.getRemainingCellsFromBoard(board);
        let cellNumber = emptyCells[Math.floor(Math.random()*(emptyCells.length-1))];

        x = Math.floor(cellNumber/3);
        y = cellNumber - 3*x;

        return [x,y];
    }
}