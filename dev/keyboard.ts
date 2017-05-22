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
                    console.log("Up key is pressed");
                    this.bob.ySpeed = 5;
                    this.bob.behaviour = new Jumping(this.bob);
                    break;
                case this.leftKey:
                    console.log("Left key is pressed");
                    this.bob.xSpeed = 5;
                    break;
                case this.rightKey:
                    console.log("Right key is pressed");
                    this.bob.xSpeed = -5;
                    break;
            }
    }

    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
                case this.upKey:
                    console.log("Up key is pressed");
                    break;
                case this.leftKey:
                    console.log("Left key is pressed");
                    this.bob.xSpeed = 0;
                    break;
                case this.rightKey:
                    console.log("Right key is pressed");
                    this.bob.xSpeed = 0;
                    break;
            }
    }
    
}