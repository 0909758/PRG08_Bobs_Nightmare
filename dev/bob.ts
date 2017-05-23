/// <reference path="gameobject.ts" />

class Bob extends GameObject{
    public behaviour:Behaviour;

    public gravity:number = 1;
    public inAir:boolean = false;
    public facingLeft:boolean = true;

    constructor(){
        super("bob", document.getElementById("container"), 55, 66, 650, 500, 0, 0);

        this.behaviour = new Running(this);
    }

    public move(){
        if(this.facingLeft == true){
            this.behaviour.move();
            this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scaleX(1)";
        }
        else{
            this.behaviour.move();
            this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scaleX(-1)";
        }
    }

    private die(){
        let g = Game.getInstance();
        g.endGame();
    }
}