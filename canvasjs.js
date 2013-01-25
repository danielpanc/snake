var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var scorecanvas = document.getElementById("scoreCanvas");
var scorecontext = scorecanvas.getContext('2d');
var oldx = 100;
var oldy = 100;

snake = new Array();
snake[0] = oldx;
snake[1] = oldy;
var poz = 2; //pozitia curenta a sirului de puncte cheie
var oldpoz = 0;

var step = 5;
var size = 50;
var sizePoz = 20;
var contor = 0;

var x = oldx + size;
var y = 100;

var dir = "right";
var direction = "right";

var timmer = 0;

var food = "false";

var foodX = 0;
var foodY = 0;

var nbfood = 0;

var score = 0;

var tv = 5;


function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
canvas.addEventListener('mousemove', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
        //alert(mousePos.x);
        /*scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
		writeMessage(scorecanvas,message);
		*/
      }, false);


      window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();





writeMessage(scorecanvas, "Score: " + score);

//0 1   2 3
//2 4

context.beginPath();
context.moveTo(oldx, oldy);
context.lineWidth = 15;
context.strokeStyle = "#ff2277";

context.lineTo(x,y);
context.stroke();
context.closePath();

snake[poz] = x;
snake[poz + 1] = y;
poz = poz + 2;

var changePoz=function(direction){
	if (dir !== direction){ 
			dir = direction;//chenging direction
		}

	snake[poz] = x;
	snake[poz + 1] = y;
	poz = poz + 2;

	if (contor === sizePoz){
		context.beginPath();
		context.moveTo(snake[oldpoz],snake[oldpoz + 1]);
		context.lineWidth = 16;
		context.strokeStyle="#ffffff";
		oldpoz = oldpoz + 2;
		context.lineTo(snake[oldpoz],snake[oldpoz + 1]);
		context.stroke();
		context.closePath();
		//--
		
		snake.shift();
		snake.shift();
		poz = poz - 2;
		oldpoz = oldpoz - 2;
		
		
	}
	else {
		contor++;
	}
}


 function writeMessage(canvas, message) {
        var context = canvas.getContext('2d');
        //context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }



var putFood=function(){
	foodX=Math.floor((Math.random()*(canvas.width-5))+1); 
	foodY=Math.floor((Math.random()*(canvas.height-5))+1);

	context.beginPath();
	context.moveTo(foodX,foodY);
	context.lineWidth = 5;
	context.strokeStyle = "#ff00ff";
	context.lineTo(foodX + 5,foodY + 5);
	context.stroke();
	context.closePath();	

}	

var go = function(startTime){
	//var time = (new Date()).getTime() - startTime;
	if (food === "false")
	{
		putFood();
		food = "true";
	}



	if (timmer == tv){ timmer = 0; }

if (timmer === 0){
	if (direction === "left") {
		x = x - step;
		changePoz(direction);
	}

	if (direction === "right"){
		x = x + step;
		changePoz(direction);
	}

	if (direction === "up") {
		y = y - step;
		changePoz(direction);
	}
		
	if (direction === "down"){
		y = y + step;
		changePoz(direction);
	}		


	for (var i = 0;i <= snake.length - 19;i += 2){
		if ((x > (snake[i] - 1)) && (x < (snake[i] + 1)) &&(y > (snake[i+1] - 1)) && (y < (snake[i+1] + 1))) {
			alert("Game Over!  Your score: "+score);
			
		}
	}
	context.beginPath();
	context.moveTo(snake[poz - 4],snake[poz - 3]);
	context.lineWidth = 15;
	context.strokeStyle = "#ff2277";
	context.lineTo(snake[poz-2], snake[poz-1]);
	context.stroke();
	context.closePath();

	if ((foodX > (x - 16)) && (foodX < (x + 16)) && (foodY > (y-12)) && (foodY < (y+12))) {
		food="false";

		context.beginPath();
		context.moveTo(foodX-1,foodY-1);
		context.lineWidth = 7;
		context.strokeStyle = "#ffffff";
		context.lineTo(foodX+6,foodY+6);
		context.stroke();
		context.closePath();

		sizePoz = sizePoz+10;

		nbfood++;

		if (((nbfood % 3) === 0) && (tv >= 2)) {
			tv--;;
		}

		score = score+10;
		scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
		writeMessage(scorecanvas, "Score: "+score);
	}
}
	timmer++;

	requestAnimFrame(function() {
          go(startTime);
    });
    


}

document.addEventListener('keydown',function(e){
	scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
		writeMessage(scorecanvas, "Score: "+score);
	 switch(e.keyCode){
	 	case 37:
	 		//go("left",step);
	 		if (direction !== "right"){
	 			direction = "left";
	 		}
	 		//go();
	 	break;

	 	case 38:
	 		//go("up",step);
	 		if (direction !== "down"){
	 			direction = "up";
	 		}
	 		//go();
	 	break;

	 	case 39:
	 		//go("right",step);
	 		if (direction !== "left"){
	 			direction = "right";
	 		}
	 		//go();
	 	break;

	 	case 40:
	 		//go("down",step);
	 		if (direction !== "up"){
	 			direction = "down";
	 		}
	 		//go();
	 	break;

	 	default:
	 	direction="none";
	 	scorecontext.clearRect(0, 0, scorecanvas.width, scorecanvas.height);
		writeMessage(scorecanvas, "Pause");
	 }
});

setTimeout(function() {
        var startTime = (new Date()).getTime();
        go(startTime);
      }, 1000);