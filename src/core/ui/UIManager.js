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
    #playTurn = null;

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

        this.#xBtn.classList.add('button','xo');
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

        this.#xBtn.addEventListener('click',(e) => this.#setPlayTurn());
        this.#oBtn.addEventListener('click',(e) => this.#setPlayTurn());
        this.#restartBtn.addEventListener('click',(e) => this.restart());
    }

    setGameState(state){}

    /**
     * 
     * @param {Event} e 
     */
    #setPlayTurn(e){

        this.#playTurn = e.target.getAttribute('data-value');
    }
    
    /**
     * 
     * @returns 
     */
    getSelectedPlayTurn(){

        return this.#playTurn;
    }
}