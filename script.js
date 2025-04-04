const mazeData = [
  "###### ######",
  "# 5 #   3   #",
  "# # # ##### #",
  "# #   ##### #",
  "# # # # 2 # #",
  "# #######   #",
  "# # # 7 ### #",
  "### # # #   #",
  "#   ###  9###",
  "# ### # ### #",
  "# #   # 6 # #",
  "# # # ### # #",
  "#   # 4   G #"
];

const maze = document.getElementById('maze');
let playerX = 1, playerY = 1;

function drawMaze() {
  maze.innerHTML = '';
  for (let y = 0; y < mazeData.length; y++) {
    for (let x = 0; x < mazeData[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (mazeData[y][x] === '#') {
        cell.classList.add('wall');
      } else if (mazeData[y][x] === 'G') {
        cell.classList.add('goal');
      } else if (!isNaN(parseInt(mazeData[y][x]))) {
        cell.textContent = mazeData[y][x]; // Display numbers
        cell.classList.add('number');
      }

      if (x === playerX && y === playerY) {
        cell.classList.add('player');
      }

      maze.appendChild(cell);
    }
  }
}

function move(dx, dy) {
  const newX = playerX + dx;
  const newY = playerY + dy;

  if (mazeData[newY][newX] !== '#') {
    playerX = newX;
    playerY = newY;
    drawMaze();
    if (mazeData[playerY][playerX] === 'G') {
      alert('You Win! Now trace your steps and figure out the code!');
    }
  }
}

// Swipe Controls for Mobile
let touchStartX = 0, touchStartY = 0;

document.addEventListener("touchstart", function(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});

document.addEventListener("touchend", function(e) {
  let touchEndX = e.changedTouches[0].clientX;
  let touchEndY = e.changedTouches[0].clientY;

  let dx = touchEndX - touchStartX;
  let dy = touchEndY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy)) {
    if (dx > 50) move(1, 0);  // Right swipe
    else if (dx < -50) move(-1, 0); // Left swipe
  } else {
    if (dy > 50) move(0, 1); // Down swipe
    else if (dy < -50) move(0, -1); // Up swipe
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') move(0, -1);
  if (e.key === 'ArrowDown') move(0, 1);
  if (e.key === 'ArrowLeft') move(-1, 0);
  if (e.key === 'ArrowRight') move(1, 0);
});

drawMaze();
