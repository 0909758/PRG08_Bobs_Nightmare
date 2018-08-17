/// <reference path="gameobject.ts" />

class Fish extends GameObject implements Observer {
    private gravity = 1;
    private jumping = false;
    private bob : Bob;
    constructor(s:Subject, bob:Bob){
        super("fish", document.getElementById("container"), 65, 55, 5, 520, 2, 10);
        this.ySpeed = Math.floor(Math.random() * Math.floor(4));
        this.bob = bob;
        s.subscribe(this);
    }

    public move(){
        let bobX = this.bob.x + this.bob.width / 2;
        if(this.x < document.getElementById("container").clientWidth - this.width){
            if(this.jumping == false){
                this.ySpeed = 10;
                this.y -= this.ySpeed;
                this.jumping = true;
            }
            if(this.jumping == true){
                this.y -= this.ySpeed;
                this.ySpeed -= this.gravity;
            }
            if(this.y >= 520){
                this.jumping = false;
            }
            if(this.x + this.width / 2 <= bobX){
                this.x += this.xSpeed;
                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
            }
            if(this.x + this.width / 2 >= bobX){
                this.x -= this.xSpeed;
                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
            }
        }
    }

    notify(scoreCounter){
        
    }
}