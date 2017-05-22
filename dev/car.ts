/// <reference path="gameobject.ts" />

class Car extends GameObject{
    constructor(){
        super("car", document.getElementById("container"), 145, 50, 25, 520, 0, 0);
    }
}