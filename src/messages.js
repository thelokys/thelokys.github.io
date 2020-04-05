
/**
 * Messages
 */

const displayMsg = (element, msg) => {
  element.innerHTML = msg;
  return true;
}

const displayWinLoserMsg = (element, you, currentPlayer) => {
  if (you === currentPlayer) {
    element.innerHTML = `${message.winner}`;
  }
  else {
    element.innerHTML = `${message.loser}`;
  }
  return true;
}
