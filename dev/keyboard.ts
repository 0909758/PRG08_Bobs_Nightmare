class Keyboard{
    private bob:Bob;

    private upKey:number = 38;
    private leftKey:number = 37;
    private rightKey:number = 39;

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
                    this.bob.xSpeed = 5;
                    break;
                case this.rightKey:
                    this.bob.xSpeed = -5;
                    break;
            }
    }

    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
                case this.upKey:
                    break;
                case this.leftKey:
                    this.bob.xSpeed = 0;
                    break;
                case this.rightKey:
                    this.bob.xSpeed = 0;
                    break;
            }
    }
    
}