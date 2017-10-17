import Game from './js/Game/Game';
import './style.scss';

const gameElem = document.querySelector('.game');
const game = new Game(gameElem);

game.init();
