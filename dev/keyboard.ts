class Keyboard{
    private bob:Bob;

    constructor(b:Bob){
        this.bob = b;
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    private onKeyDown(event:KeyboardEvent):void {
            switch(event.keyCode){
                case 38:
                    console.log("Up key is pressed");
                    break;
                case 37:
                    console.log("Left key is pressed");
                    this.bob.runningSpeed = 5;
                    break;
                case 39:
                    console.log("Right key is pressed");
                    this.bob.runningSpeed = -5;
                    break;
            }
    }

    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
                case 38:
                    console.log("Up key is pressed");
                    break;
                case 37:
                    console.log("Left key is pressed");
                    this.bob.runningSpeed = 0;
                    break;
                case 39:
                    console.log("Right key is pressed");
                    this.bob.runningSpeed = 0;
                    break;
            }
    }
    
}