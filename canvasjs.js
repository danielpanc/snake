/*global document:false*/
/*global window:false*/
var canvas, context, scorecanvas, scorecontext, oldx, oldy, snake, poz, oldpoz, step, size, sizePoz, contor, x, y, dir, direction, timmer,
    food, foodX, foodY, nbfood, score, tv;

canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');
scorecanvas = document.getElementById("scoreCanvas");
scorecontext = scorecanvas.getContext('2d');
oldx = 100;
oldy = 100;
snake = [];
snake[0] = oldx;
snake[1] = oldy;
poz = 2; //pozitia curenta a sirului de puncte cheie
oldpoz = 0;

step = 5;
size = 50;
sizePoz = 20;
contor = 0;

x = oldx + step;
y = 100;

dir = "right";
direction = "none";

timmer = 0;

food = "false";

foodX = 0;
foodY = 0;

nbfood = 0;

score = 0;

tv = 5;


function getMousePos(canvas, evt) {
    "use strict";
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
canvas.addEventListener('mousemove', function (evt) {
    "use strict";
    var mousePos, message;
    mousePos = getMousePos(canvas, evt);
    message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
    //alert(mousePos.x);
    /*scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
    writeMessage(scorecanvas,message);
    */
}, false);


window.requestAnimFrame = (function () {
    "use strict";
    /*global window:false*/
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
}());

function writeMessage(canvas, message) {
    "use strict";
    var context = canvas.getContext('2d');
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}

writeMessage(scorecanvas, "Score: " + score);

//0 1   2 3
//2 4

context.beginPath();
context.moveTo(oldx, oldy);
context.lineWidth = 15;
context.strokeStyle = "#ff2277";

context.lineTo(x, y);
context.stroke();
context.closePath();

snake[poz] = x;
snake[poz + 1] = y;
poz = poz + 2;

var changePoz = function (direction) {
    "use strict";
    if (dir !== direction) {
        dir = direction;//chenging direction
    }

    snake[poz] = x;
    snake[poz + 1] = y;
    poz = poz + 2;

    if (contor === sizePoz) {
        context.beginPath();
        context.moveTo(snake[oldpoz], snake[oldpoz + 1]);
        context.lineWidth = 16;
        context.strokeStyle = "#ffffff";
        oldpoz = oldpoz + 2;
        context.lineTo(snake[oldpoz], snake[oldpoz + 1]);
        context.stroke();
        context.closePath();
        //--
        snake.shift();
        snake.shift();
        poz = poz - 2;
        oldpoz = oldpoz - 2;
    } else {
        contor += 1;
    }
};

var putFood = function () {
    "use strict";
    foodX = Math.floor((Math.random() * (canvas.width - 5)) + 1);
    foodY = Math.floor((Math.random() * (canvas.height - 5)) + 1);

    context.beginPath();
    context.moveTo(foodX, foodY);
    context.lineWidth = 5;
    context.strokeStyle = "#ff00ff";
    context.lineTo(foodX + 5, foodY + 5);
    context.stroke();
    context.closePath();

};

var init = function () {
    "use strict";
    context.clearRect(0, 0, canvas.width, canvas.height);
    oldx = 100;
    oldy = 100;
    x = oldx + step;
    y = 100;
    food = "false";
    nbfood = 0;
    timmer = 0;
    snake = [];
    snake[0] = oldx;
    snake[1] = oldy;
    poz = 2;
    oldpoz = 0;
    contor = 0;
    size = 50;
    step = 5;
    sizePoz = 20;
    direction = "none";
    score = 0;
    tv = 5;

    context.beginPath();
    context.moveTo(oldx, oldy);
    context.lineWidth = 15;
    context.strokeStyle = "#ff2277";

    context.lineTo(x, y);
    context.stroke();
    context.closePath();

    snake[poz] = x;
    snake[poz + 1] = y;
    poz = poz + 2;
};

var go = function (startTime) {
    "use strict";
    var i, len;
    len = snake.length;
    /*global document:false*/
    //var time = (new Date()).getTime() - startTime;
    if (food === "false") {
        putFood();
        food = "true";
    }

    if (timmer === tv) {
        timmer = 0;
    }

    if (timmer === 0) {
        if (direction === "left") {
            x = x - step;
            changePoz(direction);
        } else if (direction === "right") {
            x = x + step;
            changePoz(direction);
        } else if (direction === "up") {
            y = y - step;
            changePoz(direction);
        } else if (direction === "down") {
            y = y + step;
            changePoz(direction);
        }


        for (i = 0; i <= len - 19; i += 2) {
            if (((x > (snake[i] - 1)) && (x < (snake[i] + 1)) && (y > (snake[i + 1] - 1)) && (y < (snake[i + 1] + 1))) ||
                    (x <= 0) || (y <= 0) || (x >= canvas.width) || (y >= canvas.height)) {
                //alert("Game Over!  Your score: "+score);
                document.getElementById('form').style.display = "block";
                document.getElementById('in').value = "                                                                                                                                   " + score;
                //context.clearRect(0, 0, canvas.width, canvas.height);
                init();

            }
        }
        context.beginPath();
        context.moveTo(snake[poz - 4], snake[poz - 3]);
        context.lineWidth = 15;
        context.strokeStyle = "#ff2277";
        context.lineTo(snake[poz - 2], snake[poz - 1]);
        context.stroke();
        context.closePath();

        if ((foodX > (x - 16)) && (foodX < (x + 16)) && (foodY > (y - 12)) && (foodY < (y + 12))) {
            food = "false";

            context.beginPath();
            context.moveTo(foodX - 1, foodY - 1);
            context.lineWidth = 7;
            context.strokeStyle = "#ffffff";
            context.lineTo(foodX + 6, foodY + 6);
            context.stroke();
            context.closePath();

            sizePoz = sizePoz + 10;

            nbfood += 1;

            if (((nbfood % 3) === 0) && (tv >= 2)) {
                tv -= 1;
            }

            score = score + 10;
            scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
            writeMessage(scorecanvas, "Score: " + score);
        }
    }
    timmer += 1;

    window.requestAnimFrame(function () {
        go(startTime);
    });
};

document.addEventListener('keydown', function (e) {
    "use strict";
    scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
    writeMessage(scorecanvas, "Score: " + score);
    switch (e.keyCode) {
    case 37:
        //go("left",step);
        if (direction !== "right") {
            direction = "left";
        }
            //go();
        break;

    case 38:
        //go("up",step);
        if (direction !== "down") {
            direction = "up";
        }
        //go();
        break;

    case 39:
        //go("right",step);
        if (direction !== "left") {
            direction = "right";
        }
        //go();
        break;

    case 40:
        //go("down",step);
        if (direction !== "up") {
            direction = "down";
        }
        //go();
        break;

    default:
        direction = "none";
        scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
        writeMessage(scorecanvas, "Pause");
    }
});

window.setTimeout(function () {
    "use strict";
    var startTime = (new Date()).getTime();
    go(startTime);
}, 1000);