class Tile {
    constructor(id, value, mergedFrom = null) {
        this.id = id;
        this.value = value;
        this.mergedFrom = mergedFrom;
    }

    /**
     * Функция сливает два тайла и возвращает результирующий тайл. Поле value
     * результирующего тайла удваивается.
     * 
     * @param {Tile} firstTile Первый тайл (тот, в который вливается второй тайл).
     * @param {Tile} secondTile Второй тайл.
     */
    static merge(firstTile, secondTile) {
        // Новое значение
        const newValue = firstTile.value * 2;
        return new Tile(firstTile.id, newValue, secondTile);
    }

    /**
     * Функция сравнивает два тайла. Если значения valueOf тайлов равны,
     * то функция возвращает true, иначе – false.
     * 
     * @param {Tile} firstTile Первый тайл.
     * @param {Tile} secondTile Второй тайл.
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
