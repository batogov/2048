import assert from 'assert';

import Field from './Field';
import Tile from './../Tile/Tile';

const case00 = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]];
const case01 = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [2, 2, 0, 0]];
const case02 = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 4, 0, 0],
                [4, 2, 0, 0]];
const case03 = [[0, 0, 0, 0],
                [2, 0, 0, 0],
                [2, 0, 0, 0],
                [4, 0, 0, 0]];
const case04 = [[2, 0, 0, 0],
                [4, 0, 0, 0],
                [2, 0, 0, 0],
                [4, 0, 0, 0]];

describe('Класс Field', () => {
    it('Тестируем работу конструктора', () => {
        const field = new Field(4, Tile.merge, Tile.compare);
        assert.deepEqual(case00, field.serializeGrid());
    });

    it('Проверка работы move(down) #1', () => {
        const field = new Field(4, Tile.merge, Tile.compare);
        field.setCell(0, 0, new Tile(0, 2));
        field.setCell(0, 1, new Tile(1, 2));
        field.move('down');
        assert.deepEqual(case01, field.serializeGrid());
    });

    it('Проверка работы move(down) #2', () => {
        const field = new Field(4, Tile.merge, Tile.compare);
        field.setCell(0, 0, new Tile(0, 2));
        field.setCell(0, 1, new Tile(1, 4));
        field.setCell(2, 0, new Tile(2, 2));
        field.setCell(2, 1, new Tile(3, 2));
        field.move('down');
        assert.deepEqual(case02, field.serializeGrid());
    });

    it('Проверка работы move(down) #3', () => {
        const field = new Field(4, Tile.merge, Tile.compare);
        field.setCell(0, 0, new Tile(0, 2));
        field.setCell(1, 0, new Tile(1, 2));
        field.setCell(2, 0, new Tile(2, 2));
        field.setCell(3, 0, new Tile(3, 2));
        field.move('down');
        assert.deepEqual(case03, field.serializeGrid());
    });

    it('Проверка работы move(down) #4', () => {
        const field = new Field(4, Tile.merge, Tile.compare);
        field.setCell(0, 0, new Tile(0, 2));
        field.setCell(1, 0, new Tile(1, 4));
        field.setCell(2, 0, new Tile(2, 2));
        field.setCell(3, 0, new Tile(3, 4));
        field.move('down');
        assert.deepEqual(case04, field.serializeGrid());
    });

});

