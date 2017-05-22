/// <reference path="gameobject.ts" />


class Car extends GameObject{
    constructor(){
        super("car", document.getElementById("container"), 145, 50, 650, 500, 0, 0);
    }
}