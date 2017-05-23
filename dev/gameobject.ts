class GameObject{
    public div:HTMLElement;
    public width:number;
    public height:number;
    public x:number;
    public y:number;
    public xSpeed:number;
    public ySpeed:number;

    // width & height in this contructor are pixel sizes of the images (see style.css). 
    // I use these pixel width's and heights to detect collision in utilities.ts.
    constructor(tag:string, parent:HTMLElement, width:number, height:number, x:number, y:number, xSpeed:number, ySpeed:number){
        this.div = document.createElement(tag);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;

        parent.appendChild(this.div);

        // Set the first position of a new game object
        this.div.style.transform = "translate("+this.x+"px, "+this.y+"px)";
    }
}