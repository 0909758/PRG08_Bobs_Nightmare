/// <reference path="gameobject.ts" />

class Laser extends GameObject{
    constructor(){
        super("laser", document.getElementById("container"), 5, 20, 70, 445, 10, 0);
        this.ySpeed = Math.floor(Math.random() * Math.floor(4));
    }

    public move(){
        if(this.x < document.getElementById("container").clientWidth - this.width){
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
        
            if(this.x >= document.getElementById("container").clientWidth - this.width){
                this.div.remove();
            }
        }
    }
}