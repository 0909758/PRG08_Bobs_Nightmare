class Keyboard{
    private bob:Bob;

    private upKey:number = 38;
    private leftKey:number = 37;
    private rightKey:number = 39;

    private rightKeyPressed:boolean = false;
    private leftKeyPressed:boolean = false;

    constructor(b:Bob){
        this.bob = b;
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    private onKeyDown(event:KeyboardEvent):void {
            switch(event.keyCode){
                case this.upKey:
                    if(this.bob.inAir == false){
                        this.bob.ySpeed = 20;
                        this.bob.behaviour = new Jumping(this.bob);
                        this.bob.inAir = true;
                    }
                    break;
                case this.leftKey:
                    if(this.rightKeyPressed == true){
                        this.bob.xSpeed = 0;
                        this.leftKeyPressed = true;
                    }
                    else{
                        this.bob.xSpeed = 5;
                        this.bob.facingLeft = true;
                        this.leftKeyPressed = true;
                    }
                    
                    break;
                case this.rightKey:
                    if(this.leftKeyPressed == true){
                        this.bob.xSpeed = 0;
                        this.rightKeyPressed = true;
                    }
                    else{
                        this.bob.xSpeed = -5;
                        this.bob.facingLeft = false;
                        this.rightKeyPressed = true;
                    }
                    break;
            }
    }

    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
                case this.upKey:
                    break;
                case this.leftKey:
                    if(this.rightKeyPressed == true){
                        this.bob.xSpeed = -5;
                        this.bob.facingLeft = false;
                        this.leftKeyPressed = false;
                    }
                    else{
                        this.bob.xSpeed = 0;
                        this.leftKeyPressed = false;
                    }
                    break;
                case this.rightKey:
                    if(this.leftKeyPressed ==true){
                        this.bob.xSpeed = 5;
                        this.bob.facingLeft = true;
                        this.rightKeyPressed = false;
                    }
                    else{
                        this.bob.xSpeed = 0;
                        this.rightKeyPressed = false;
                    }
                    break;
            }
    }
}