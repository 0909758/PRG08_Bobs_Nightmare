var Bob = (function () {
    function Bob() {
        this.x = 650;
        this.y = 500;
        this.runningSpeed = 0;
        this.jumpingSpeed = 0;
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
        this.bob.y -= this.bob.jumpingSpeed;
    };
    return Jumping;
}());
var Keyboard = (function () {
    function Keyboard(b) {
        var _this = this;
        this.bob = b;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Keyboard.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 38:
                console.log("Up key is pressed");
                break;
            case 37:
                console.log("Left key is pressed");
                this.bob.runningSpeed = 5;
                break;
            case 39:
                console.log("Right key is pressed");
                this.bob.runningSpeed = -5;
                break;
        }
    };
    Keyboard.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case 38:
                console.log("Up key is pressed");
                break;
            case 37:
                console.log("Left key is pressed");
                this.bob.runningSpeed = 0;
                break;
            case 39:
                console.log("Right key is pressed");
                this.bob.runningSpeed = 0;
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
        this.bob.x -= this.bob.runningSpeed;
    };
    return Running;
}());
//# sourceMappingURL=main.js.map