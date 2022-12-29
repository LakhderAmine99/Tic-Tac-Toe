import AIStrategy from './AIStrategy.js';

export default class RandomStrategy extends AIStrategy {

    /**
     * 
     * @constructor
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

        let x,y;
        let emptyCells = this.getRemainingCellsFromBoard(board);
        let cellNumber = emptyCells[Math.floor(Math.random()*(emptyCells.length-1))];

        x = Math.floor(cellNumber/3);
        y = cellNumber - 3*x;

        return [x,y];
    }
}