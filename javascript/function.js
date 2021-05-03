

var result;
const num1 = 2, num2 = 4

// let permet de declarer des variables dont la portée est limitée au bloc de code à l'interieur du quel la variable est declarée
function addNumber(num1 = 3 , num2 = 5) {

  result = num1+num2;
  // console.log(result);
}
 addNumber(num1,num2);

 console.log(result);



// IIFE Immediatly Invoked Function Execution

(function (num1, num2){
  result = num1 + num2;
  console.log(result);
})(100,10);

//arrow function => rendre le code moins verbeux et beaucoup plus lisible

( (num1, num2) => {
  result = num1 + num2;
  console.log(result);
})(100,10);


