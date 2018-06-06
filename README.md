# Bob's Nightmare

![UML](diagram.png?raw=true "UML")

## Gameplay

Bob heeft een nachtmerrie en wordt aangevallen door een lego auto en een stormtrooper! Gebruik de pijltoetsen om alle aanvallen te ontwijken.

## Installatie

Speel de game op de volgende link: https://0909758.github.io/PRG08_Bobs_Nightmare/
Er is geen gebruik gemaakt van externe libraries.

## Locatie van design patterns
### Interface
Er is gebruik gemaakt van een interface in behaviour.ts

### Static utility method
Er is gebruik gemaakt van een static utility method in utilities.ts

### Singleton
De Game class is een singleton. Deze staat in game.ts
In main.ts wordt de game class voor het eerst aangemaakt.
In bob.ts wordt de game singleton gebruikt in de die() functie.

### Strategy
De strategy pattern wordt toegepast in behaviour.ts
running.ts en jumping.ts zijn de bijbehorende classes (behaviours).
In bob.ts wordt er gebruik gemaakt van de behaviours.

### Encapsulation
Dit is te vinden in meerdere classes bij het gebruik van public en private variabelen.

### Inheritance
Dit wordt gebruikt in bob.ts en car.ts
Beide overerven van gameobject.ts

### Composition
Ik heb nog geen gebruik gemaakt van composition omdat ik dit nog niet nodig heb gehad.
Dit heb ik later wel nodig omdat ik een eindbaas ga maken die een stormtrooper en een car aanmaakt. Samen vormen deze de eindbaas.

## Pull request week 4
https://github.com/LesleyKras/PRG0108Game/pull/1
