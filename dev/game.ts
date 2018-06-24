class Game{
    private static instance:Game;
    
    private bob:Bob;
    private score:Score;
    private car:Car;
    private stormtrooper:Stormtrooper;
    private laser:Laser;
    private fish:Fish;
    private keyboard:Keyboard;

    constructor() {
        this.bob = new Bob();
        this.score = new Score();
        this.car = new Car(this.score);
        this.stormtrooper = new Stormtrooper();
        this.laser = new Laser(this.score);
        this.fish = new Fish(this.score);

        // Adding keyboard controls for bob
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        // Calling bob's move function to keep checking if he's moving or not
        this.bob.move();
        this.car.move();

        this.laser.move();

        this.fish.move(this.bob.x + this.bob.width / 2);

        // Collision checks to reduce game score
        if(Utilities.checkCollision(this.bob, this.car)){
            this.score.countScore("collision");
        }
        if(Utilities.checkCollision(this.bob, this.laser)){
            this.score.countScore("collision");
        }
        if(Utilities.checkCollision(this.bob, this.fish)){
            this.score.countScore("collision");
        }
        if (this.score.scoreCounter != 100 && this.score.scoreCounter < 100) {
            requestAnimationFrame(() => this.gameLoop());
        }
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