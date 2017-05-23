class Running implements Behaviour{
    public bob:Bob;

    constructor(b:Bob){
        this.bob = b;
    }

    public move():void{
        // Setting the speed to move bob left or right
        if(this.bob.movingLeft == true){
            this.bob.xSpeed = 5;
        }
        else if(this.bob.movingRight == true){
            this.bob.xSpeed = -5;
        }
        else{
            this.bob.xSpeed = 0;
        }
        this.bob.x -= this.bob.xSpeed;
    }
}