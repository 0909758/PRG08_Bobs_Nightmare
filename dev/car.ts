/// <reference path="gameobject.ts" />

class Car extends GameObject implements Observer {
    public carBehaviour:CarBehaviour;
    moveDirection = "right";
    ySpeedCounter = 0;

    constructor(s:Subject){
        super("car", document.getElementById("container"), 145, 50, 5, 520, 5, 2);
        s.subscribe(this);
        this.carBehaviour = new Driving(this);
    }

    public move():void {
        this.carBehaviour.move();
    }

    public turbo():void {
    }

    notify(scoreCounter){
        this.xSpeed = 5 + scoreCounter / 10;
    }
}