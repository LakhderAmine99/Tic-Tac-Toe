import { GameState } from './gameState.js';

/**
 * @module
 * @class
 */
class TicTacToe {

    constructor(canvas,options){

        this.canvas = canvas;
        this.options = options;

        this.gameSate = GameState.STARTING;
    }

    #initBoard(){
        return;
    }

    #draw(x,y,w,h,color){
        return;
    }

    play(){
        return;
    }

    update(){
        return;
    }

    pause(){
        return;
    }

    end(){
        return;
    }

    reset(){
        return;
    }
}

export default TicTacToe;