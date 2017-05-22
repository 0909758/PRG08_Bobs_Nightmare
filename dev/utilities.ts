class Utilities{
    public static checkCollision(a:GameObject, b:GameObject):boolean{
        return (a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.height + a.y > b.y)
    }
}