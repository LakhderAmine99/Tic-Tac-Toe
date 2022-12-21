/**
 * 
 */
export default class UIManager {

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
     * @type {string} #playTurn
     */
    #playTurn = "X";

    constructor(){

        this.#init();
        this.#initListeners();
    }

    #init(){

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
        // this.#panel.appendChild(this.#restartBtn);

        document.body.insertBefore(this.#panel,document.getElementById('app'));
    }

    #initListeners(){

        this.#xBtn.addEventListener('click',(e) => this.#setPlayTurn(e));
        this.#oBtn.addEventListener('click',(e) => this.#setPlayTurn(e));
        this.#restartBtn.addEventListener('click',(e) => this.restart(e));
    }

    /**
     * 
     * @param {Event} e 
     */
    #setPlayTurn(e){

        this.#playTurn = e.target.getAttribute('data-value');

        if(this.#playTurn == "X"){

            e.target.classList.add('selected');
            this.#oBtn.classList.remove('selected');

        }else{

            e.target.classList.add('selected');
            this.#xBtn.classList.remove('selected');
        }
    }
    
    get PLAYER_SIGN(){

        return this.#playTurn;
    }

    get AI_SIGN(){

        return this.#playTurn == "X" ? "O" : "X";
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