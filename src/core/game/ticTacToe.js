import { GameState,BoardOptions,GameOptions,GameCombo } from './gameState.js';
import { AISystemManager,DecisionTreeStrategy,RandomStrategy,NewellNDSimonStrategy } from '../ai/@ai.index.js';

/**
 * 
 * Tic Tac Toe main game module
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
     * @type {number} #gameState
     */
    #gameState = GameState.STARTING;

    /**
     * @type {[[]]} #gameMap
     */
    #gameMap = null;

    /**
     * @type {AISystemManager} #aiSystemManager
     */
    #aiSystemManager = null;

    /**
     * @type {number} #playerCellX
     */
    #playerCellX;

    /**
     * @type {number} #playerCellY
     */
    #playerCellY;

    /**
     * @type {number} #playTurn
     */
    #playTurn;

    /**
     * @type {number} #winner
     */
    #winner = -1;

    /**
     * @type {number} #emptyCells
     */
    #emptyCells = 9;

    /**
     * @type {number} #xScore
     */
    #xScore = 0;

    /**
     * @type {number} #oScore
     */
    #oScore = 0;

    /**
     * @type {string} #playerSign
     */
    #playerSign = "X";

    /**
     * @type {string} #aiSign
     */
    #aiSign = "O";

    /**
     * @type {HTMLDivElement} #panel
     */
    #panel = null;

    /**
     * @type {HTMLDivElement} #xBtn
     */
    #xBtn = null;

    /**
     * @type {HTMLDivElement} #oBtn
     */
    #oBtn = null;

    /**
     * @type {HTMLDivElement} #restartBtn
     */
    #restartBtn = null;

    /**
     * @type {string} #difficulty
     */
    #difficulty = "EASY"

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas){

        this.#canvas = canvas;
        this.#drawingContext = this.#canvas.getContext('2d');
        
        BoardOptions.CELL_WIDTH = (this.#canvas.width/3) - BoardOptions.BORDER_WIDTH;
        BoardOptions.CELL_CENTER = BoardOptions.CELL_WIDTH/2;
        BoardOptions.CELL_PADDING = (BoardOptions.CELL_WIDTH - 2*BoardOptions.RADUIS)/2;
        
        BoardOptions.OFFSET = (3/2)*BoardOptions.BORDER_WIDTH;
        
        this.#init();
    }

    /**
     * @description Init the game state and everything else.
     */
    #init(){

        this.#initUI();
        this.#initBoard();
        this.#initListeners();

        this.#gameMap = [
            [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN],
            [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN],
            [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN]
        ];

        this.#setPlayTurn(this.#playerSign == "X" ? GameOptions.PLAYER_SIGN : GameOptions.AI_SIGN);
                
        this.#aiSystemManager = new AISystemManager(new NewellNDSimonStrategy());
        this.#aiSystemManager.setGameState(this.#gameState);
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
     * @description Init the application event listeners.
     */
    #initListeners(){

        this.#canvas.addEventListener('mousedown',(e) => this.#handleClick(e));
        this.#xBtn.addEventListener('click',(e) => this.#handleSelectedSign(e));
        this.#oBtn.addEventListener('click',(e) => this.#handleSelectedSign(e));
        this.#restartBtn.addEventListener('click',() => this.reset());
    }

    /**
     * @description
     */
    #initUI(){

        this.#panel = document.createElement('div');
        this.#panel.classList.add('menu');

        this.#xBtn = document.createElement('div');
        this.#oBtn = document.createElement('div');
        this.#restartBtn = document.createElement('div');

        this.#xBtn.classList.add('button','xo','selected');
        this.#oBtn.classList.add('button','xo');
        this.#restartBtn.classList.add('button','restart');

        this.#xBtn.innerHTML = "X<div>_</div>";
        this.#oBtn.innerHTML = "O<div>_</div>";
        this.#restartBtn.innerHTML = "Restart Game";

        this.#xBtn.setAttribute('data-value','X');
        this.#oBtn.setAttribute('data-value','O');

        this.#panel.appendChild(this.#xBtn);
        this.#panel.appendChild(this.#oBtn);

        document.body.insertBefore(this.#panel,document.getElementById('app'));
        document.querySelector('.menu-bottom').appendChild(this.#restartBtn);
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

                this.#drawingContext.strokeStyle = "#000";
                this.#drawO(cordX,cordY);

            break;
                
            case 'X':

                this.#drawingContext.strokeStyle = "#FFF";
                this.#drawX(cordX,cordY);

            break;
        }

        this.#drawingContext.lineCap = "round";
        this.#drawingContext.lineWidth = 10;
        this.#drawingContext.stroke();

        this.#drawingContext.closePath();
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

        if(cellX == undefined || cellY == undefined || isNaN(cellX) || isNaN(cellY)) return false;

        return this.#gameMap[cellX][cellY] == GameOptions.EMPTY_SIGN;
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

        if(this.#playTurn == GameOptions.PLAYER_SIGN && this.#gameState == GameState.STARTING){

            this.#gameState = GameState.PLAYING;
            this.#aiSystemManager.setGameState(this.#gameState);
        }

        if(this.#gameState == GameState.STARTING){

            let aiMove = this.#nextMove();
            
            this.#draw(this.#aiSign,aiMove.x,aiMove.y);
            this.#gameMap[aiMove.x][aiMove.y] = GameOptions.AI_SIGN;
                
            this.#emptyCells--;

            this.#gameState = GameState.PLAYING;
            this.#aiSystemManager.setGameState(this.#gameState);

            this.#setPlayTurn(GameOptions.PLAYER_SIGN);

        }else{

            if(this.#playTurn == GameOptions.PLAYER_SIGN && this.#canPlay(this.#playerCellX,this.#playerCellY)){

                this.#draw(this.#playerSign,this.#playerCellX,this.#playerCellY);
                this.#gameMap[this.#playerCellX][this.#playerCellY] = GameOptions.PLAYER_SIGN;
                
                if(this.#isWinnerExists() < 0){
                    
                    this.#setPlayTurn(GameOptions.AI_SIGN);

                    let aiMove = this.#nextMove();  
                    
                    window.setTimeout(() => {

                        if(this.#canPlay(aiMove.x,aiMove.y)){
                            
                            this.#draw(this.#aiSign,aiMove.x,aiMove.y);
                            this.#gameMap[aiMove.x][aiMove.y] = GameOptions.AI_SIGN;
                        }
                        
                        this.#setPlayTurn(GameOptions.PLAYER_SIGN);

                    },1000);
                }        
                
                this.#emptyCells -= 2;
            }
        }

        window.setTimeout(() => {

            if(this.#isWinnerExists() > 0 || this.#emptyCells <= 0){
   
                this.#handleGameEnding();
            }
                
        },1250);
    }

    /**
     * 
     * @returns The winner sign if there's a winner otherwise returns -1.
     */
    #isWinnerExists(){

        for(let gc of GameCombo){

            let c1 = this.#gameMap[Math.floor(gc[0]/3)][gc[0]-3*Math.floor(gc[0]/3)];
            let c2 = this.#gameMap[Math.floor(gc[1]/3)][gc[1]-3*Math.floor(gc[1]/3)];
            let c3 = this.#gameMap[Math.floor(gc[2]/3)][gc[2]-3*Math.floor(gc[2]/3)];

            if(c1 != GameOptions.EMPTY_SIGN && c2 != GameOptions.EMPTY_SIGN && c3 != GameOptions.EMPTY_SIGN){

                if(c1 == c2 && c2 == c3){

                    this.#winner = c1;
                    return this.#winner;
                } 
            }
        };

        return -1;
    }

    /**
     * 
     */
    #handleGameEnding(){

        if(this.#winner > 0){
                
            this.#gameState = GameState.ENDING;
            this.update();
            return;

        }else{
                
            this.#gameState = GameState.ENDING;
            this.update();
            return;
        }
    }

    /**
     * 
     * @param {Event} e 
     */
    #handleSelectedSign(e){

        if(this.#gameState == GameState.STARTING){
            
            let selectedSign = e.target.getAttribute('data-value');
            
            if(selectedSign == "X"){
                
                this.#playerSign = "X";
                this.#aiSign = "O";
                
                e.target.classList.add('selected');
                this.#oBtn.classList.remove('selected');
                
            }else{
                
                this.#playerSign = "O";
                this.#aiSign = "X";
                
                e.target.classList.add('selected');
                this.#xBtn.classList.remove('selected');
            }
            
            this.#playTurn = selectedSign == "X" ? GameOptions.PLAYER_SIGN : GameOptions.AI_SIGN;
                
            this.update();

        }else{

            return;
        }
    }

    /**
     * 
     */
    #switchSelectedTurn(){

        if(this.#playTurn == GameOptions.PLAYER_SIGN){
   
            if(this.#playerSign == "X"){

                this.#xBtn.classList.add('selected');
                this.#oBtn.classList.remove('selected');
            
            }else{

                this.#oBtn.classList.add('selected');
                this.#xBtn.classList.remove('selected');
            }

        }else{

            if(this.#aiSign == "X"){

                this.#xBtn.classList.add('selected');
                this.#oBtn.classList.remove('selected');
            
            }else{

                this.#oBtn.classList.add('selected');
                this.#xBtn.classList.remove('selected');
            }
        }
    }

    /**
     * 
     * @returns 
     */
    #nextMove(){

        let x,y; 

        [x,y] = this.#aiSystemManager.predictNextMove(this.#gameMap);

        return {
            x:x,
            y:y
        };
    }

    /**
     * 
     * @param {number} turn 
     */
    #setPlayTurn(turn){

        this.#playTurn = turn;
        this.#switchSelectedTurn();
    }

    /**
     * @description
     */
    update(){
    
        switch(this.#gameState){

            case GameState.STARTING:
                this.play();
            break;
            
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
    end(){

        if(this.#winner > 0){

            if(this.#winner == GameOptions.PLAYER_SIGN){

                if(this.#playerSign == "X"){

                    this.xScore = ++this.#xScore;

                }else{

                    this.oScore = ++this.#oScore;
                }

            }else{

                if(this.#aiSign == "X"){

                    this.xScore = ++this.#xScore;

                }else{

                    this.oScore = ++this.#oScore;
                }
            }

            alert("Winner is : "+this.#winner);

        }else{

            alert("No Winner it's a Tie");
        }
    
        this.reset();
    }

    /**
     * @description
     */
    reset(){
    
        this.#drawingContext.clearRect(0,0,this.#canvas.width,this.#canvas.height);

        this.#gameMap = [
            [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN],
            [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN],
            [GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN,GameOptions.EMPTY_SIGN]
        ];

        this.#emptyCells = 9;
        this.#winner = -1;
        this.#gameState = GameState.STARTING;
        this.#playerSign = "X";
        this.#aiSign = "O";
        this.#setPlayTurn(GameOptions.PLAYER_SIGN);
        this.#aiSystemManager.setGameState(this.#gameState);

        this.#initBoard();
    }

    /**
     * @returns
     */
    get xScore(){

        return this.#xScore;
    }

    /**
     * @returns
     */
    get oScore(){

        return this.#oScore;
    }

    /**
     * @param {string} score
     */
    set xScore(score){

        this.#xBtn.innerHTML = "X<div>"+score+"</div>";
    }
    
    /**
     * @param {string} score
     */
    set oScore(score){
    
        this.#oBtn.innerHTML = "O<div>"+score+"</div>";
    }
}

export default TicTacToe;