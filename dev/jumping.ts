class Jumping implements Behaviour{
    public bob:Bob;

    constructor(b:Bob){
        this.bob = b;
    }

    public move():void{
        // Controlling bob's jumping height
        if(this.bob.jumping == false){
            this.bob.ySpeed = 20;
            this.bob.jumping = true;
        }

        // Making sure that bob doesn't jump to the moon
        if(this.bob.jumping == true){
            this.bob.y -= this.bob.ySpeed;
            this.bob.ySpeed -= this.bob.gravity;

            // Telling bob when he's back on the ground so he can start running again
            if(this.bob.y >= 500){
                this.bob.jumping = false;
                this.bob.behaviour = new Running(this.bob);
            }
        }
        
        // Giving bob the option to move left and right while jumping
        if(this.bob.movingLeft == true){
            this.bob.xSpeed = 5;
        }
        else if(this.bob.movingRight == true){
            this.bob.xSpeed = -5;
        }
        else{
            this.bob.xSpeed = 0;
        }
        this.bob.x -= this.bob.xSpeed;        
    }
}