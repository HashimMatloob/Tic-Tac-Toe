const WIN_PATTERNS = [
                        [0, 1, 2],
                        [3, 4, 5],
                        [6, 7, 8],
                        [0, 3, 6],
                        [1, 4, 7],
                        [2, 5, 8],
                        [0, 4, 8],
                        [2, 4, 6],
                     ];

let gameState = {
  board: Array(9).fill(""),
  currentPlayer: "O",
  gameActive: true,
  moveCount: 0,
};

const gameElements = {
  boxes: document.querySelectorAll(".box"),
  resetBtn: document.querySelector(".reset"),
  newGameBtn: document.querySelector(".newgame"),
  msgContainer: document.querySelector(".msg-container"),
  winnerMsg: document.querySelector("#msg"),
};

function initializeGame() {
  gameState.board = Array(9).fill("");
  gameState.currentPlayer = "O";
  gameState.gameActive = true;
  gameState.moveCount = 0;

  clearBoard();
  hideWinnerMessage();
  enableAllBoxes();
}

function clearBoard() {
  gameElements.boxes.forEach((box) => {
      box.innerText = "";
      box.style.color = "";
      box.style.textShadow = "";
      box.disabled = false;
  });
}

function enableAllBoxes() {
    gameElements.boxes.forEach((box) => {
    box.disabled = false;
  });
}

function disableAllBoxes() {
    gameElements.boxes.forEach((box) => {
    box.disabled = true;
  });
}

function makeMove(box, index) {
  if (!gameState.gameActive || gameState.board[index] !== "") {
    return;
  }

  gameState.board[index] = gameState.currentPlayer;
  gameState.moveCount++;

  box.innerText = gameState.currentPlayer;

  if (gameState.currentPlayer === "X") {
    box.style.color = "#e74c3c";
    box.style.textShadow = "0 2px 10px rgba(231, 76, 60, 0.3)";
  } else {
    box.style.color = "#3498db";
    box.style.textShadow = "0 2px 10px rgba(52, 152, 219, 0.3)";
  }

  box.disabled = true;

  if (checkWinner()) {
    handleGameWin();
  } else if (checkDraw()) {
    handleGameDraw();
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  gameState.currentPlayer = gameState.currentPlayer === "O" ? "X" : "O";
}

function checkWinner() {
  return WIN_PATTERNS.some((pattern) => {
      const [a, b, c] = pattern;
    return (
      gameState.board[a] !== "" &&
      gameState.board[a] === gameState.board[b] &&
      gameState.board[a] === gameState.board[c]
    );
  });
}

function checkDraw() {
  return gameState.moveCount === 9;
}

function handleGameWin() {
  gameState.gameActive = false;
  disableAllBoxes();
  showWinnerMessage(
    `Congratulations! Player ${gameState.currentPlayer} wins! 🎉`
  );
}

function handleGameDraw() {
  gameState.gameActive = false;
  showWinnerMessage("It's a draw! Well played! 🤝");
}

function showWinnerMessage(message) {
  gameElements.winnerMsg.innerText = message;
  gameElements.msgContainer.classList.remove("hide");
}

function hideWinnerMessage() {
  gameElements.msgContainer.classList.add("hide");
}

function attachEventListeners() {
  gameElements.boxes.forEach((box, index) => {
    box.addEventListener("click", () => makeMove(box, index));
  });

  gameElements.resetBtn.addEventListener("click", initializeGame);

  gameElements.newGameBtn.addEventListener("click", initializeGame);

  
  gameElements.boxes.forEach((box, index) => {
    box.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        makeMove(box, index);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  attachEventListeners();
  initializeGame();
});
