class Running implements Behaviour{
    public bob:Bob;

    constructor(b:Bob){
        this.bob = b;
    }

    public move():void{
        // Setting the speed to move bob left or right
        if(this.bob.movingLeft == true){
            // Making sure Bob stays in his container
            if(this.bob.x <= 0){
                // Stop moving left (right is still possible)
                this.bob.movingLeft = false;
            }
            else{
                this.bob.xSpeed = 5;
            }
        }
        else if(this.bob.movingRight == true){
            // Making sure Bob stays in his container
            if(this.bob.x >= document.getElementById("container").clientWidth - this.bob.width){
                // Stop moving right (left is still possible)
                this.bob.movingRight = false;
            }
            else{
                this.bob.xSpeed = -5;
            }
        }
        else{
            this.bob.xSpeed = 0;
        }
        this.bob.x -= this.bob.xSpeed;
    }
}