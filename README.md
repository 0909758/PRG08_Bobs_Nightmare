# Bob's Nightmare

## Herkansing: Week 0
### Singleton
Feedback: constructor niet private.

Uitwerking:
De constructor van de Game class is nu private.

### Polymorphism
Feedback: niet toegepast, uitgelegd als inheritance.

Uitwerking:
Polymorfisme heb ik toegepast op de GameObject class. De GameObject heeft een move() method. Deze move() method gebruik ik om ieder GameObject een vorm van movement te geven. 

```
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

    public move() {}
}
```

In de Game class maak ik een GameObjectsArray aan waarin ik alle GameObjecten in het spel kan opslaan.

```
this.gameObjectsArray = new Array();
this.bob = new Bob();
this.car = new Car(this.score);
this.stormtrooper = new Stormtrooper();
this.laser = new Laser(this.score);
this.fish = new Fish(this.score, this.bob);
this.gameObjectsArray.push(this.bob, this.car, this.stormtrooper, this.laser, this.fish);
```

Hierdoor kan ik makkelijk in 1 keer alle move() methods van de GameObjecten aanroepen in de game loop.

```
this.gameObjectsArray.forEach(element => {
    element.move();
});
```

Deze move() method kan voor ieder GameObject andere logica bevatten. Zo zal de Car heen en weer rijden en af en toe zijn Turbo aanzetten, de Fish zal Bob volgen en de Laser zal richting willekeurige hoogtes afschieten.

### Strategy
Feedback: heeft geen zin als de character alsnog een property heeft voor jumping en running.

Uitwerking:
Om het strategy pattern nog een keer goed uit te werken heb ik dit toegepast door middel van de CarBehaviour interface. Hiermee geef ik de Car class de mogelijkheid om 2 verschillende behaviours uit te voeren. Deze behaviours zijn Driving en Turbo.

```
interface CarBehaviour {
    car:Car;

    move():void;
}
```

```
class Driving implements CarBehaviour {
    public car:Car;

    constructor(c:Car) {
        this.car = c;
    }

    public move():void {
    ...
    }
```

```
class Turbo implements CarBehaviour {
    public car:Car;

    constructor(c:Car) {
        this.car = c;
    }

    public move():void {
    ...
    }
```

```
class Car extends GameObject implements Observer {
    public carBehaviour:CarBehaviour;
    moveDirection = "right";
    ySpeedCounter = 0;

    constructor(s:Subject){
        super("car", document.getElementById("container"), 145, 50, 5, 520, 5, 2);
        s.subscribe(this);
        this.carBehaviour = new Driving(this);
    }
    
    public move():void {
        this.carBehaviour.move();
    }
```

De standaard behaviour van de Car is Driving, maar na een collision met Bob zal de Car tijdelijk zijn Turbo aanzetten.

```
private gameLoop(){
        // Calling bob's move function to keep checking if he's moving or not
        this.gameObjectsArray.forEach(element => {
            element.move();
        });

        // Collision checks to reduce game score
        if(Utilities.checkCollision(this.bob, this.car)){
            this.score.countScore("collision");
            // Active the Car's tubo after a collision with Bob
            this.car.carBehaviour = new Turbo(this.car);
        }
```

Deze keer staat alle logica netjes verwerkt in de juiste behaviours van de Car en zit er geen movement logica meer in de Car class zelf. 

## Gameplay

Bob heeft een nachtmerrie en wordt aangevallen door figuren uit zijn programmeerlessen. Gebruik de pijltoetsen om alle aanvallen te ontwijken totdat Bob weer wakker is. 

### Mechanics
Als Bob bijna wakker is zullen de vijanden steeds sneller reageren. 
Als Bob geraakt wordt door een vijand blijft hij langer in zijn nachtmerrie vastzitten (en de snelheid van de vijanden neemt weer iets af).

### CHEAT CODE 
Typ "bob" om Bob te transformeren in Super Saiyan Bob. Super Saiyan Bob heeft een hogere springafstand dan normale Bob.

## Installatie

Speel de game op de volgende link: https://0909758.github.io/PRG08_Bobs_Nightmare/

## Design patterns

### UML
![UML](Bobs_Nightmare_UML.jpeg?raw=true "UML")

### Singleton
De Game class is een singleton, deze is te vinden in het game.ts bestand. Ik heb een singleton gebruikt voor de game class omdat ik maar 1 instantie van de game class wil hebben. De game class heeft daarom de property: private static instance:Game.

```
class Game{
    private static instance:Game;
```

Ook heeft de game class een method: public static getInstance().

```
public static getInstance(){
    if (!Game.instance){
        this.instance = new Game();
    }
    return Game.instance;
}
```

Deze method zorgt er voor dat de Game class een referentie naar zichzelf kan maken en zorgt er ook voor dat er maar 1 instance van de Game class aanwezig kan zijn.

In het bestand main.ts wordt de getInstance() method aangeroepen om het spel te starten.

```
 // load
window.addEventListener("load", function() {
    let g = Game.getInstance();
});
```

### Polymorfisme
Een voorbeeld van polymorfisme in dit spel is de GameObject class. Ieder Object dat in de game zichtbaar is erft van de GameObject class. De GameObject class bevat allemaal properties die bij meerdere meerdere classes nodig zijn.

```
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
```

Als je een instance aanmaakt van een class die van GameObject erft, dan moet je de waarden van deze properties doorgeven.

```
class Car extends GameObject implements Observer {
    moveDirection = "right";
    ySpeedCounter = 0;

    constructor(s:Subject){
        super("car", document.getElementById("container"), 145, 50, 5, 520, 5, 2);
        s.subscribe(this);
    }
```

Op deze manier heb je verschillende objecten die allemaal een GameObject zijn, maar wel verschillende waarden kunnen hebben.

Een ander voorbeeld van polymorfisme is het gebruik van method overloading in de Score class.

```
// countScore method overloading
countScore ();
countScore (collision: string);
countScore (collision?) {
    if (collision == "collision") {
        this.scoreCounter = this.scoreCounter - 0.3;
        this.scoreCounter = Math.round(this.scoreCounter * 10) / 10;
        if (this.scoreCounter <= 0) {
            this.scoreCounter = 0;
        }
        for(let o of this.observers){
            o.notify(this.scoreCounter);
        }
    }
    else {
        var score = this;
        let scoreElement = document.getElementsByTagName("score")[0];

        setInterval(function(){
            score.scoreCounter++;
            scoreElement.innerHTML = "Survive Bob's nightmare! " + score.scoreCounter + "%";
            if (score.scoreCounter >= 100) {
                score.scoreCounter = 100;
                scoreElement.innerHTML = "Bob woke up!";
            }
            for(let o of score.observers){
                o.notify(score.scoreCounter);
            }
        }, 500);
    }
}
```

Deze method kan op 2 manieren gebruikt worden. Als de method wordt gebruikt zonder parameter, dan zal hij de scoreCounter starten. Als er de parameter "collision" wordt meegegeven, dan zal de method de score verminderen.

### Strategy
Het strategy pattern wordt toegepast in het bestand behaviour.ts. De Bob class gebruikt deze behaviour class om de verschillende behaviours van Bob af te handelen.

```
class Bob extends GameObject{
    public behaviour:Behaviour;
```

Ik heb hier gekozen voor het strategy pattern omdat ik van te voren nog niet wist wat voor soort behaviours Bob zou krijgen in de game. Het strategy pattern zorgt er voor dat je makkelijk kunt wisselen tussen verschillende behaviours en ook makkelijk een nieuwe behaviour erbij kan maken als dat nodig is.

In de bestanden running.ts en jumping.ts zijn op dit moment de bestaande behaviours van Bob te vinden.

### Observer
Ik heb het Observer pattern toegepast om het moeilijkheidsniveau van de game dynamisch te kunnen veranderen. Hoe hoger de score in het spel, hoe sneller de vijanden zullen bewegen.

In dit geval implementeert de Score class de Subject interface. Ook maakt de Score class een array van observers aan waaraan hij later zijn scoreCounter property zal doorgeven.

```
class Score extends GameObject implements Subject {
    observers:Observer[];
    public scoreCounter;
```

De observers in dit geval zijn de Car class en de Laser class.

```
class Car extends GameObject implements Observer {
```

Deze 2 classes gebruiken de notify() method van de Observer interface om hun speed aan te passen aan de hand van de score die ze binnen krijgen.

```
notify(scoreCounter){
    this.xSpeed = 5 + scoreCounter / 10;
}
```

De Score class roept deze notify() method aan bij alle observers.

```
countScore () {
    var score = this;
    let scoreElement = document.getElementsByTagName("score")[0];

    setInterval(function(){
        score.scoreCounter++;
        scoreElement.innerHTML = "Survive Bob's nightmare! " + score.scoreCounter + "%";
        if (score.scoreCounter >= 100) {
            score.scoreCounter = 100;
            scoreElement.innerHTML = "Bob woke up!";
        }
        for(let o of score.observers){
            o.notify(score.scoreCounter);
        }
    }, 500);
}
```

## Pull request week 4
https://github.com/LesleyKras/PRG0108Game/pull/1

## Peer review week 6
https://github.com/Jeremy461/PRG08_Typescript_game/issues/2
