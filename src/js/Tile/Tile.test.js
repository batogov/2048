import assert from 'assert';

import Tile from './Tile';

describe('Класс Tile', () => {
    it('Тестируем корректность работы Tile.merge()', () => {
        const mergedTile = Tile.merge(new Tile(2), new Tile(2));
        assert.equal(4, mergedTile.value);
    });

    it('Тестируем Tile.compare() на тайлах с одинаковым value', () => {
        const firstTile = new Tile(2);
        const secondTile = new Tile(2);
        assert.ok(Tile.compare(firstTile, secondTile));
    });

    it('Тестируем Tile.compare() на тайлах с разным value', () => {
        const firstTile = new Tile(2);
        const secondTile = new Tile(4);
        assert.equal(false, Tile.compare(firstTile, secondTile));
    });
});
