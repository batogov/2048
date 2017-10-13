import Field from './../Field/Field';
import Tile from './../Tile/Tile';

class Game {
    constructor(gridElem) {
        this.gridElem = gridElem;
        this.field = new Field(4, Tile.merge, Tile.compare);

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
                this.renderGrid(this.field.serializeGrid());
            }
        });

        // Инициализация
        this.addRandomTile();
        this.renderGrid(this.field.serializeGrid());
    }

    /**
     * Метод рендерит на странице игровое поле.
     * @param {Array} grid Игровое поле.
     */
    renderGrid(grid) {
        this.gridElem.innerHTML = '';
        const fragment = document.createDocumentFragment();

        grid.forEach(row => {
            row.forEach(cell => {
                const tileElem =  document.createElement('div');

                if (cell.valueOf() !== 0) {
                    tileElem.classList.add('tile', `tile--${cell.toString()}`);
                    tileElem.innerHTML = cell.valueOf();
                } else {
                    tileElem.classList.add('tile');
                }

                fragment.appendChild(tileElem);
            });
        });

        this.gridElem.appendChild(fragment);
    }

    /**
     * Добавляет новый тайл в случайное свободное место в игровом поле.
     */
    addRandomTile() {
        const randomCell = this.field.getRandomAvailableCell();
        this.field.setCell(...randomCell, new Tile(2));
    }
}

export default Game;
