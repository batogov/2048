import Hammer from 'hammerjs';
import Field from './../Field/Field';
import Tile from './../Tile/Tile';
import GameView from './Game-view';

class Game {
    constructor(gameElem) {
        this.gameElem = gameElem;
        this.field = new Field(4, Tile.merge, Tile.compare);
        this.nextTileId = 0;

        this.gameOverSet = new Set();

        this.prevScore = 0;
        this.score = 0;

        this.DIRECTIONS = {
            '37': 'left',
            '38': 'up',
            '39': 'right',
            '40': 'down',
        }

        this.GAMEOVER_TITLES = {
            'win': 'You win! 😎',
            'lose': 'You lose! 😥'
        }

        this.FOOTER_ANNOTATIONS = {
            'game': 'Use arrow keys or swipe to join the numbers and get to the 2048 tile!',
            'win': 'Awesome! Are you going to play again, right?',
            'lose': `All right, let's try it again!`
        }
    }

    /**
     * Метод инициализации игры.
     */
    init() {
        this.view = new GameView(this.gameElem);
        this.view.init(0, this.FOOTER_ANNOTATIONS['game']);

        this.view.onRepeatBtnClick = this.onRepeatBtnClick.bind(this);
        this.view.setRepeatBtnListener();

        // Обработчик на нажатие клавиш
        document.addEventListener('keydown', this.onKeydown.bind(this));

        const hammer = new Hammer(this.gameElem);

        hammer.get('swipe').set({
            direction: Hammer.DIRECTION_ALL,
            threshold: 1,
            velocity: 0.1
        });

        hammer.on('swipeleft', this.onSwipeLeft.bind(this));
        hammer.on('swiperight', this.onSwipeRight.bind(this));
        hammer.on('swipedown', this.onSwipeDown.bind(this));
        hammer.on('swipeup', this.onSwipeUp.bind(this));

        // Инициализация
        this.addStartTiles(2);
        this.view.renderGrid(this.field);
    }

    addStartTiles(n) {
        for (let i = 0; i < n; i++) {
            this.addRandomTile();
        }
    }

    onSwipeLeft() {
        this.updateField('left');
    }

    onSwipeRight() {
        this.updateField('right');
    }

    onSwipeDown() {
        this.updateField('down');
    }

    onSwipeUp() {
        this.updateField('up');
    }

    onKeydown(event) {
        const keyCodeStr = String(event.keyCode);

        if (keyCodeStr in this.DIRECTIONS) {
            this.updateField(this.DIRECTIONS[keyCodeStr]);
        }
    }

    updateField(direction) {
        // Сдвигаем поле в нужном направлении
        this.field.move(direction);
        this.updateScore();

        // Если игровое поле изменилось, то добавляем новый тайл
        if (this.field.wasGridChanged()) {
            this.addRandomTile();

            // Рендерим поле
            this.view.renderGrid(this.field);
            this.view.renderHeader(this.score, this.score - this.prevScore);

            this.gameOverSet.clear();
        } else {
            this.gameOverSet.add(direction);

            if (this.gameOverSet.size === 4) {
                this.view.renderGameOverHeader(this.GAMEOVER_TITLES['lose'], this.score);

                this.view.renderFooter(this.FOOTER_ANNOTATIONS['lose'], true);
                this.view.setRepeatBtnListener();
            }
        }
    }

    onRepeatBtnClick() {
        this.score = 0;
        this.field.reset();

        this.view.renderHeader(this.score);
        this.view.renderField();

        this.view.renderFooter(this.FOOTER_ANNOTATIONS['game']);
        this.view.setRepeatBtnListener();

        this.addStartTiles(2);
        this.view.renderGrid(this.field);
    }

    /**
     * Добавляет новый тайл в случайное свободное место в игровом поле.
     */
    addRandomTile() {
        const randomCell = this.field.getRandomAvailableCell();
        const randomValue = (Math.random() > 0.7) ? 4 : 2;
        this.field.setCell(...randomCell, new Tile(this.nextTileId, randomValue));

        // Инкрементируем счётчик id для следущего тайла
        this.nextTileId++;
    }

    updateScore() {
        this.prevScore = this.score;

        for (let i = 0; i < this.field.size; i++) {
            for (let j = 0; j < this.field.size; j++) {
                const tile = this.field.getCell(i, j);
                if (tile !== null && tile.mergedFrom !== null) {
                    this.score += tile.valueOf();
                }
            }
        }
    }
}

export default Game;
