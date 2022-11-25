import { TTTGame } from '../src/core/index.core.js';

function TicTacToeApplication(){

    const canvas = document.getElementById('application');

    this.start = function(){

        console.log("Application started...");
    }

    function init(){

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