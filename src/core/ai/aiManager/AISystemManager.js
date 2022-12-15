import AIStrategy from './aiStrategy/AIStrategy.js';

export default class AISystemManager {

    /**
     * @type {AIStrategy} #strategy
     */
    #strategy = null;

    /**
     * 
     * @param {AIStrategy} strategy 
     */
    constructor(strategy){ this.#strategy = strategy; }

    /**
     * 
     * @param {[[]]} board 
     * @returns 
     */
    predictNextMove(board){ return this.#strategy.predictNextMove(board); }

    /**
     * 
     * @param {AIStrategy} strategy 
     */
    setAIStrategy(strategy){ this.#strategy = strategy; }
}