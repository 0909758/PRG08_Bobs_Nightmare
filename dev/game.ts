class Game{
    private static instance : Game;
    
    private bob:Bob;
    private keyboard:Keyboard;

    private constructor() {
        this.bob = new Bob();
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.bob.move();
        requestAnimationFrame(() => this.gameLoop());
    }

    private endGame(){
    }

    public static getInstance(){
        if (! Game.instance){
            this.instance = new Game();
        }

        return Game.instance;
    }
}