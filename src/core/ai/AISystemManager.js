import AIStrategy from './aiStrategy/AIStrategy.js';

class AISystemManager {

    /**
     * @type {AIStrategy} #strategy
     */
    #strategy = null;

    /**
     * 
     * @param {AIStrategy} strategy 
     */
    constructor(strategy){

        this.#strategy = strategy;
    }

    /**
     * 
     */
    predictNextMove(){

        return this.#strategy.predictNextMove();
    }
}