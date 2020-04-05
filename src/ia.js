const getMoveIA = () => {
  return hardMove();
}

const mediumMove = () => {
  return 0;
}

const hardMove = () => {
  const value = bestMove();
  return value;
}

const bestMove = () => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      squares[i] = computerMark;
      let score = minimax(squares, 0, false);
      squares[i] = false;
      if (score > bestScore) {
        bestScore = score;
        move = { i };
      }
    }
  }
  return move.i;
}

let scoresPossibility = {
  "X": 1,
  "O": -1,
  "tie": 0
};

const minimax = (boardGame, depth, isMaximizing) => {
  let result = winnerMiniMax(boardGame);
  if (result !== null) {
    return scoresPossibility[result]
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < boardGame.length; i++) {
      if (!boardGame[i]) {
        boardGame[i] = computerMark;
        let score = minimax(squares, depth + 1, false);
        boardGame[i] = false;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < boardGame.length; i++) {
      if (!boardGame[i]) {
        boardGame[i] = humanMark;
        let score = minimax(squares, depth + 1, true);
        boardGame[i] = false;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}


/**
 * 
 * Game logic
 * 
 * 0 1 2
 * 3 4 5
 * 6 7 8
 */

const winnerMiniMax = (boardGame) => {
  let winner = null;

  // horizontal
  for (let index = 0; index < boardGame.length; index += 3) {
    if (gotAWin(boardGame[index], boardGame[index + 1], boardGame[index + 2])) {
      winner = boardGame[index];
      break;
    }
  }

  // verticais
  for (let index = 0; index < 3; index++) {
    if (gotAWin(boardGame[index], boardGame[index + 3], boardGame[index + 6])) {
      winner = boardGame[index];
      break;
    }
  }

  // diagonal esq -> direita
  if (gotAWin(boardGame[0], boardGame[4], boardGame[8])) {
    winner = boardGame[0];

    // diagonal direita -> esquerda
  } else if (gotAWin(boardGame[2], boardGame[4], boardGame[6])) {
    winner = boardGame[2];
  }

  const isFullboardGame = boardGame.findIndex(square => square === false) === -1;

  if (winner == null && isFullboardGame) {
    return "tie";
  } else {
    return winner;
  }
}

const gotAWin = (posA, posB, posC) => {
  return posA === posB && posB === posC && posA !== false;
}


const findAEmptySpot = (boardGame) => {
  return boardGame.findIndex(square => square === false)
}
