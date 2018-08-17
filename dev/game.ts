class Game{
    private static instance:Game;
    private score:Score;
    private keyboard:Keyboard;
    private gameObjectsArray:Array<GameObject>;
    private bob:Bob;
    private car:Car;
    private stormtrooper:Stormtrooper;
    private laser:Laser;
    private fish:Fish;

    //array <GameObject>

    private constructor() {
        this.score = new Score();
        this.gameObjectsArray = new Array();
        this.bob = new Bob();
        this.car = new Car(this.score);
        this.stormtrooper = new Stormtrooper();
        this.laser = new Laser(this.score);
        this.fish = new Fish(this.score, this.bob);
        this.gameObjectsArray.push(this.bob, this.car, this.stormtrooper, this.laser, this.fish);

        // Adding keyboard controls for bob
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        // Calling bob's move function to keep checking if he's moving or not
        this.gameObjectsArray.forEach(element => {
            element.move();
        });

        // Collision checks to reduce game score
        if(Utilities.checkCollision(this.bob, this.car)){
            this.score.countScore("collision");
            // Active the Car's tubo after a collision with Bob
            this.car.carBehaviour = new Turbo(this.car);
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

    public static getInstance(){
        if (!Game.instance){
            this.instance = new Game();
        }
        return Game.instance;
    }
}