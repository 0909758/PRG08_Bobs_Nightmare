var Bob = (function () {
    function Bob() {
        this.x = 650;
        this.y = 500;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.gravity = 1;
        this.inAir = false;
        var container = document.getElementById("container");
        this.div = document.createElement("bob");
        container.appendChild(this.div);
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        this.behaviour = new Running(this);
    }
    Bob.prototype.move = function () {
        this.behaviour.move();
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Bob;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.bob = new Bob();
        this.keyboard = new Keyboard(this.bob);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.bob.move();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
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
                console.log("Up key is pressed");
                if (this.bob.inAir == false) {
                    this.bob.ySpeed = 20;
                    this.bob.behaviour = new Jumping(this.bob);
                    this.bob.inAir = true;
                }
                break;
            case this.leftKey:
                console.log("Left key is pressed");
                this.bob.xSpeed = 5;
                break;
            case this.rightKey:
                console.log("Right key is pressed");
                this.bob.xSpeed = -5;
                break;
        }
    };
    Keyboard.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.upKey:
                console.log("Up key is pressed");
                break;
            case this.leftKey:
                console.log("Left key is pressed");
                this.bob.xSpeed = 0;
                break;
            case this.rightKey:
                console.log("Right key is pressed");
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
//# sourceMappingURL=main.js.map