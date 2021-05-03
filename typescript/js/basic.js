"use strict";
class Customer {
    constructor(name) {
        this.name = name;
    }
    announce() {
        return "hello, my name is " + this.name;
    }
}
// create a new instance
let firstCustomer = new Customer("seb");
let newMessage = firstCustomer.announce();
// change the text on the page
let webHeading = document.querySelector('h1');
webHeading.textContent = newMessage;
