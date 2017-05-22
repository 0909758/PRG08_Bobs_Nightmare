class Game{
    private static instance:Game;
    
    private bob:Bob;
    private car:Car;
    private keyboard:Keyboard;

    private constructor() {
        this.bob = new Bob();
        this.car = new Car();
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.bob.move();
        if(Utilities.checkCollision(this.bob, this.car)){
            console.log("Collision!");
        }
        requestAnimationFrame(() => this.gameLoop());
    }

    public endGame(){
        console.log("Bob died! :(");
    }

    public static getInstance(){
        if (!Game.instance){
            this.instance = new Game();
        }
        return Game.instance;
    }
}