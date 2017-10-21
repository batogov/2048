import Field from './../Field/Field';
import Tile from './../Tile/Tile';

import GameView from './Game-view';

class Game {
    constructor(gameElem) {
        this.gameElem = gameElem;
        this.field = new Field(4, Tile.merge, Tile.compare);
        this.nextTileId = 0;

        this.prevScore = 0;
        this.score = 0;

        this.DIRECTIONS = {
            '37': 'left',
            '38': 'up',
            '39': 'right',
            '40': 'down',
        }
    }

    /**
     * Метод инициализации игры.
     */
    init() {
        this.view = new GameView(this.gameElem);

        // Обработчик на нажатие клавиш
        document.addEventListener('keydown', this.onKeydown.bind(this));

        // Инициализация
        this.addRandomTile();
        this.view.renderGrid(this.field);
    }

    onKeydown(event) {
        const keyCodeStr = String(event.keyCode);

        if (keyCodeStr in this.DIRECTIONS) {
            // Сдвигаем поле в нужном направлении
            this.field.move(this.DIRECTIONS[keyCodeStr]);
            this.updateScore();

            // Если игровое поле изменилось, то добавляем новый тайл
            if (this.field.wasGridChanged()) {
                this.addRandomTile();
            }

            // Рендерим поле
            this.view.renderGrid(this.field);
            this.view.renderHeader(this.score, this.score - this.prevScore);
        }
    }

    /**
     * Добавляет новый тайл в случайное свободное место в игровом поле.
     */
    addRandomTile() {
        const randomCell = this.field.getRandomAvailableCell();
        this.field.setCell(...randomCell, new Tile(this.nextTileId, 2));

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
