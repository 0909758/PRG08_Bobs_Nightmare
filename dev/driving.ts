class Driving implements CarBehaviour {
    public car:Car;

    constructor(c:Car) {
        this.car = c;
    }

    public move():void {
        if(this.car.ySpeed == 2){
            this.car.ySpeedCounter++;
            if(this.car.ySpeedCounter == 2){
                this.car.ySpeed = -2;
                this.car.ySpeedCounter = 0;
            }
        }
        else {       
            this.car.ySpeedCounter++;
            if(this.car.ySpeedCounter == 2){
                this.car.ySpeed = 2;
                this.car.ySpeedCounter = 0;
            }
        }

        if(this.car.moveDirection == "right"){
            if(this.car.x < document.getElementById("container").clientWidth - this.car.width){
                this.moveRight();
            }
            if(this.car.x >= document.getElementById("container").clientWidth - this.car.width){
                this.car.moveDirection = "left";
            }
        }
        if(this.car.moveDirection == "left"){
            if(this.car.x > 0){
                this.moveLeft();
            }
            if(this.car.x <= 0){
                this.car.moveDirection = "right";
            }
        }
    }

    private moveRight(){
        this.car.x += this.car.xSpeed;
        this.car.y += this.car.ySpeed;
        this.car.div.style.transform = "translate(" + this.car.x + "px, " + this.car.y + "px) scaleX(1)";
    }

    private moveLeft(){
        this.car.x -= this.car.xSpeed;
        this.car.y += this.car.ySpeed;
        this.car.div.style.transform = "translate(" + this.car.x + "px, " + this.car.y + "px) scaleX(-1)";
    }
}