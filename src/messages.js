
/**
 * Messages
 */

const displayMsgTurn = (element, msg, current) => {
  element.innerHTML = msg;
  return true;
}

const displayMsg = (element, msg) => {
  element.innerHTML = msg;
  return true;
}


const displayWinLoserMsg = (element, you, currentPlayer) => {
  if (you === currentPlayer) {
    element.innerHTML = `${message.winner} - ${player_name}`;
  }
  else {
    element.innerHTML = `${message.loser}`;
  
}  return true;
}
