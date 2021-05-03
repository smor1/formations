//simple function

function createMessage (name: string) {
    return "hello, "+ name;

}

function isPair(nombre: number, options?: {a: number, b: string}): boolean {

    return nombre % 2 === 0;
}

function salut(t: Array<String>): void{

    let out = []
    for(let item of t) {
        out.push('salut'+ item)
    }
}

console.log(isPair(2));
isPair(2, {a: 2, b: 'toto'});

salut(['toto','toto','toto']);


let result = createMessage("toto");
