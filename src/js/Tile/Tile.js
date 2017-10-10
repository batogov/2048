class Tile {
    constructor(value) {
        this.value = value;
    }

    /**
     * Функция сливает два тайла и возвращает результирующий тайл. Поле value
     * результирующего тайла рассчитывается, как произведение соответствующих
     * полей у переданных тайлов.
     * @param {Tile} firstTile Первый тайл
     * @param {Tile} secondTile Второй тайл
     */
    static merge(firstTile, secondTile) {
        const newValue = firstTile.value * secondTile.value;
        return new Tile(newValue);
    }

    /**
     * Функция сравнивает два тайла. Если значения valueOf тайлов равны,
     * то функция возвращает true, иначе – false.
     * @param {Tile} firstTile Первый тайл
     * @param {Tile} secondTile Второй тайл
     */
    static compare(firstTile, secondTile) {
        return firstTile.valueOf() === secondTile.valueOf();
    }

    toString() {
        return String(this.value);
    }

    valueOf() {
        return this.value;
    }
}

export default Tile;
