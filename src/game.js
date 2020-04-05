/**
 * 
 * Game logic
 * 
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */
let squares = [
  false, false, false,
  false, false, false,
  false, false, false,
];

const MARK_X = 'X';
const MARK_O = 'O';

let message = {
  empty: '',
  yourTurn: "turn GO!",
  enemyTurn: "Enemy turn!",
  winner: "You Win!",
  loser: "You Lose, HaHaHa!!",
  draw: "Its A draw Noobs"
}

let currentPlayer;
let humanMark;
let computerMark;
let levelGame;
let isRunning;

let elementGame = document.querySelector("#board");
const elementMsg = document.querySelector("#message");

const isYourTurn = () => {
  return (currentPlayer === humanMark)
}

const winner = () => {
  return (
    // horizontais
    onSquareMark(0) && onSquareMark(1) && onSquareMark(2) ||
    onSquareMark(3) && onSquareMark(4) && onSquareMark(5) ||
    onSquareMark(6) && onSquareMark(7) && onSquareMark(9) ||

    // verticais
    onSquareMark(0) && onSquareMark(3) && onSquareMark(6) ||
    onSquareMark(1) && onSquareMark(4) && onSquareMark(7) ||
    onSquareMark(2) && onSquareMark(5) && onSquareMark(8) ||

    // diagonais
    onSquareMark(2) && onSquareMark(4) && onSquareMark(6) ||
    onSquareMark(0) && onSquareMark(4) && onSquareMark(8)
  )
}

const hasAWinner = () => {
  if (winner())
    return displayWinLoserMsg(
      elementMsg,
      humanMark,
      currentPlayer
    );

  if (isFullBoard())
    return displayMsg(
      elementMsg,
      message.draw
    );
  return false;
}

const changeTurn = () => {
  currentPlayer = currentPlayer === MARK_X ? MARK_O : MARK_X;
}

const clearBoard = () => {
  elementGame.innerHTML = '';
}

const move = (pos) => {
  squares[pos] = currentPlayer;
  refreshBoard();
  if (hasAWinner()) {
    isRunning = false;
    update();
    return;
  }
  changeTurn();
  update();
  computerMove();
}

const playerMove = (pos) => {
  if (isYourTurn() && squares[pos] === false) {
    move(pos);
  }
}

const computerMove = () => {
  if (!isYourTurn()) {
    move(getMoveIA());
  }
}

const onSquareMark = (index) => {
  return squares[index] === currentPlayer
}

const isFullBoard = () => {
  return squares.filter(square => square === false).length === 0
}

const drawBoard = () => {
  squares.forEach((e, i) => {
    elementGame.innerHTML +=
      `<div
            class="block" 
            id="square-${i}"
            onClick="${isRunning ? `playerMove(${i})` : ''}"
          >${(squares[i]) || ''}
          </div>`;

    if ([MARK_O, MARK_X].includes(e)) {
      document.getElementById("square-" + i).classList.add("marked");
    }
  });
}

const refreshBoard = () => {
  clearBoard();
  drawBoard();
}

const update = () => {
  refreshBoard();
  if (hasAWinner()) return;
  if (isYourTurn()) {
    displayMsg(elementMsg, message.yourTurn);
  } else {
    displayMsg(elementMsg, message.enemyTurn);
  }
}

const setLevelGame = (level) => {
  levelGame = level;
  document.getElementById("level").style.display = "none";
  document.getElementById("board").style.display = "grid";

  if (levelGame === 'medium') {
    humanMark = MARK_X;
    computerMark = MARK_O;
    currentPlayer = humanMark;
  } else {
    humanMark = MARK_O;
    computerMark = MARK_X;
    currenlayer = computerMark;
  }

  isRunning = true;
  if (!isYourTurn()) {
    displayMsg(elementMsg, message.enemyTurn);
    squares[getMoveIA()] = currentPlayer;
    changeTurn();
  }
  update();
}

const resetBoard = () => {
  squares = squares.map(t => false);
  document.getElementById("level").style.display = "block";
  document.getElementById("board").style.display = "";
  elementMsg.innerHTML = message.empty;
  levelGame = '';
  isRunning = false;
  message = {
    empty: '',
    yourTurn: "turn GO!",
    enemyTurn: "Enemy turn GO!",
    winner: "You Win!",
    loser: "You Lose, HaHaHa!!",
    draw: "Its A draw Noobs"
  }
}
