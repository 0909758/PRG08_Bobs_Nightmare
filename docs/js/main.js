var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        _super.call(this, "bob", document.getElementById("container"), 55, 66, 650, 500, 0, 0);
        this.gravity = 1;
        this.jumping = false;
        this.facingLeft = true;
        this.movingLeft = false;
        this.movingRight = false;
        this.finalForm = "";
        this.behaviour = new Running(this);
    }
    Bob.prototype.move = function () {
        if (this.facingLeft == true) {
            this.behaviour.move();
            this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
        }
        else {
            this.behaviour.move();
            this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
        }
        console.log(this.finalForm);
    };
    Bob.prototype.die = function () {
        var g = Game.getInstance();
        g.endGame();
    };
    return Bob;
}(GameObject));
var Car = (function (_super) {
    __extends(Car, _super);
    function Car() {
        _super.call(this, "car", document.getElementById("container"), 145, 50, 25, 520, 0, 0);
    }
    return Car;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.bob = new Bob();
        this.car = new Car();
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bob.move();
        if (Utilities.checkCollision(this.bob, this.car)) {
            console.log("Collision!");
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
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
            this.bob.xSpeed = 5;
        }
        else if (this.bob.movingRight == true) {
            this.bob.xSpeed = -5;
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
                console.log('b pressed');
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
        }
    };
    return Keyboard;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Running = (function () {
    function Running(b) {
        this.bob = b;
    }
    Running.prototype.move = function () {
        if (this.bob.movingLeft == true) {
            this.bob.xSpeed = 5;
        }
        else if (this.bob.movingRight == true) {
            this.bob.xSpeed = -5;
        }
        else {
            this.bob.xSpeed = 0;
        }
        this.bob.x -= this.bob.xSpeed;
    };
    return Running;
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