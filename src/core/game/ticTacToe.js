import { GameState } from './gameState.js';

const BoardOptions = {

    RADUIS:60,
    BORDER_WIDTH:10,
    CELL_WIDTH:0,
    CELL_CENTER:0,
    CELL_PADDING:0,
    OFFSET:0
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

    #playerMoves = [];

    #computerMoves = [];

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {{}} options 
     */
    constructor(canvas,options){

        this.#canvas = canvas;
        this.#drawingContext = this.#canvas.getContext('2d');
        this.#options = options;

        this.#options.playerShape = "O";

        BoardOptions.CELL_WIDTH = (this.#canvas.width/3) - BoardOptions.BORDER_WIDTH;
        BoardOptions.CELL_CENTER = BoardOptions.CELL_WIDTH/2;
        BoardOptions.CELL_PADDING = (BoardOptions.CELL_WIDTH - 2*BoardOptions.RADUIS)/2;

        BoardOptions.OFFSET = (3/2)*BoardOptions.BORDER_WIDTH;

        this.#initBoard();
        this.#initListeners();
    }

    #initBoard(){

        this.#drawingContext.beginPath();

        this.#drawingContext.fillRect(0,this.#canvas.height/3 - 10,this.#canvas.width,10);
        this.#drawingContext.fillRect(0,2*this.#canvas.height/3,this.#canvas.width,10);

        this.#drawingContext.fillRect(this.#canvas.width/3 - 10,0,10,this.#canvas.height);
        this.#drawingContext.fillRect(2*this.#canvas.width/3,0,10,this.#canvas.height);

        this.#drawingContext.closePath();
    }

    #draw(shape,cordX,cordY){

        this.#drawingContext.beginPath();

        switch(shape){

            case 'O':
                this.#drawO(cordX,cordY);
            break;
            
            case 'X':
                this.#drawX(cordX,cordY);
            break;
        }

        this.#drawingContext.lineWidth = 5;
        this.#drawingContext.stroke();

        this.#drawingContext.closePath();
    }

    #initListeners(){

        this.#canvas.addEventListener('mousedown',(e) => this.#handleClick(e));
    }

    /**
     * 
     * @param {MouseEvent} e 
     */
    #handleClick(e){

        let mouseX = e.clientX - this.#canvas.getBoundingClientRect().left;
        let mouseY = e.clientY - this.#canvas.getBoundingClientRect().top;

        let cordX = Math.floor(mouseX/200);
        let cordY = Math.floor(mouseY/200);
        
        this.#draw(this.#options.playerShape,cordX,cordY);
    }

    #drawX(cordX,cordY){

        this.#drawingContext.moveTo(
            BoardOptions.CELL_PADDING + cordX*BoardOptions.OFFSET + cordX*BoardOptions.CELL_WIDTH,
            BoardOptions.CELL_PADDING + cordY*BoardOptions.OFFSET + cordY*BoardOptions.CELL_WIDTH
        );

        this.#drawingContext.lineTo(
            (cordX+1)*BoardOptions.CELL_WIDTH + cordX*BoardOptions.OFFSET - BoardOptions.CELL_PADDING,
            (cordY+1)*BoardOptions.CELL_WIDTH + cordY*BoardOptions.OFFSET - BoardOptions.CELL_PADDING
        );
        
        this.#drawingContext.moveTo(
            (cordX+1)*BoardOptions.CELL_WIDTH + cordX*BoardOptions.OFFSET - BoardOptions.CELL_PADDING,
            BoardOptions.CELL_PADDING + cordY*BoardOptions.OFFSET + cordY*BoardOptions.CELL_WIDTH
        );

        this.#drawingContext.lineTo(
            BoardOptions.CELL_PADDING + cordX*BoardOptions.OFFSET + cordX*BoardOptions.CELL_WIDTH,
            (cordY+1)*BoardOptions.CELL_WIDTH + cordY*BoardOptions.OFFSET - BoardOptions.CELL_PADDING
        );
    }

    #drawO(cordX,cordY){

        this.#drawingContext.moveTo(
            (2*cordX+1)*BoardOptions.CELL_CENTER+BoardOptions.RADUIS+cordX*BoardOptions.OFFSET,
            (2*cordY+1)*BoardOptions.CELL_CENTER+cordY*BoardOptions.OFFSET
        );

        this.#drawingContext.arc(
            (2*cordX+1)*BoardOptions.CELL_CENTER+cordX*BoardOptions.OFFSET,
            (2*cordY+1)*BoardOptions.CELL_CENTER+cordY*BoardOptions.OFFSET,
            BoardOptions.RADUIS,
            0,
            Math.PI*2
        );
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