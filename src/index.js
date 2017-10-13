import Game from './js/Game/Game';
import './style.scss';

const gridElem = document.querySelector('.grid');
const game = new Game(gridElem);

game.init();
