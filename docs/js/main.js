var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, parent, width, height, x, y, xSpeed, ySpeed) {
        this.div = document.createElement(tag);
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        parent.appendChild(this.div);
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
    return GameObject;
}());
var Bob = (function (_super) {
    __extends(Bob, _super);
    function Bob() {
        var _this = _super.call(this, "bob", document.getElementById("container"), 55, 66, 650, 500, 0, 0) || this;
        _this.gravity = 1;
        _this.jumping = false;
        _this.facingLeft = true;
        _this.movingLeft = false;
        _this.movingRight = false;
        _this.finalForm = "";
        _this.behaviour = new Running(_this);
        return _this;
    }
    Bob.prototype.move = function () {
        if (this.facingLeft == true) {
            this.behaviour.move();
            if (this.finalForm != "bob")
                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
            else
                this.div.style.transform = "translate(" + this.x + "px, " + (this.y - 20) + "px) scaleX(1)";
        }
        else {
            this.behaviour.move();
            if (this.finalForm != "bob")
                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
            else
                this.div.style.transform = "translate(" + this.x + "px, " + (this.y - 20) + "px) scaleX(-1)";
        }
    };
    Bob.prototype.die = function () {
        var g = Game.getInstance();
        g.endGame();
    };
    Bob.prototype.transform = function () {
        this.gravity = 0.5;
        this.div.className = "final-form";
    };
    return Bob;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car(s) {
        var _this = _super.call(this, "car", document.getElementById("container"), 145, 50, 5, 520, 5, 2) || this;
        _this.moveDirection = "right";
        _this.ySpeedCounter = 0;
        s.subscribe(_this);
        _this.carBehaviour = new Driving(_this);
        return _this;
    }
    Car.prototype.move = function () {
        this.carBehaviour.move();
    };
    Car.prototype.turbo = function () {
    };
    Car.prototype.notify = function (scoreCounter) {
        this.xSpeed = 5 + scoreCounter / 10;
    };
    return Car;
}(GameObject));
var Driving = (function () {
    function Driving(c) {
        this.car = c;
    }
    Driving.prototype.move = function () {
        if (this.car.ySpeed == 2) {
            this.car.ySpeedCounter++;
            if (this.car.ySpeedCounter == 2) {
                this.car.ySpeed = -2;
                this.car.ySpeedCounter = 0;
            }
        }
        else {
            this.car.ySpeedCounter++;
            if (this.car.ySpeedCounter == 2) {
                this.car.ySpeed = 2;
                this.car.ySpeedCounter = 0;
            }
        }
        if (this.car.moveDirection == "right") {
            if (this.car.x < document.getElementById("container").clientWidth - this.car.width) {
                this.moveRight();
            }
            if (this.car.x >= document.getElementById("container").clientWidth - this.car.width) {
                this.car.moveDirection = "left";
            }
        }
        if (this.car.moveDirection == "left") {
            if (this.car.x > 0) {
                this.moveLeft();
            }
            if (this.car.x <= 0) {
                this.car.moveDirection = "right";
            }
        }
    };
    Driving.prototype.moveRight = function () {
        this.car.x += this.car.xSpeed;
        this.car.y += this.car.ySpeed;
        this.car.div.style.transform = "translate(" + this.car.x + "px, " + this.car.y + "px) scaleX(1)";
    };
    Driving.prototype.moveLeft = function () {
        this.car.x -= this.car.xSpeed;
        this.car.y += this.car.ySpeed;
        this.car.div.style.transform = "translate(" + this.car.x + "px, " + this.car.y + "px) scaleX(-1)";
    };
    return Driving;
}());
var Fish = (function (_super) {
    __extends(Fish, _super);
    function Fish(s) {
        var _this = _super.call(this, "fish", document.getElementById("container"), 65, 55, 5, 520, 2, 10) || this;
        _this.gravity = 1;
        _this.jumping = false;
        _this.ySpeed = Math.floor(Math.random() * Math.floor(4));
        s.subscribe(_this);
        return _this;
    }
    Fish.prototype.move = function (bobX) {
        if (this.x < document.getElementById("container").clientWidth - this.width) {
            if (this.jumping == false) {
                this.ySpeed = 10;
                this.y -= this.ySpeed;
                this.jumping = true;
            }
            if (this.jumping == true) {
                this.y -= this.ySpeed;
                this.ySpeed -= this.gravity;
            }
            if (this.y >= 520) {
                this.jumping = false;
            }
            if (this.x + this.width / 2 <= bobX) {
                this.x += this.xSpeed;
                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
            }
            if (this.x + this.width / 2 >= bobX) {
                this.x -= this.xSpeed;
                this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
            }
        }
    };
    Fish.prototype.notify = function (scoreCounter) {
    };
    return Fish;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.bob = new Bob();
        this.score = new Score();
        this.car = new Car(this.score);
        this.stormtrooper = new Stormtrooper();
        this.laser = new Laser(this.score);
        this.fish = new Fish(this.score);
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bob.move();
        this.car.move();
        this.laser.move();
        this.fish.move(this.bob.x + this.bob.width / 2);
        if (Utilities.checkCollision(this.bob, this.car)) {
            this.score.countScore("collision");
            this.car.carBehaviour = new Turbo(this.car);
        }
        if (Utilities.checkCollision(this.bob, this.laser)) {
            this.score.countScore("collision");
        }
        if (Utilities.checkCollision(this.bob, this.fish)) {
            this.score.countScore("collision");
        }
        if (this.score.scoreCounter != 100 && this.score.scoreCounter < 100) {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.endGame = function () {
        console.log("Bob died! :(");
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            this.instance = new Game();
        }
        return Game.instance;
    };
    return Game;
}());
var Jumping = (function () {
    function Jumping(b) {
        this.bob = b;
    }
    Jumping.prototype.move = function () {
        if (this.bob.jumping == false) {
            this.bob.ySpeed = 20;
            this.bob.jumping = true;
        }
        if (this.bob.jumping == true) {
            this.bob.y -= this.bob.ySpeed;
            this.bob.ySpeed -= this.bob.gravity;
            if (this.bob.y >= 500) {
                this.bob.jumping = false;
                this.bob.behaviour = new Running(this.bob);
            }
        }
        if (this.bob.movingLeft == true) {
            if (this.bob.x <= 0) {
                this.bob.movingLeft = false;
            }
            else {
                this.bob.xSpeed = 5;
            }
        }
        else if (this.bob.movingRight == true) {
            if (this.bob.x >= document.getElementById("container").clientWidth - this.bob.width) {
                this.bob.movingRight = false;
            }
            else {
                this.bob.xSpeed = -5;
            }
        }
        else {
            this.bob.xSpeed = 0;
        }
        this.bob.x -= this.bob.xSpeed;
    };
    return Jumping;
}());
var Keyboard = (function () {
    function Keyboard(b) {
        var _this = this;
        this.upKey = 38;
        this.leftKey = 37;
        this.rightKey = 39;
        this.b = 66;
        this.o = 79;
        this.rightKeyPressed = false;
        this.leftKeyPressed = false;
        this.bob = b;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Keyboard.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                if (this.bob.jumping == false) {
                    this.bob.behaviour = new Jumping(this.bob);
                }
                break;
            case this.leftKey:
                if (this.rightKeyPressed == true) {
                    this.bob.movingLeft = false;
                    this.bob.movingRight = false;
                    this.leftKeyPressed = true;
                }
                else {
                    this.bob.movingLeft = true;
                    this.bob.movingRight = false;
                    this.bob.facingLeft = true;
                    this.leftKeyPressed = true;
                }
                break;
            case this.rightKey:
                if (this.leftKeyPressed == true) {
                    this.bob.movingLeft = false;
                    this.bob.movingRight = false;
                    this.rightKeyPressed = true;
                }
                else {
                    this.bob.movingLeft = false;
                    this.bob.movingRight = true;
                    this.bob.facingLeft = false;
                    this.rightKeyPressed = true;
                }
                break;
            case this.b:
                if (this.bob.finalForm == "" || this.bob.finalForm == "bo")
                    this.bob.finalForm += "b";
                break;
            case this.o:
                if (this.bob.finalForm == "b")
                    this.bob.finalForm += "o";
                break;
        }
    };
    Keyboard.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                break;
            case this.leftKey:
                if (this.rightKeyPressed == true) {
                    this.bob.movingLeft = false;
                    this.bob.movingRight = true;
                    this.bob.facingLeft = false;
                    this.leftKeyPressed = false;
                }
                else {
                    this.bob.movingLeft = false;
                    this.bob.movingRight = false;
                    this.leftKeyPressed = false;
                }
                break;
            case this.rightKey:
                if (this.leftKeyPressed == true) {
                    this.bob.movingLeft = true;
                    this.bob.movingRight = false;
                    this.bob.facingLeft = true;
                    this.rightKeyPressed = false;
                }
                else {
                    this.bob.movingLeft = false;
                    this.bob.movingRight = false;
                    this.rightKeyPressed = false;
                }
                break;
            case this.b:
                if (this.bob.finalForm == "bob")
                    this.bob.transform();
                break;
        }
    };
    return Keyboard;
}());
var Laser = (function (_super) {
    __extends(Laser, _super);
    function Laser(s) {
        var _this = _super.call(this, "laser", document.getElementById("container"), 5, 20, 70, 445, 10, 0) || this;
        _this.ySpeed = Math.floor(Math.random() * Math.floor(4));
        s.subscribe(_this);
        return _this;
    }
    Laser.prototype.move = function () {
        if (this.x < document.getElementById("container").clientWidth - this.width) {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
            if (this.x >= document.getElementById("container").clientWidth - this.width) {
                this.x = 70;
                this.y = 445;
                this.ySpeed = Math.floor(Math.random() * Math.floor(4));
            }
        }
    };
    Laser.prototype.notify = function (scoreCounter) {
        this.xSpeed = 10 + scoreCounter / 10;
    };
    return Laser;
}(GameObject));
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Running = (function () {
    function Running(b) {
        this.bob = b;
    }
    Running.prototype.move = function () {
        if (this.bob.movingLeft == true) {
            if (this.bob.x <= 0) {
                this.bob.movingLeft = false;
            }
            else {
                this.bob.xSpeed = 5;
            }
        }
        else if (this.bob.movingRight == true) {
            if (this.bob.x >= document.getElementById("container").clientWidth - this.bob.width) {
                this.bob.movingRight = false;
            }
            else {
                this.bob.xSpeed = -5;
            }
        }
        else {
            this.bob.xSpeed = 0;
        }
        this.bob.x -= this.bob.xSpeed;
    };
    return Running;
}());
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super.call(this, "score", document.getElementById("container"), 0, 0, 0, 0, 0, 0) || this;
        _this.observers = [];
        _this.scoreCounter = 0;
        var scoreElement = document.getElementsByTagName("score")[0];
        scoreElement.innerHTML = "Survive Bob's nightmare! " + _this.scoreCounter + "%";
        _this.countScore();
        return _this;
    }
    Score.prototype.countScore = function (collision) {
        if (collision == "collision") {
            this.scoreCounter = this.scoreCounter - 0.3;
            this.scoreCounter = Math.round(this.scoreCounter * 10) / 10;
            if (this.scoreCounter <= 0) {
                this.scoreCounter = 0;
            }
            for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
                var o = _a[_i];
                o.notify(this.scoreCounter);
            }
        }
        else {
            var score = this;
            var scoreElement_1 = document.getElementsByTagName("score")[0];
            setInterval(function () {
                score.scoreCounter++;
                scoreElement_1.innerHTML = "Survive Bob's nightmare! " + score.scoreCounter + "%";
                if (score.scoreCounter >= 100) {
                    score.scoreCounter = 100;
                    scoreElement_1.innerHTML = "Bob woke up!";
                }
                for (var _i = 0, _a = score.observers; _i < _a.length; _i++) {
                    var o = _a[_i];
                    o.notify(score.scoreCounter);
                }
            }, 500);
        }
    };
    Score.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Score.prototype.unsubscribe = function (o) {
        var index = this.observers.indexOf(o, 0);
        this.observers.splice(index, 1);
    };
    return Score;
}(GameObject));
var Stormtrooper = (function (_super) {
    __extends(Stormtrooper, _super);
    function Stormtrooper() {
        return _super.call(this, "stormtrooper", document.getElementById("container"), 60, 149, 10, 420, 0, 0) || this;
    }
    return Stormtrooper;
}(GameObject));
var Turbo = (function () {
    function Turbo(c) {
        this.car = c;
    }
    Turbo.prototype.move = function () {
        if (this.car.ySpeed == 2) {
            this.car.ySpeedCounter++;
            if (this.car.ySpeedCounter == 2) {
                this.car.ySpeed = -2;
                this.car.ySpeedCounter = 0;
            }
        }
        else {
            this.car.ySpeedCounter++;
            if (this.car.ySpeedCounter == 2) {
                this.car.ySpeed = 2;
                this.car.ySpeedCounter = 0;
            }
        }
        if (this.car.moveDirection == "right") {
            if (this.car.x < document.getElementById("container").clientWidth - this.car.width) {
                this.turboRight();
            }
            if (this.car.x >= document.getElementById("container").clientWidth - this.car.width) {
                this.car.moveDirection = "left";
                this.car.carBehaviour = new Driving(this.car);
            }
        }
        if (this.car.moveDirection == "left") {
            if (this.car.x > 0) {
                this.turboLeft();
            }
            if (this.car.x <= 0) {
                this.car.moveDirection = "right";
                this.car.carBehaviour = new Driving(this.car);
            }
        }
    };
    Turbo.prototype.turboRight = function () {
        this.car.xSpeed = 15;
        this.car.x += this.car.xSpeed;
        this.car.y += this.car.ySpeed;
        this.car.div.style.transform = "translate(" + this.car.x + "px, " + (this.car.y + -30) + "px) scaleX(1) rotate(-45deg)";
    };
    Turbo.prototype.turboLeft = function () {
        this.car.xSpeed = 15;
        this.car.x -= this.car.xSpeed;
        this.car.y += this.car.ySpeed;
        this.car.div.style.transform = "translate(" + this.car.x + "px, " + (this.car.y + -30) + "px) scaleX(-1) rotate(-45deg)";
    };
    return Turbo;
}());
var Utilities = (function () {
    function Utilities() {
    }
    Utilities.checkCollision = function (a, b) {
        return (a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.height + a.y > b.y);
    };
    return Utilities;
}());
//# sourceMappingURL=main.js.map