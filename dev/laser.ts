/// <reference path="gameobject.ts" />

class Laser extends GameObject implements Observer {

    constructor(s:Subject){
        super("laser", document.getElementById("container"), 5, 20, 70, 445, 10, 0);
        this.ySpeed = Math.floor(Math.random() * Math.floor(4));
        s.subscribe(this);
    }

    public move(){
        if(this.x < document.getElementById("container").clientWidth - this.width){
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
        
            if(this.x >= document.getElementById("container").clientWidth - this.width){
                this.x = 70;
                this.y = 445;
                this.ySpeed = Math.floor(Math.random() * Math.floor(4));
            }
        }
    }

    notify(scoreCounter){
        this.xSpeed = 10 + scoreCounter / 10;
    }
}