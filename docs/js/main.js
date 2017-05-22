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
        _this.inAir = false;
        _this.behaviour = new Running(_this);
        return _this;
    }
    Bob.prototype.move = function () {
        this.behaviour.move();
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
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
        return _super.call(this, "car", document.getElementById("container"), 145, 50, 25, 520, 0, 0) || this;
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
        this.bob.y -= this.bob.ySpeed;
        this.bob.x -= this.bob.xSpeed;
        this.bob.ySpeed -= this.bob.gravity;
        if (this.bob.y >= 500) {
            this.bob.behaviour = new Running(this.bob);
            this.bob.inAir = false;
        }
    };
    return Jumping;
}());
var Keyboard = (function () {
    function Keyboard(b) {
        var _this = this;
        this.upKey = 38;
        this.leftKey = 37;
        this.rightKey = 39;
        this.bob = b;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Keyboard.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                if (this.bob.inAir == false) {
                    this.bob.ySpeed = 20;
                    this.bob.behaviour = new Jumping(this.bob);
                    this.bob.inAir = true;
                }
                break;
            case this.leftKey:
                this.bob.xSpeed = 5;
                break;
            case this.rightKey:
                this.bob.xSpeed = -5;
                break;
        }
    };
    Keyboard.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                break;
            case this.leftKey:
                this.bob.xSpeed = 0;
                break;
            case this.rightKey:
                this.bob.xSpeed = 0;
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