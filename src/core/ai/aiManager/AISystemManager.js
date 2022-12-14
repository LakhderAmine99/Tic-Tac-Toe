import AIStrategy from "../aiStrategy/AIStrategy.js";

/**
 * 
 * @class AISystemManager
 * @module AISystemManager
 * @type {AISystemManager}
 * 
 */
export class AISystemManager {

    /**
     * @type {AIStrategy} #strategy
     */
    #strategy = null;

    /**
     * @type {number} #state
     */
    #gameState = null;

    /**
     * 
     * @param {AIStrategy} strategy 
     */
    constructor(strategy){ this.#strategy = strategy; }

    /**
     * 
     * @param {[[]]} board 
     * @returns {{}} A vector with the cell x and y cordinates.
     */
    predictNextMove(board){ return this.#strategy.predictNextMove(board,this.#gameState); }

    /**
     * 
     * @param {AIStrategy} strategy 
     */
    setAIStrategy(strategy){ this.#strategy = strategy; }

    /**
     * 
     * @param {number} state 
     */
    setGameState(state){ this.#gameState = state; }
}