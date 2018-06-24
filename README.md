# Bob's Nightmare

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


### Strategy
Het strategy pattern wordt toegepast in het bestand behaviour.ts. De Bob class gebruikt deze behaviour class om de verschillende behaviours van Bob af te handelen.

```
class Bob extends GameObject{
    public behaviour:Behaviour;
```

Ik heb hier gekozen voor het strategy pattern omdat ik van te voren nog niet wist wat voor soort behaviours Bob zou krijgen in de game. Het strategy pattern zorgt er voor dat je makkelijk kunt wisselen tussen verschillende behaviours en ook makkelijk een nieuwe behaviour erbij kan maken als dat nodig is.

In de bestanden running.ts en jumping.ts zijn op dit moment de bestaande behaviours van Bob te vinden.
In de Bob class wordt het wisselen van behaviour afgehandeld.

### Observer


## Pull request week 4
https://github.com/LesleyKras/PRG0108Game/pull/1

## Peer review week 6
https://github.com/Jeremy461/PRG08_Typescript_game/issues/2
