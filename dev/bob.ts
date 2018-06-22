/// <reference path="gameobject.ts" />

class Bob extends GameObject{
    public behaviour:Behaviour;

    // Variables used by bob's jumping behavior
    public gravity:number = 1;
    public jumping:boolean = false;

    // Variable to determine bob's facing direction to flip image correctly.
    public facingLeft:boolean = true;

    // Variables to determine bob's direction of movement.
    public movingLeft:boolean = false;
    public movingRight:boolean = false;

    // String to determine if Bob's final form is active
    public finalForm:string = "";

    constructor(){
        super("bob", document.getElementById("container"), 55, 66, 650, 500, 0, 0);

        this.behaviour = new Running(this);
    }

    public move(){
        if(this.facingLeft == true){
            this.behaviour.move();
            if(this.finalForm != "bob")
                this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scaleX(1)";
            else
                this.div.style.transform = "translate("+this.x+"px, "+(this.y - 20) +"px) scaleX(1)";
        }
        else{
            this.behaviour.move();
            if(this.finalForm != "bob")
                this.div.style.transform = "translate("+this.x+"px, "+this.y+"px) scaleX(-1)";
            else
                this.div.style.transform = "translate("+this.x+"px, "+ (this.y - 20) +"px) scaleX(-1)";        
        }
    }

    private die(){
        let g = Game.getInstance();
        g.endGame();
    }

    public transform(){
        this.div.style.backgroundImage = "url('../images/bobs_final_form.png')";
        this.gravity = 0.5;
        this.div.style.width = "85px";
        this.div.style.height = "95px";
    }
}