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
}

export default Field;
