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
De Game class is een singleton, deze is te vinden in het game.ts bestand. Ik heb een singleton gebruikt voor de game class omdat ik maar 1 instantie van de game class wil hebben. De game class werkt daarom de property: private static instance:Game

```
class Game{
    private static instance:Game;
```
In main.ts wordt er een instantie van de game class aangemaakt.

### Polymorfisme


### Strategy
De strategy pattern wordt toegepast in behaviour.ts
running.ts en jumping.ts zijn de bijbehorende classes (behaviours).
In bob.ts wordt er gebruik gemaakt van de behaviours.

### Observer


## Pull request week 4
https://github.com/LesleyKras/PRG0108Game/pull/1

## Peer review week 6
https://github.com/Jeremy461/PRG08_Typescript_game/issues/2
