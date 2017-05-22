class GameObject{
    public div:HTMLElement;
    public width:number;
    public height:number;
    public x:number;
    public y:number;
    public xSpeed:number;
    public ySpeed:number;

    constructor(tag:string, parent:HTMLElement, width:number, height:number, x:number, y:number, xSpeed:number, ySpeed:number){
        this.div = document.createElement(tag);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        parent.appendChild(this.div);
        this.div.style.transform = "translate("+this.x+"px"+this.y+"px)";
    }
}