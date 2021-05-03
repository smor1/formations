"use strict";
class Demo {
    constructor() {
        this._element = 'default';
    }
    get element() {
        return this._element;
    }
    set element(value) {
        this._element = value;
    }
}
let d = new Demo();
d.element = 'tata';
console.log(d.element);
