'use strict';

// App Scripts

// Declared Variables

var counter = 0;
var firstImageNumber;
var secondImageNumber;
var thirdImageNumber;
var previousFirst; //will be assigned first image number each round.
var previousSecond; //second image.
var previousThird; //third image.
var imgArray = [];
var pageArray = [];
var imgNames = [
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'
];

// Object Constructor for Image Array

function ImageBuilder (name) {
  this.path = './assets/' + name + '.jpg';
  this.name = name;
  this.displayed = 0;
  this.picked = 0;
}

// Instanciation of Image Objects

for (var i = 0; i < imgNames.length; i++) {
  imgArray.push(new ImageBuilder(imgNames[i]));
}

// Random Number Generator

function getRandom() {
  var generatedNumber = Math.floor(Math.random() * imgArray.length); //Image Array Length
  while (generatedNumber === previousFirst || generatedNumber === previousSecond || generatedNumber === previousThird) {
    generatedNumber = Math.floor(Math.random() * imgArray.length); //Image Array Length
    console.log('caught previous number');
  }
  return generatedNumber;
}

// Random Number Comparator

function compareNumbers() {
  firstImageNumber = getRandom();
  secondImageNumber = getRandom();
  thirdImageNumber = getRandom();
  // console.log('first number', firstImageNumber);
  // console.log('second number', secondImageNumber);
  // console.log('third number', thirdImageNumber);
  console.log('Begin Second Number Comparator');
  while (secondImageNumber === firstImageNumber) {
    console.log('generated number', secondImageNumber);
    secondImageNumber = getRandom();
    console.log('regenerated second number', secondImageNumber);
  }
  console.log('Begin Third Number Comparator');
  while (thirdImageNumber === firstImageNumber || thirdImageNumber === secondImageNumber) {
    console.log('generated number', thirdImageNumber);
    thirdImageNumber = getRandom();
    console.log('regenerated third number', thirdImageNumber);
  }
  previousFirst = firstImageNumber;
  previousSecond = secondImageNumber;
  previousThird = thirdImageNumber;
}

// Test Function for Random Number Generation

function testRun(){

  for (var r = 0; r < 5; r++) {
    compareNumbers();

    console.log('Run', r);

    console.log('first number', firstImageNumber);
    console.log('second number', secondImageNumber);
    console.log('third number', thirdImageNumber);

    console.log('Begin Next Run');
  }
}

testRun();
