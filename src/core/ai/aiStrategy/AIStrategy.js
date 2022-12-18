
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
}