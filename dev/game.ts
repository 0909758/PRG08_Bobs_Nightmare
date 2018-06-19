class Game{
    private static instance:Game;
    
    private bob:Bob;
    private car:Car;
    private stormtrooper:Stormtrooper;
    private laser:Laser;
    private fish:Fish;
    private keyboard:Keyboard;

    constructor() {
        this.bob = new Bob();
        this.car = new Car();
        this.stormtrooper = new Stormtrooper();
        this.laser = new Laser();
        this.fish = new Fish();

        // Adding keyboard controls for bob
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        // Calling bob's move function to keep checking if he's moving or not
        this.bob.move();
        this.car.move();

        // Create laser with timing
        if(this.laser.x >= document.getElementById("container").clientWidth - this.laser.width){
            this.laser = new Laser();
        }
        this.laser.move();

        this.fish.move(this.bob.x + this.bob.width / 2);

        // Collision checks to reduce game score
        if(Utilities.checkCollision(this.bob, this.car)){
            console.log("Collision!");
        }
        if(Utilities.checkCollision(this.bob, this.laser)){
            console.log("Collision!");
        }
        if(Utilities.checkCollision(this.bob, this.fish)){
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