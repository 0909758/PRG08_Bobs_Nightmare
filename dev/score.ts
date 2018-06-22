class Score extends GameObject implements Subject {
    observers:Observer[];
    public scoreCounter;

    constructor(){
        super("score", document.getElementById("container"), 0, 0, 0, 0, 0, 0);
        this.observers = [];
        this.scoreCounter = 0;
        let scoreElement = document.getElementsByTagName("score")[0];
        scoreElement.innerHTML = "Survive Bob's nightmare! " + this.scoreCounter + "%";
        this.countScore();
    }

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

    lowerScore () {
        this.scoreCounter = this.scoreCounter - 0.3;
        this.scoreCounter = Math.round(this.scoreCounter * 10) / 10;
        if (this.scoreCounter <= 0) {
            this.scoreCounter = 0;
        }
        for(let o of this.observers){
            o.notify(this.scoreCounter);
        }
    }

    subscribe(o:Observer){
        this.observers.push(o);
    }

    unsubscribe(o:Observer){
        let index = this.observers.indexOf(o, 0);
        this.observers.splice(index, 1);
    }
}