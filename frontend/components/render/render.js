"use strict";

import compiledTemplate from './template.hbs';
import Handlebars from '../handlebars/handlebars';

export default class Render {
    constructor(options) {
        this._el = options.el;

        this._render();

        this._handlers = new Handlebars({
            el: this._el.querySelector('.calculator')
        });

        this._el.addEventListener('click', this._clickHandler.bind(this));
    }

    _render() {
        this._el.innerHTML = compiledTemplate();
    }

    _clickHandler(event) {
        this._handlers.work(event);
    }
}

