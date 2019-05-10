const $gameBoard = document.querySelector('.game-board');
const $snake = document.querySelector('.snake');
const $eggs = document.querySelector('.egg');
const $messageContainer = document.querySelector('.message-container');
const $scorebox = document.querySelector("#score-box");

$snake.y = 0;
$snake.x = 0;
$scorebox.innerHTML= ''
let points = 0;
let pos = {};
let snakePos ={};
let score = 0;


const grid = [
  {x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}, {x: 0, y: 4},
  {x: 0, y: 5}, {x: 0, y: 6}, {x: 0, y: 7}, {x: 0, y: 8}, {x: 0, y: 9},
  {x: 0, y: 10}, {x: 0, y: 11}, {x: 0, y: 12}, {x: 0, y: 13}, {x: 0, y: 14},
  {x: 0, y: 15}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3},
  {x: 1, y: 4}, {x: 1, y: 5}, {x: 1, y: 6}, {x: 1, y: 7}, {x: 1, y: 8}, {x: 1, y: 9},
  {x: 1, y: 10}, {x: 1, y: 11}, {x: 1, y: 12}, {x: 1, y: 13}, {x: 1, y: 14},
  {x: 1, y: 15}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 4}, {x: 2, y: 5},
  {x: 2, y: 6}, {x: 2, y: 7}, {x: 2, y: 8}, {x: 2, y: 9}, {x: 2, y: 10}, {x: 2, y: 11}, {x: 2, y: 12}, {x: 2, y: 13},
  {x: 2, y: 14}, {x: 2, y: 15}, {x: 3, y: 0}, {x: 3, y: 1}, {x: 3, y: 2}, {x: 3, y: 3}, {x: 3, y: 4}, {x: 3, y: 5},
  {x: 3, y: 6}, {x: 3, y: 7}, {x: 3, y: 8}, {x: 3, y: 9}, {x: 3, y: 10}, {x: 3, y: 11}, {x: 3, y: 12}, {x: 3, y: 13},
  {x: 3, y: 14}, {x: 3, y: 15}, {x: 4, y: 0}, {x: 4, y: 1}, {x: 4, y: 2}, {x: 4, y: 3}, {x: 4, y: 4}, {x: 4, y: 5},
  {x: 4, y: 6}, {x: 4, y: 7}, {x: 4, y: 8}, {x: 4, y: 9}, {x: 4, y: 10}, {x: 4, y: 11}, {x: 4, y: 12}, {x: 4, y: 13},
  {x: 4, y: 14}, {x: 4, y: 15}, {x: 5, y: 0}, {x: 5, y: 1}, {x: 5, y: 2}, {x: 5, y: 3}, {x: 5, y: 4}, {x: 5, y: 5},
  {x: 5, y: 6}, {x: 5, y: 7}, {x: 5, y: 8}, {x: 5, y: 9}, {x: 5, y: 10}, {x: 5, y: 11}, {x: 5, y: 12}, {x: 5, y: 13},
  {x: 5, y: 14}, {x: 5, y: 15}, {x: 6, y: 0}, {x: 6, y: 1}, {x: 6, y: 2}, {x: 6, y: 3}, {x: 6, y: 4}, {x: 6, y: 5},
  {x: 6, y: 6}, {x: 6, y: 7}, {x: 6, y: 8}, {x: 6, y: 9}, {x: 6, y: 10}, {x: 6, y: 11}, {x: 6, y: 12}, {x: 6, y: 13},
  {x: 6, y: 14}, {x: 6, y: 15}, {x: 7, y: 0}, {x: 7, y: 1}, {x: 7, y: 2}, {x: 7, y: 3}, {x: 7, y: 4}, {x: 7, y: 5},
  {x: 7, y: 6}, {x: 7, y: 7}, {x: 7, y: 8}, {x: 7, y: 9}, {x: 7, y: 10}, {x: 7, y: 11}, {x: 7, y: 12}, {x: 7, y: 13},
  {x: 7, y: 14}, {x: 7, y: 15}];


function renderField() {
    for (const field of grid) {
        const div = document.createElement('div');
        div.classList.add('grid');
        div.style.top = (field.x * 50).toString() + 'px';
        div.style.left = (field.y * 50).toString() + 'px';
        $gameBoard.append(div);
   }
}



function isCoordinateInGrid(x, y) {
  
  if (x < 0 || y < 0 || x > 15 || y > 7) {
    return false;
  }
  return true;
}
function gameOver(){
	if(confirm("Oops, you hit the edge. Game is Over! Replay?")){
		location.reload()
	}
}
function youWin(){
	if(confirm("The timer is up. You Win! Replay?")){
		location.reload()
	}
}

function canGoTo(x, y) {
  if(!isCoordinateInGrid(x, y)) {
    setTimeout(gameOver, 100)

  return false;
  }
  return true;
}



function collideEgg() {
	if (snakePos.x ===pos.x & snakePos.y ===pos.y) {
		eggPosition();
        $snake.innerHTML=points;
		points++;

		console.log(points);
		
	}
// console.log(snakePos.x,pos.x);
setTimeout(collideEgg,200);
}




function moveSnakeTo() {
	snakePos.x =($snake.x * 50).toString() + 'px';
	$snake.style.left =snakePos.x;

	snakePos.y = ($snake.y * 50).toString() + 'px';
	 $snake.style.top=snakePos.y;
  }  



function eggPosition() {
  // a number in increments of 50, limit: 600x200
  // randomEggLeft is a number between 0 and 400 and has to number % 50 === 0
  let randomHeightNum = Math.random() * 600;
  let randomEggLeftNum = Math.round(randomHeightNum/50)*50;
  pos.x = randomEggLeftNum.toString() + 'px';
  $eggs.style.left = pos.x

  // randomEggTop is a number between 0 and 800 and has to number % 50 === 0
  let randomEggWidthNum = Math.random() * 200;
  let randomEggTopNum = Math.round(randomEggWidthNum/50)*50;

  pos.y =randomEggTopNum.toString() + 'px';
  $eggs.style.top = pos.y;
}
setInterval(eggPosition,4200);


	document.body.addEventListener('keydown', (evnt) => {
		evnt.preventDefault();
		
		
  const keyCode = evnt.keyCode;
  if ([37, 38, 39, 40].includes(keyCode)) {
    evnt.preventDefault();
  switch (keyCode) {
    case 37:
      moveLeft();
      break;
    case 38:
      moveUp();
      break
    case 39:
      moveRight();
      break
    case 40:
      moveDown();
      break
  }
  }
});


function moveUp() {
  if (canGoTo($snake.x, $snake.y - 1)) {
    $snake.y -= 1;
    moveSnakeTo($snake.x, $snake.y)
  }
}
function moveDown() {
  if (canGoTo($snake.x, $snake.y + 1)) {
    $snake.y += 1;
    moveSnakeTo($snake.x, $snake.y);
  }
}
function moveLeft() {
  if (canGoTo($snake.x - 1, $snake.y)) {
    $snake.x -= 1;
    moveSnakeTo($snake.x, $snake.y);
  }
}
function moveRight() {
  if (canGoTo($snake.x + 1, $snake.y)) {
    $snake.x += 1;
    moveSnakeTo($snake.x, $snake.y);
  }
}



setTimeout(youWin, 25000)
collideEgg();
// eggPosition();
renderField();

