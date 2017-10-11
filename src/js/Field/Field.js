class Field {
    constructor(n = 4, merge, compare) {
        this.merge = merge;
        this.compare = compare;

        // Двумерный массив, содержащий текущее состояние игрового поля
        this.grid = [];

        // Заполняем массив поля нулевыми значениями
        for (let i = 0; i < n; i++) {
            this.grid[i] = [];
            for (let j = 0; j < n; j++) {
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

    /**
     * Возвращает сериализованный массив текущего состояния игрового поля.
     * Каждый элемент такого массива – строковое представление соответствующего объекта
     * (для приведения объекта к строке используется его метод toString).
     */
    serializeGrid() {
        return this.grid.map(row => (
            row.map(elem => elem === null ? 0 : elem.toString())
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
        const newArr = arr.slice();

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
                    if (this.compare(newArr[k], newArr[k - 1])) {
                        // Если предыдущий элемент равен текущему – сливаем их
                        // с помощью функции merge
                        newArr[k - 1] = this.merge(newArr[k], newArr[k - 1]);
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
}

export default Field;
