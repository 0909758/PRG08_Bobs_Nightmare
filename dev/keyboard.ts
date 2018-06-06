class Keyboard{
    private bob:Bob;

    // Changing the keycodes to easy-to-remember variables
    private upKey:number = 38;
    private leftKey:number = 37;
    private rightKey:number = 39;
    private b:number = 66;
    private o:number = 79;

    // Variables to determine if a button is pressed at this moment or not
    private rightKeyPressed:boolean = false;
    private leftKeyPressed:boolean = false;

    constructor(b:Bob){
        this.bob = b;

        // Adding an event listener for pressing a key
        window.addEventListener("keydown", (e:KeyboardEvent) => this.onKeyDown(e));

        // Adding an event listener for releasing a key
        window.addEventListener("keyup", (e:KeyboardEvent) => this.onKeyUp(e));
    }

    private onKeyDown(event:KeyboardEvent):void {
            switch(event.keyCode){
                case this.upKey:
                    if(this.bob.jumping == false){
                        this.bob.behaviour = new Jumping(this.bob);
                    }
                    break;
                case this.leftKey:
                    if(this.rightKeyPressed == true){
                        this.bob.movingLeft = false;
                        this.bob.movingRight = false;
                        
                        this.leftKeyPressed = true;
                    }
                    else{
                        this.bob.movingLeft = true;
                        this.bob.movingRight = false;
                        this.bob.facingLeft = true;

                        this.leftKeyPressed = true;
                    }
                    
                    break;
                case this.rightKey:
                    if(this.leftKeyPressed == true){
                        this.bob.movingLeft = false;
                        this.bob.movingRight = false;

                        this.rightKeyPressed = true;
                    }
                    else{
                        this.bob.movingLeft = false;
                        this.bob.movingRight =true;
                        this.bob.facingLeft = false;

                        this.rightKeyPressed = true;
                    }
                    break;
                case this.b:
                    if (this.bob.finalForm == "" || this.bob.finalForm == "bo")
                        this.bob.finalForm += "b";
                    break;
                case this.o:
                    if (this.bob.finalForm == "b")
                        this.bob.finalForm += "o";
                    break;
            }
    }

    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
                case this.upKey:
                    break;
                case this.leftKey:
                    if(this.rightKeyPressed == true){
                        this.bob.movingLeft = false;
                        this.bob.movingRight = true;
                        this.bob.facingLeft = false;

                        this.leftKeyPressed = false;
                    }
                    else{
                        this.bob.movingLeft = false;
                        this.bob.movingRight = false;

                        this.leftKeyPressed = false;
                    }
                    break;
                case this.rightKey:
                    if(this.leftKeyPressed == true){
                        this.bob.movingLeft = true;
                        this.bob.movingRight = false;
                        this.bob.facingLeft = true;

                        this.rightKeyPressed = false;
                    }
                    else{
                        this.bob.movingLeft = false;
                        this.bob.movingRight = false;

                        this.rightKeyPressed = false;
                    }
                    break;
                case this.b:
                    if(this.bob.finalForm == "bob")
                        this.bob.transform();
                    break;
            }
    }
}