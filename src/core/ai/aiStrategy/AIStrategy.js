
/**
 * 
 * @abstract
 * @class
 * @interface
 */
export default class AIStrategy {

    constructor(){ throw new Error("Exception : cannot instanciate an abstract class."); }

    /**
     * @abstract
     * @virtual
     */
    predictNextMove(){}
}