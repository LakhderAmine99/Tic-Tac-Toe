import { TTTGame } from '../src/core/index.core.js';

function TicTacToeApplication(){

    /**
     * @type {HTMLCanvasElement} canvas
     */
    const canvas = document.getElementById('application');

    /**
     * @type {TTTGame} TicTacToeGame
     */
    this.TicTacToeInstance = null;

    /**
     * Start the game
     */
    this.start = function(){

        console.log("Application started...");
        
        this.TicTacToeInstance = new TTTGame.TicTacToe(canvas);
    }
}

const setup = (() => {

    window.onload = function(){

        window.app = new TicTacToeApplication();
        window.app.start();
    }
    
})();