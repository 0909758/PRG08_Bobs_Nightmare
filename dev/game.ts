class Game{
    private static instance:Game;
    
    private bob:Bob;
    private car:Car;
    private keyboard:Keyboard;

    constructor() {
        this.bob = new Bob();
        this.car = new Car();

        // Adding keyboard controls for bob
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){

        // Calling bob's move function to keep checken if he's moving or not
        this.bob.move();

        // Collision detection test with the lego car. (Check your console log)
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