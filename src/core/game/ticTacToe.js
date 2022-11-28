import { GameState } from './gameState.js';

const BoardOptions = {

    RADUIS:60,
    BORDER_WIDTH:10,
    CELL_WIDTH:0,
    CELL_CENTER:0,
    CELL_PADDING:0
}

/**
 * @module
 * @class
 */
class TicTacToe {

    /**
     * @type {HTMLCanvasElement} #canvas
     */
    #canvas = null;

    /**
     * @type {CanvasRenderingContext2D} #drawingContext
     */
    #drawingContext = null;

    /**
     * @type {{}} #options
     */
    #options = null;

    /**
     * @type {number} #gameState
     */
    #gameState = GameState.STARTING;

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {{}} options 
     */
    constructor(canvas,options){

        this.#canvas = canvas;
        this.#drawingContext = this.#canvas.getContext('2d');
        this.#options = options;

        BoardOptions.CELL_WIDTH = (this.#canvas.width/3) - BoardOptions.BORDER_WIDTH;
        BoardOptions.CELL_CENTER = BoardOptions.CELL_WIDTH/2;
        BoardOptions.CELL_PADDING = (BoardOptions.CELL_WIDTH - 2*BoardOptions.RADUIS)/2;

        this.#initBoard();

        this.#draw();
    }

    #initBoard(){

        this.#drawingContext.beginPath();

        this.#drawingContext.fillRect(0,this.#canvas.height/3 - 10,this.#canvas.width,10);
        this.#drawingContext.fillRect(0,2*this.#canvas.height/3,this.#canvas.width,10);

        this.#drawingContext.fillRect(this.#canvas.width/3 - 10,0,10,this.#canvas.height);
        this.#drawingContext.fillRect(2*this.#canvas.width/3,0,10,this.#canvas.height);

        this.#drawingContext.closePath();
    }

    #draw(x,y,w,h,color){

        let CELL_NUMBER = 0;

        this.#drawingContext.beginPath();

        // this is where we need to draw ether a O or an X.

        // draw the O here.

        this.#drawingContext.moveTo(
            BoardOptions.CELL_CENTER+BoardOptions.RADUIS,
            BoardOptions.CELL_CENTER
        );

        this.#drawingContext.arc(
            BoardOptions.CELL_CENTER,
            BoardOptions.CELL_CENTER,
            BoardOptions.RADUIS,
            0,
            Math.PI*2
        );

        this.#drawingContext.moveTo(
            5*BoardOptions.CELL_CENTER+2*(3/2)*BoardOptions.BORDER_WIDTH+BoardOptions.RADUIS,
            BoardOptions.CELL_CENTER
        );

        this.#drawingContext.arc(
            5*BoardOptions.CELL_CENTER+2*(3/2)*BoardOptions.BORDER_WIDTH,
            BoardOptions.CELL_CENTER,
            BoardOptions.RADUIS,
            0,
            Math.PI*2
        );

        // draw the X here.

        this.#drawingContext.moveTo(
            BoardOptions.CELL_PADDING,
            BoardOptions.CELL_PADDING
        );

        this.#drawingContext.lineTo(
            BoardOptions.CELL_WIDTH-BoardOptions.CELL_PADDING,
            BoardOptions.CELL_WIDTH-BoardOptions.CELL_PADDING
        );
        
        this.#drawingContext.moveTo(
            BoardOptions.CELL_WIDTH-BoardOptions.CELL_PADDING,
            BoardOptions.CELL_PADDING
        );

        this.#drawingContext.lineTo(
            BoardOptions.CELL_PADDING,
            BoardOptions.CELL_WIDTH-BoardOptions.CELL_PADDING
        );

        this.#drawingContext.lineWidth = 10;
        this.#drawingContext.stroke();

        this.#drawingContext.closePath();
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