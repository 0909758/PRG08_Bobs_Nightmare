class Jumping implements Behaviour{
    public bob:Bob;

    constructor(b:Bob){
        this.bob = b;
    }

    public move():void{
        this.bob.y -= this.bob.jumpingSpeed;
    }
}