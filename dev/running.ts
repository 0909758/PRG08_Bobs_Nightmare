class Running implements Behaviour{
    public bob:Bob;

    constructor(b:Bob){
        this.bob = b;
    }

    public move():void{
        this.bob.x -= this.bob.xSpeed;
    }
}