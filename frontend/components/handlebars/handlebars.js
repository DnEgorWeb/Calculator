"use strict";

export default class Handlebars {
    constructor(options) {
        this._el = options.el;
        this._paragraph = this._el.querySelector('p');

        this._buffer = [0];
    }

    work(event) {
        const display = this._el.querySelector('.calculator-display');
        let calculatorClass = event.target.className;

        if (event.target === display || event.target.className === 'calculator-buttons-list') return;

        switch (calculatorClass) {
            case "calculator-numbers":
                this._numbersAdd(event.target.innerHTML);
                break;

            case "manage":
                this._manage(event.target.innerHTML);
                break;

            case "calculator-operation":
                this._operate(event.target.innerHTML);
                break;

            default:
                this._equal();
                break;
        }
    }

    _numbersAdd(num) {
        let lastElement = this._buffer[this._buffer.length-1];

        if (this._buffer.length === 1 && isNumeric(num)) {
            if (this._buffer[this._buffer.length-1] === 0) {
                if (num === '.') {
                    this._paragraph.innerHTML = 0 + num;
                    this._buffer[this._buffer.length-1] = 0 + num;
                } else {
                    this._paragraph.innerHTML = num;
                    this._buffer[this._buffer.length-1] = +num;
                }
            } else {
                if (num === '.') {
                    this._paragraph.innerHTML += num;
                    this._buffer[this._buffer.length-1] += num;

                } else {
                    this._paragraph.innerHTML += num;
                    this._buffer[this._buffer.length-1] += num;
                }
            }
        } else if (isNumeric(this._buffer[this._buffer.length-1]) && isNumeric(num)) {
            this._paragraph.innerHTML += num;

            this._buffer[this._buffer.length-1] += num;
        } else {
            this._paragraph.innerHTML += num;
            this._buffer.push(+num);

        }

        function isNumeric(n) {
            return (!isNaN(parseFloat(n)) && isFinite(n)) || n === '.';
        }
    }

    _operate(operation) {
        if (this._buffer.length>=3) {
            this._buffer = [this._count()];
            this._paragraph.innerHTML = this._buffer[0];
        }

        this._paragraph.innerHTML += operation;

        this._buffer.push(operation);
    }

    _manage(manager) {
        if (manager === "AC") {
            this._paragraph.innerHTML = "0";
            this._buffer = [0];
        } else {
            if (this._buffer.length == 1) {
                this._buffer[0] = 0;
                this._paragraph.innerHTML = 0;
            } else {
                this._buffer.pop();
                let str = '';

                this._buffer.forEach(item => {
                    str += item;
                });

                this._paragraph.innerHTML = str;
            }
        }
    }

    _count() {
        const first = this._buffer[0];
        const second = this._buffer[2];
        const operator = this._buffer[1];

        switch (operator) {
            case '+':
                return +(+first + +second).toFixed(3);
                break;

            case '−':
                return +(+first - +second).toFixed(3);
                break;

            case '*':
                return +(+first * +second).toFixed(3);
                break;

            default:
                return +(+first/+second).toFixed(3);
                break;
        }
    }

    _equal() {
        const value = this._count();
        this._buffer = [value];
        this._paragraph.innerHTML = value;
    }

    _isLastElNumber() {
        if (isNaN(+this._buffer[this._buffer.length-1]) ) {
            return false;
        }
        return typeof +this._buffer[this._buffer.length-1] === 'number';
    }
}