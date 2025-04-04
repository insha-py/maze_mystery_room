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
  "#   # 4     #"
];

const maze = document.getElementById('maze');
let playerX = 1, playerY = 1;

function drawMaze() {
  maze.innerHTML = '';
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (mazeData[y][x] === '#') cell.classList.add('wall');
      if (x === playerX && y === playerY) cell.classList.add('player');
      if (mazeData[y][x] === 'G') cell.classList.add('goal');
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
      alert('You Win!');
    }
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp') move(0, -1);
  if (e.key === 'ArrowDown') move(0, 1);
  if (e.key === 'ArrowLeft') move(-1, 0);
  if (e.key === 'ArrowRight') move(1, 0);
});

drawMaze();

