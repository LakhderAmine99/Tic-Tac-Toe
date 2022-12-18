
/**
 * 
 * @abstract
 * @class
 * @interface
 */
export default class AIStrategy {

    /**
     * @type {number} #gameState
     */
    #gameState;

    /**
     * 
     * @param {number} playerStrategy 
     */
    constructor(gameState){ 
        
        this.#gameState = gameState;
    }

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
     * @param {number} value
     */
    set gameState(value){ this.#gameState = value;  }

    /**
     * @returns {number} The player strategy either ATTACKING or DEFENDING.
     */
    get gameState(){ return this.#gameState; }
}