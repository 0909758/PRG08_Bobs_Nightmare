/// <reference path="gameobject.ts" />

class Bob extends GameObject{
    public behaviour:Behaviour;

    public gravity:number = 1;
    public inAir:boolean = false;

    constructor(){
        super("bob", document.getElementById("container"), 55, 66, 650, 500, 0, 0);

        this.behaviour = new Running(this);
    }

    public move(){
        this.behaviour.move();
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }

    private die(){
        let g = Game.getInstance();
        g.endGame();
    }
}