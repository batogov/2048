import icon from './../../icons/refresh.svg';

class GameView {
    constructor(gameElem) {
        this.gameElem = gameElem;
        this.icon = icon;

        const container = document.createDocumentFragment();
        this.headerElem = container.appendChild(this.createElement('div', 'header'));
        this.fieldElem = container.appendChild(this.createElement('div', 'field'));
        this.footerElem = container.appendChild(this.createElement('div', 'footer'));
        gameElem.appendChild(container);
    }

    init(score, footerTitle) {
        this.renderHeader(score);
        this.renderField();
        this.renderFooter(footerTitle);
    }

    createElement(elementName, className = '', content = '') {
        const elem = document.createElement(elementName);
        elem.className = className;
        elem.textContent = content;
        return elem;
    }

    getElementFromTemplate(template) {
        const container = document.createElement('template');
        container.innerHTML = template;
        return container.content;
    }

    renderField() {
        const container = document.createDocumentFragment();
        const bgGridElem = this.createElement('div', 'background-grid');

        for (let i = 0; i < 16; i++) {
            bgGridElem.appendChild(this.createElement('div', 'background-grid__tile'));
        }

        container.appendChild(bgGridElem);
        container.appendChild(this.createElement('div', 'grid'));

        this.fieldElem.innerHTML = '';
        this.fieldElem.appendChild(container);
    }

    renderGrid(field) {
        const gridElem = this.fieldElem.querySelector('.grid');

        // Удаляем все элементы тайлов с классом "tile--merged"
        const mergedTileElems = document.querySelectorAll('.tile--merged');
        mergedTileElems.forEach(mergedTileElem => mergedTileElem.remove());

        for (let i = 0; i < field.size; i++) {
            for (let j = 0; j < field.size; j++) {
                // Текущий тайл
                const tile = field.getCell(i, j);

                if (tile !== null) {
                    const tileElem = document.getElementById(tile.id);

                    // Если элемент тайла есть на странице
                    if (tileElem !== null) {
                        // Обновляем его положение на поле
                        tileElem.className = `tile tile--${tile.toString()} tile--tile-pos-${i}-${j}`;
                        tileElem.innerHTML = tile.toString();

                        // Если есть слитый тайл, то обновляем его положение + увеличиваем счёт игры
                        if (tile.mergedFrom !== null) {
                            const mergedTileElem = document.getElementById(tile.mergedFrom.id);
                            mergedTileElem.className = `tile tile--merged tile--${tile.mergedFrom.toString()} tile--tile-pos-${i}-${j}`;
                            tile.mergedFrom = null;
                        }
                    } else {
                        // Иначе создаём новый элемент тайла
                        const newTileElem = this.createElement(
                            'div', `tile tile--new tile--${tile.toString()} tile--tile-pos-${i}-${j}`, tile.toString()
                        );
                        newTileElem.id = tile.id;
                        gridElem.appendChild(newTileElem);
                    }
                }
            }
        }
    }

    renderHeader(score, addition = 0) {
        let template = `
            <span class="header__score-title">score</span>
            <span class="header__score-value">${score}</span>
        `;

        if (addition !== 0) {
            template += `<span class="header__score-addition">${addition}</span>`;
        };

        this.headerElem.innerHTML = '';
        this.headerElem.appendChild(this.getElementFromTemplate(template));
    }

    renderGameOverHeader(title, score) {
        let template = `
            <span class="header__result-title">${title}</span>
            <span class="header__result-score">with score ${score}</span>
        `;

        this.headerElem.innerHTML = '';
        this.headerElem.appendChild(this.getElementFromTemplate(template));
    }

    renderFooter(annotation, isAnimated = false) {
        let iconClassName = 'footer__repeat-icon';
        if (isAnimated) { iconClassName += ' footer__repeat-icon--rotate' };

        const template = `
            <span class="footer__annotation">${annotation}</span>
            <div class="${iconClassName}">${this.icon}</div>
        `;

        this.footerElem.innerHTML = '';
        this.footerElem.appendChild(this.getElementFromTemplate(template));
    }

    setRepeatBtnListener() {
        this.footerElem.querySelector('.footer__repeat-icon').onclick = (event) => {
            this.onRepeatBtnClick();
        };
    }

    onRepeatBtnClick() {}
}

export default GameView;
