/// <reference path="gameobject.ts" />

class Car extends GameObject implements Observer {
    moveDirection = "right";
    ySpeedCounter = 0;

    constructor(s:Subject){
        super("car", document.getElementById("container"), 145, 50, 5, 520, 5, 2);
        s.subscribe(this);
    }

    public move(){
        if(this.ySpeed == 2){
            this.ySpeedCounter++;
            if(this.ySpeedCounter == 2){
                this.ySpeed = -2;
                this.ySpeedCounter = 0;
            }
        }
        else {       
            this.ySpeedCounter++;
            if(this.ySpeedCounter == 2){
                this.ySpeed = 2;
                this.ySpeedCounter = 0;
            }
        }

        if(this.moveDirection == "right"){
            if(this.x < document.getElementById("container").clientWidth - this.width){
                this.moveRight();
            }
            if(this.x >= document.getElementById("container").clientWidth - this.width){
                this.moveDirection = "left";
            }
        }
        if(this.moveDirection == "left"){
            if(this.x > 0){
                this.moveLeft();
            }
            if(this.x <= 0){
                this.moveDirection = "right";
            }
        }
    }

    private moveRight(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
    }

    private moveLeft(){
        this.x -= this.xSpeed;
        this.y += this.ySpeed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
    }

    notify(scoreCounter){
        this.xSpeed = 5 + scoreCounter / 10;
    }
}