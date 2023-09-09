let currentPlayer = "X";
let gameOver = false;
let mode;
let xWinCount = 0;
let oWinCount = 0;

function startGame(selectedMode) {
  mode = selectedMode;
  document.querySelector("p").style.display = "none";
  document.querySelector("button").style.display = "none";
  document.getElementById("game").style.display = "block";
  createBoard();
}

function createBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.addEventListener("click", handleCellClick);
      board.appendChild(cell);
    }
  }
}

function resetGame() {
  resetBoard();
  gameOver = false;
  document.getElementById("message").textContent = "";
}

function resetBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
}

function updateScore() {
  document.getElementById("xWinCount").textContent = xWinCount;
  document.getElementById("oWinCount").textContent = oWinCount;
}

function handleCellClick(event) {
  if (gameOver) return;

  const cell = event.target;

  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    const winner = checkWinner();

    if (winner) {
      endGame(winner);
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (mode === 1 && currentPlayer === "O" && !gameOver) {
        makeComputerMove();
      }
    }
  }
}

function checkWinner() {
  const cells = document.querySelectorAll(".cell");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      return currentPlayer;
    }
  }

  if ([...cells].every((cell) => cell.textContent !== "")) {
    return "tie";
  }

  return null;
}

function endGame(winner) {
  document.getElementById("message").textContent =
    winner === "tie" ? "¡Empate!" : `¡El jugador ${winner} gana!`;

  if (winner === "X") {
    xWinCount++;
  } else if (winner === "O") {
    oWinCount++;
  }

  updateScore();
  gameOver = true;
}

function makeComputerMove() {
  const cells = document.querySelectorAll(".cell");
  const emptyCells = [...cells].filter((cell) => cell.textContent === "");

  if (emptyCells.length === 0 || gameOver) return;

  const bestMove = getBestMove([...cells], currentPlayer);
  const cellToPlay = emptyCells[bestMove];

  cellToPlay.textContent = currentPlayer;
  const winner = checkWinner();

  if (winner) {
    endGame(winner);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function getBestMove(cells, player) {
  let bestScore = -Infinity;
  let bestMove;

  cells.forEach((cell, index) => {
    if (cell.textContent === "") {
      cell.textContent = player;
      const score = minimax(cells, 0, false, player);
      cell.textContent = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
  });

  return bestMove;
}

function minimax(cells, depth, isMaximizing, player) {
  const scores = {
    X: -1,
    O: 1,
    tie: 0,
  };

  const winner = checkWinner();
  if (winner) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    cells.forEach((cell, index) => {
      if (cell.textContent === "") {
        cell.textContent = player;
        const score = minimax(cells, depth + 1, false, player);
        cell.textContent = "";
        bestScore = Math.max(score, bestScore);
      }
    });
    return bestScore;
  } else {
    let bestScore = Infinity;
    cells.forEach((cell, index) => {
      if (cell.textContent === "") {
        cell.textContent = player === "X" ? "O" : "X";
        const score = minimax(cells, depth + 1, true, player);
        cell.textContent = "";
        bestScore = Math.min(score, bestScore);
      }
    });
    return bestScore;
  }
}
