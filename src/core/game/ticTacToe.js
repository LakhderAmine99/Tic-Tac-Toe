import { GameState,BoardOptions,GameOptions } from './gameState.js';
import { AISystemManager,DecisionTreeStrategy,RandomStrategy } from '../ai/@ai.index.js';

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

    /**
     * @type {AISystemManager} #aiSystemManager
     */
    #aiSystemManager = null;

    #playerStrategy = "A";

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

        this.#aiSystemManager = new AISystemManager(new RandomStrategy());
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

        let mouseX = e.clientY - this.#canvas.getBoundingClientRect().top;
        let mouseY = e.clientX - this.#canvas.getBoundingClientRect().left;

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
            BoardOptions.CELL_PADDING + cordY*BoardOptions.OFFSET + cordY*BoardOptions.CELL_WIDTH,
            BoardOptions.CELL_PADDING + cordX*BoardOptions.OFFSET + cordX*BoardOptions.CELL_WIDTH
        );

        this.#drawingContext.lineTo(
            (cordY+1)*BoardOptions.CELL_WIDTH + cordY*BoardOptions.OFFSET - BoardOptions.CELL_PADDING,
            (cordX+1)*BoardOptions.CELL_WIDTH + cordX*BoardOptions.OFFSET - BoardOptions.CELL_PADDING
        );
        
        this.#drawingContext.moveTo(
            (cordY+1)*BoardOptions.CELL_WIDTH + cordY*BoardOptions.OFFSET - BoardOptions.CELL_PADDING,
            BoardOptions.CELL_PADDING + cordX*BoardOptions.OFFSET + cordX*BoardOptions.CELL_WIDTH
        );

        this.#drawingContext.lineTo(
            BoardOptions.CELL_PADDING + cordY*BoardOptions.OFFSET + cordY*BoardOptions.CELL_WIDTH,
            (cordX+1)*BoardOptions.CELL_WIDTH + cordX*BoardOptions.OFFSET - BoardOptions.CELL_PADDING
        );
    }

    /**
     * 
     * @param {number} cordX 
     * @param {number} cordY 
     */
    #drawO(cordX,cordY){

        this.#drawingContext.moveTo(
            (2*cordY+1)*BoardOptions.CELL_CENTER+BoardOptions.RADUIS+cordY*BoardOptions.OFFSET,
            (2*cordX+1)*BoardOptions.CELL_CENTER+cordX*BoardOptions.OFFSET
        );

        this.#drawingContext.arc(
            (2*cordY+1)*BoardOptions.CELL_CENTER+cordY*BoardOptions.OFFSET,
            (2*cordX+1)*BoardOptions.CELL_CENTER+cordX*BoardOptions.OFFSET,
            BoardOptions.RADUIS,
            0,
            Math.PI*2
        );
    }

    /**
     * @description
     */
    play(){

        switch(this.#playerStrategy){

            case "A":

                if(this.#canPlay(this.#playerCellX,this.#playerCellY)){
            
                    this.#options.playerSign = "X";

                    this.#draw(this.#options.playerSign,this.#playerCellX,this.#playerCellY);
                    this.#gameMap[this.#playerCellX][this.#playerCellY] = GameOptions.PLAYER_SIGN;                    
                    this.#reduceRemainingCell(3*this.#playerCellX+this.#playerCellY);
                    
                    let aiMove = this.#nextMove();
                    
                    window.setTimeout(() => {
                        
                        if(this.#canPlay(aiMove.x,aiMove.y)){
                            
                            this.#draw("O",aiMove.x,aiMove.y);
                            this.#gameMap[aiMove.x][aiMove.y] = GameOptions.AI_SIGN;
                            this.#reduceRemainingCell(3*aiMove.x+aiMove.y);
                        }
                        
                    },250);
                }

            break;

            case "D":

            break;
        }

        this.#handleGameEnding();
    }

    /**
     * 
     * @returns The winner sign if there's a winner otherwise returns -1.
     */
    #isWinnerExists(){

        for(let gc of this.#gameCombo){

            let c1 = this.#gameMap[Math.floor(gc[0]/3)][gc[0]-3*Math.floor(gc[0]/3)];
            let c2 = this.#gameMap[Math.floor(gc[1]/3)][gc[1]-3*Math.floor(gc[1]/3)];
            let c3 = this.#gameMap[Math.floor(gc[2]/3)][gc[2]-3*Math.floor(gc[2]/3)];

            if(c1 != GameOptions.EMPTY_SIGN && c2 != GameOptions.EMPTY_SIGN && c3 != GameOptions.EMPTY_SIGN){

                if(c1 == c2 && c2 == c3) return c1;
            }
        };

        return -1;
    }

    /**
     * 
     */
    #handleGameEnding(){

        window.setTimeout(()=>{
  
            if(this.#isWinnerExists() > 0){
                
                alert("winner : "+this.#isWinnerExists());
                
                this.#gameState = GameState.ENDING;
                this.update();
                return;
            }
        },250);
    }

    /**
     * 
     * @returns 
     */
    #nextMove(){

        let x,y; 

        switch(this.#playerStrategy){

            case "A":

                [x,y] = this.#aiSystemManager.predictNextMove(this.#gameMap);

            break;

            case "D":

                [x,y] = this.#aiSystemManager.predictNextMove(this.#gameMap);

            break;
        }

        return {
            x:x,
            y:y
        };
    }

    /**
     * 
     * @param {number} cellNumber 
     * @returns 
     */
    #reduceRemainingCell(cellNumber){

        let cellIndex = this.#remainingMoves.indexOf(cellNumber);

        if(cellIndex >= 0){

            this.#remainingMoves.splice(cellIndex,1);
        }

        return;
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