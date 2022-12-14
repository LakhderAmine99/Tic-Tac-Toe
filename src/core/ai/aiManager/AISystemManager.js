import AIStrategy from './aiStrategy/AIStrategy.js';

export default class AISystemManager {

    /**
     * @type {AIStrategy} #strategy
     */
    #strategy = null;

    /**
     * @type {[[]]} #board
     */
    #board = null;

    /**
     * 
     * @param {AIStrategy} strategy 
     */
    constructor(strategy,board){

        this.#strategy = strategy;
        this.#board = board;
    }

    /**
     * 
     */
    predictNextMove(){ return this.#strategy.predictNextMove(this.#board); }

    /**
     * 
     * @param {AIStrategy} strategy 
     */
    setAIStrategy(strategy){ this.#strategy = strategy; }
}