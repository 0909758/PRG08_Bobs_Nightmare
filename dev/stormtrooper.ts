/// <reference path="gameobject.ts" />

class Stormtrooper extends GameObject{
    private gunFired = false;
    private laser:Laser;

    constructor(){
        super("stormtrooper", document.getElementById("container"), 60, 149, 10, 420, 0, 0);
    }
}