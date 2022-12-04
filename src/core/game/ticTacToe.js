import { GameState,BoardOptions,GameOptions } from './gameState.js';

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
    #gameState = GameState.PLAYING;

    /**
     * @type {[[]]} #gameMap
     */
    #gameMap = [
        [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN],
        [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN],
        [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN]
    ];

    /**
     * @type {[[]]} #gameCombo
     */
    #gameCombo = [
        [0,1,2],
        [0,3,6],
        [0,4,8],
        [3,4,5],
        [1,4,7],
        [2,5,8],
        [6,7,8],
        [2,4,6]
    ];

    #playerStrategy = "A";

    #playerMoves = [];

    #aiMoves = [];

    #remainingMoves = [0,1,2,3,4,5,6,7,8];

    #playerCellX;
    #playerCellY;

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

        BoardOptions.OFFSET = (3/2)*BoardOptions.BORDER_WIDTH;

        this.#initBoard();
        this.#initListeners();
    }

    /**
     * @description Init the TicTacToe game board.
     */
    #initBoard(){

        this.#drawingContext.beginPath();

        this.#drawingContext.fillRect(0,this.#canvas.height/3 - 10,this.#canvas.width,10);
        this.#drawingContext.fillRect(0,2*this.#canvas.height/3,this.#canvas.width,10);

        this.#drawingContext.fillRect(this.#canvas.width/3 - 10,0,10,this.#canvas.height);
        this.#drawingContext.fillRect(2*this.#canvas.width/3,0,10,this.#canvas.height);

        this.#drawingContext.closePath();
    }

    /**
     * 
     * @param {string} shape 
     * @param {number} cordX 
     * @param {number} cordY 
     */
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

    /**
     * @description Init the application event listeners.
     */
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

        this.#playerCellX = Math.floor(mouseX/200);
        this.#playerCellY = Math.floor(mouseY/200);

        this.update();
    }

    /**
     * 
     * @param {number} cellX 
     * @param {number} cellY 
     * @returns True if there's an empty cell to play in, false otherwise.
     */
    #canPlay(cellX,cellY){

        return this.#gameMap[cellX][cellY] == GameOptions.EMPTY_SIGN
    }

    /**
     * 
     * @param {number} cordX 
     * @param {number} cordY 
     */
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

    /**
     * 
     * @param {number} cordX 
     * @param {number} cordY 
     */
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

    /**
     * @description
     */
    play(){
        // check if there's a possible empty cell to play and check if there's a winner.

        switch(this.#playerStrategy){

            case "A":

                this.#options.playerSign = "X";
                
                if(this.#canPlay(this.#playerCellX,this.#playerCellY)){
        
                    this.#draw(this.#options.playerSign,this.#playerCellX,this.#playerCellY);
                    this.#gameMap[this.#playerCellX][this.#playerCellY] = GameOptions.PLAYER_SIGN;
                    this.#remainingMoves.splice(3*this.#playerCellX+this.#playerCellY,1);
                }
        
                let aiMove = this.#nextMove();
        
                window.setTimeout(() => {
        
                    if(this.#canPlay(aiMove.x,aiMove.y)){
                        
                        this.#draw("O",aiMove.x,aiMove.y);
                        this.#gameMap[aiMove.x][aiMove.y] = GameOptions.AI_SIGN;
                        this.#remainingMoves.splice(3*aiMove.x+aiMove.y,1);
                    }
        
                },1000);

            break;

            case "D":

            break;
        }
    }

    #nextMove(){

        let cellNumber,x,y; 

        switch(this.#playerStrategy){

            case "A":

            break;

            case "D":

            break;
        }

        return {
            x:x,
            y:y
        };
    }

    /**
     * @description
     */
    update(){
    
        // update the game state.

        switch(this.#gameState){

            case GameState.PLAYING:
                this.play();
            break;

            case GameState.ENDING:
                this.end();
            break;
        }
    }

    /**
     * @description
     */
    pause(){
    
        // pause the game and show current state.
    }

    /**
     * @description
     */
    end(){
    
        // end the game and display final state.
    }

    /**
     * @description
     */
    reset(){
    
        // reset the game state.
    }
}

export default TicTacToe;