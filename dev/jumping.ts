class Jumping implements Behaviour{
    public bob:Bob;

    constructor(b:Bob){
        this.bob = b;
    }

    public move():void{
        this.bob.y -= this.bob.ySpeed;
        this.bob.x -= this.bob.xSpeed;
        this.bob.ySpeed -= this.bob.gravity;

        if(this.bob.y >= 500){
            this.bob.behaviour = new Running(this.bob);
            this.bob.inAir = false;
        }
    }
}