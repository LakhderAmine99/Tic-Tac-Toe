
function TicTacToeApplication(){

    this.start = function(){

        console.log("Application started...");
    }
}

const setup = (() => {

    window.onload = function(){

        window.app = new TicTacToeApplication();
        window.app.start();
    }
    
})();