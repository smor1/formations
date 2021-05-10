"use strict";
//simple function
function createMessage(name) {
  return "hello, " + name;
}
function isPair(nombre, options) {
  return nombre % 2 === 0;
}
function salut(t) {
  let out = [];
  for (let item of t) {
    out.push('salut' + item);
  }
}
console.log(isPair(2));
isPair(2, { a: 2, b: 'toto' });
salut(['toto', 'toto', 'toto']);
let result = createMessage("toto");
