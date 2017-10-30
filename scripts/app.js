'use strict';

// App Scripts

// Declared Variables

var previousFirst; //will be assigned first image number each round.
var previousSecond; //second image.
var previousThird; //third image.
var imgArray = [];

// Random Number Generator

function getRandom() {
  var generatedNumber = Math.floor(Math.random() * imgArray.length); //Image Array Length
  while (generatedNumber === previousFirst || generatedNumber === previousSecond || generatedNumber === previousThird) {
    generatedNumber = Math.floor(Math.random() * imgArray.length); //Image Array Length
  }
  return generatedNumber;
}

// Random Number Comparator

function compareNumbers() {
  var firstImageNumber = getRandom();
  var secondImageNumber = getRandom();
  var thirdImageNumber = getRandom();
  while (secondImageNumber === firstImageNumber) {
    secondImageNumber = getRandom();
  }
  while (thirdImageNumber === firstImageNumber || thirdImageNumber === secondImageNumber) {
    thirdImageNumber = getRandom();
  }
}
