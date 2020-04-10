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
  yourTurn: "It's your turn, GO!",
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
let player_name;

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
  setTimeout(() => computerMove(), 1000);
  
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
    displayMsgTurn(elementMsg, message.yourTurn, currentPlayer);
  } else {
    displayMsgTurn(elementMsg, message.enemyTurn, currentPlayer);
  }
}

const setLevelGame = (level) => {
  document.getElementById("message").innerHTML = "Select a Mark";
  levelGame = level;
  document.getElementById("choice").style.display = "block";
  document.getElementById("level").style.display = "none";
}

const setPlayerMark = (selectedMark) => {
  humanMark = selectedMark;
  computerMark = (humanMark === MARK_X)? MARK_O: MARK_X
  currentPlayer = MARK_X;

  console.log({humanMark, computerMark});
  document.getElementById("message").innerHTML = `Welcome ${player_name}`;
  document.getElementById("board").style.display = "grid";
  document.getElementById("choice").style.display = "none";

  isRunning = true;
  if (!isYourTurn()) {
    displayMsg(elementMsg, message.enemyTurn);
    squares[getMoveIA()] = currentPlayer;
    changeTurn();
  }
  update();
}


const setNamePlayer = () => {
  if(document.getElementById("name").value.length === 0) {
    return alert("Insert A name please! ;(");
  }
  document.getElementById("message").innerHTML = "Choice a level";
  document.getElementById("board").style.display = "";
  player_name = document.getElementById("name").value;
  document.getElementById("level").style.display = "block";
  document.getElementById("named").style.display = "none";
}

const resetBoard = () => {
  if(player_name.length === 0) return false;

  squares = squares.map(t => false);
  document.getElementById("level").style.display = "block";
  document.getElementById("board").style.display = "";
  elementMsg.innerHTML = message.empty;
  setNamePlayer();
  levelGame = '';
  isRunning = false;
  message = {
    empty: '',
    yourTurn: "It's your turn, GO!",
    enemyTurn: "Enemy turn!",
    winner: "You Win!",
    loser: "You Lose, HaHaHa!!",
    draw: "Its A draw Noobs"
  }
}
