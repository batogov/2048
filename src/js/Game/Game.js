import Field from './../Field/Field';
import Tile from './../Tile/Tile';

class Game {
    constructor(gridElem) {
        this.gridElem = gridElem;
        this.field = new Field(4, Tile.merge, Tile.compare);
        this.nextTileId = 0;

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
        // Обработчик на нажатие клавиш
        document.addEventListener('keydown', (event) => {
            const keyCodeStr = String(event.keyCode);

            if (keyCodeStr in this.DIRECTIONS) {
                // Сдвигаем поле в нужном направлении
                this.field.move(this.DIRECTIONS[keyCodeStr]);

                // Если игровое поле изменилось, то добавляем новый тайл
                if (this.field.wasGridChanged()) {
                    this.addRandomTile();
                }

                // Рендерим поле
                this.renderGrid(this.field.grid);
            }
        });

        // Инициализация
        this.addRandomTile();
        this.renderGrid(this.field.grid);
    }

    /**
     * Метод рендерит на странице игровое поле.
     * @param {Array} grid Игровое поле.
     */
    renderGrid(grid) {
        // Удаляем все элементы тайлов с классом "tile--merged"
        const mergedTileElems = document.querySelectorAll('.tile--merged');
        mergedTileElems.forEach(mergedTileElem => mergedTileElem.remove());

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid.length; j++) {
                // Текущий тайл
                const tile = grid[i][j];

                if (tile !== null) {
                    const tileElem = document.getElementById(tile.id);

                    // Если элемент тайла есть на странице
                    if (tileElem !== null) {
                        // Обновляем его положение на поле
                        tileElem.className = `tile tile--${tile.toString()} tile--tile-pos-${i}-${j}`;
                        tileElem.innerHTML = tile.toString();

                        // Если есть слитый тайл, то обновляем его положение
                        if (tile.mergedFrom !== null) {
                            const mergedTileElem = document.getElementById(tile.mergedFrom.id);
                            mergedTileElem.className = `tile tile--merged tile--${tile.mergedFrom.toString()} tile--tile-pos-${i}-${j}`;
                            tile.mergedFrom = null;
                        }
                    } else {
                        // Иначе создаём новый элемент тайла
                        const newTileElem = document.createElement('div');
                        newTileElem.id = tile.id;
                        newTileElem.className = `tile tile--new tile--${tile.toString()} tile--tile-pos-${i}-${j}`;
                        newTileElem.innerHTML = tile.toString();
                        this.gridElem.appendChild(newTileElem);
                    }
                }
            }
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
}

export default Game;
