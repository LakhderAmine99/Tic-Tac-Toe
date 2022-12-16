
/**
 * 
 * @abstract
 * @class
 * @interface
 */
export default class AIStrategy {

    /**
     * @type {number} #playerStrategy
     */
    #playerStrategy;

    /**
     * 
     * @param {number} playerStrategy 
     */
    constructor(playerStrategy){ 
        
        this.#playerStrategy = playerStrategy;
    }

    /**
     * 
     * @abstract
     * @virtual
     * @param {[[]]} board The current game board.
     * @returns {[]} A vector with the cell x and y cordinates.
     */
    predictNextMove(board){}

    /**
     * @param {number} value
     */
    set playerStrategy(value){ this.#playerStrategy = value;  }

    /**
     * @returns {number} The player strategy either ATTACKING or DEFENDING.
     */
    get playerStrategy(){ return this.#playerStrategy; }
}