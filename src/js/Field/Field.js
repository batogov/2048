class Field {
    constructor(size = 4, merge, compare) {
        this.size = size;

        this.merge = merge;
        this.compare = compare;

        // Двумерный массив, содержащий предыдущее состояние игрового поля
        this.prevGrid = [];

        // Текущее состояние игрового поля
        this.grid = [];

        // Заполняем массив поля нулевыми значениями
        for (let i = 0; i < size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < size; j++) {
                this.grid[i][j] = null;
            }
        }
    }

    /**
     * Возвращает столбец с заданным номером из массива поля.
     * 
     * @param {number} n Номер столбца.
     */
    getColumn(n) {
        return this.grid.map(row => row[n]);
    }

    /**
     * Изменяет столбец с номером n в массиве поля на переданный столбец.
     * 
     * @param {number} n Номер столбца.
     * @param {Array} column Новый столбец, представленный в виде массива
     * длины n.
     */
    setColumn(n, column) {
        this.grid.forEach((row, index) => {
            row[n] = column[index];
        });
    }

    /**
     * Возвращает строку с заданным номером из массива поля.
     * 
     * @param {number} n Номер строки.
     */
    getRow(n) {
        return this.grid[n].slice();
    }

    /**
     * Изменяет строку с номером n в массиве поля на переданный столбец.
     * 
     * @param {number} n Номер строки.
     * @param {Array} column Новая строка, представленный в виде массива
     * длины n.
     */
    setRow(n, row) {
        this.grid[n] = row;
    }

    /**
     * Записывает переданный объект в ячейку с индексами i, j.
     * 
     * @param {number} i Индекс строки.
     * @param {number} j Индекс столбца.
     * @param {*} elem Объект, который необходимо записать в ячейку поля.
     */
    setCell(i, j, elem) {
        this.grid[i][j] = elem;
    }

    getCell(i, j) {
        return this.grid[i][j];
    }

    /**
     * Функция возвращает копию текущего состояния игрового поля.
     */
    copyGrid() {
        return this.grid.map(row => row.slice());
    }

    /**
     * Если предудущее состояние игрового поля отличается от текущего, то
     * функция возвращает true, иначе – false.
     */
    wasGridChanged() {
        if (this.prevGrid === []) return true;

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                if (this.grid[i][j] !== this.prevGrid[i][j]) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Возвращает индексы (i, j) случайной пустой ячейки игрового поля.
     */
    getRandomAvailableCell() {
        const availableCells = [];

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid.length; j++) {
                if (this.grid[i][j] === null) {
                    availableCells.push([i, j]);
                }
            }
        }

        if (availableCells.length !== 0) {
            const randomIndex = ~~(Math.random() * availableCells.length);
            return availableCells[randomIndex];
        } else {
            return null;
        }
    }

    /**
     * Возвращает сериализованный массив текущего состояния игрового поля.
     * Каждый элемент такого массива – строковое представление соответствующего объекта
     * (для приведения объекта к строке используется его метод toString).
     */
    serializeGrid() {
        return this.grid.map(row => (
            row.map(elem => elem === null ? 0 : elem.valueOf())
        ));
    }

    /**
     * Функция возвращает массив, в котором элементы из исходного массива
     * сдвинуты в начало. Элементы – объекты. Если подряд идут два одинаковых
     * элемента (для проверки используется функция compare), то они сливаются
     * в один (с помощью функции merge).
     *
     * @param {Array} arr Переданный массив. В качестве пустых элементов
     * должен использоваться null.
     */
    arrayMove(arr) {
        // Копируем массив
        const newArr = arr.slice();

        let isMerged = false;

        for (let i = 0; i < newArr.length; i++) {
            let k = i;
            while (k !== 0) {
                // Если текущий элемент нулевой – выходим из внутреннего цикла
                if (newArr[k] === null) {
                    break;
                } else if (newArr[k - 1] === null) {
                    // Если предыдущий элемент нулевой – перемещаем текущий
                    // элемент на его место
                    newArr[k - 1] = newArr[k];
                } else {
                    if (!isMerged && this.compare(newArr[k], newArr[k - 1])) {
                        // Если предыдущий элемент равен текущему – сливаем их
                        // с помощью функции merge
                        newArr[k - 1] = this.merge(newArr[k - 1], newArr[k]);
                        isMerged = true;
                    } else {
                        // Иначе выходим из внутреннего цикла
                        break;
                    }
                }
                newArr[k] = null;
                k--;
            }
        }

        return newArr;
    }

    /**
     * Сдвигает элементы игрового поля в указанном направлении.
     *
     * @param {string} direction Направление движения ('left', 'right', 'down', 'up').
     */
    move(direction) {
        // Обновляем предыдущее состояние поля
        this.prevGrid = this.copyGrid();

        if (direction === 'left' || direction === 'right') {
            // Итерируемся по строкам
            for (let i = 0; i < this.grid.length; i++) {
                // Сохраняем текущую строку
                const row = this.getRow(i);

                // Выполняем сдвиг элементов в строке. Если сдвигаем поле вправо, то
                // до и после сдвига необходимо инвертировать строку
                if (direction === 'right') row.reverse();
                const movedArr = this.arrayMove(row);
                if (direction === 'right') movedArr.reverse();

                // Записываем новую строку в массив поля
                this.setRow(i, movedArr);
            }
        } else if (direction === 'up' || direction === 'down') {
            // Итерируемся по столбцам и выполняем аналогичные действия, но
            // со столбцами
            for (let i = 0; i < this.grid.length; i++) {
                const column = this.getColumn(i);

                if (direction === 'down') column.reverse();
                const movedArr = this.arrayMove(column);
                if (direction === 'down') movedArr.reverse();

                this.setColumn(i, movedArr);
            }
        }
    }
}

export default Field;
