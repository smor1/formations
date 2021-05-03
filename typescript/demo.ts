
class Demo {

    private _element: string = 'default' ;

    get element(): string {
        return this._element;
    }

    set element(value: string) {
        this._element = value;
    }
}

let d = new Demo();
d.element = 'tata';
console.log(d.element);

