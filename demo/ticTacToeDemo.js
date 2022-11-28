import { TTTGame } from '../src/core/index.core.js';

function TicTacToeApplication(){

    const canvas = document.getElementById('application');

    /**
     * @type {TTTGame} TicTacToeGame
     */
    let TicTacToeInstance = null;

    this.start = function(){

        console.log("Application started...");

        init();
    }

    function init(){

        TicTacToeInstance = new TTTGame.TicTacToe(canvas,{});
    }

    function play(){

    }

    function end(){

    }

    function pause(){

    }

    function reset(){
        
    }
}

const setup = (() => {

    window.onload = function(){

        window.app = new TicTacToeApplication();
        window.app.start();
    }
    
})();