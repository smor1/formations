document.getElementById('heading').innerHTML = 'Une simple page HTML'

console.log('toto')
console.info('ceci est une info')
console.warn('ceci est un warning')
console.error('ceci est une erreur')

var a = 2, b = "quatre", result, concat
var firstName = 'Françoise', lastName = 'Sagan';


//NaN not a number

var bNum = Number(b);
result = a + bNum
 // template string nouveauté de ES6 permet de concatener
concat = `Mon prénon est ${firstName} 
et mon nom est ${lastName}`;

console.log(concat);
console.log(result);

console.log(firstName + " " + lastName);

  // boolean false 0 , "", undefined, NaN, null, false

//
// var colors =  Array();
// colors[0] = "Rouge";
// colors[1] = false;
// colors[2] = 5;
// colors[5] = "vert";

var colors = ["Rouge", "vert", "blue"];

// console.log(colors);


var person = {
  firstName: "Françoise",
  lastName: "sagan",
}

// var persons = [
//   {
//     firstName: "Jean",
//     lastName: "Valjean"
//   },
//   {
//     firstName: "Maurice",
//     lastName: "chevalier"
//   }
// ]
//
// console.log(person.firstName);

for (color in colors) {
  console.log(colors[color]);
  console.log('color' + color);
  console.log(colors);
}
//
// for( prop in persons) {
//    console.log(persons[prop].firstName)
// }
//
// console.log(window.document)
