class Bob {
    public behaviour:Behaviour;

    public div:HTMLElement;

    public x:number = 650;
    public y:number = 500;
    public xSpeed:number = 0;
    public ySpeed:number = 0;
    public gravity:number = 1;
    public inAir:boolean = false;

    constructor(){
        let container:HTMLElement = document.getElementById("container");
        this.div = document.createElement("bob");
        container.appendChild(this.div);
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";

        this.behaviour = new Running(this);
    }

    public move(){
        this.behaviour.move();
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }
}