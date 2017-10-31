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
}

// Test Function for Random Number Generation

// function testRun(){
//
//   for (var r = 0; r < 5; r++) {
//     compareNumbers();
//
//     console.log('Run', r);
//
//     console.log('first number', firstImageNumber);
//     console.log('second number', secondImageNumber);
//     console.log('third number', thirdImageNumber);
//
//     console.log('Begin Next Run');
//   }
// }

// testRun();

// Event Listener Manipulation

function editEventListeners(flag) { //true will add listeners and false will remove them.
  if (counter !== 25 && flag === 'add') {
    console.log('c not 0', counter != 0);
    console.log('c', counter);
    document.getElementById(imgArray[firstImageNumber].name).addEventListener('click', displayPage);
    document.getElementById(imgArray[secondImageNumber].name).addEventListener('click', displayPage);
    document.getElementById(imgArray[thirdImageNumber].name).addEventListener('click', displayPage);
  } else if (counter === 25 && flag === 'add') {
    document.getElementById('click').addEventListener('click', displayPage);
    document.getElementById('an').addEventListener('click', displayPage);
    document.getElementById('image').addEventListener('click', displayPage);
  }
  if (counter !== 0 && flag === 'remove') { //only removes event listeners if they are present.
    console.log('c not 0', counter !== 0);
    console.log('c', counter);
    document.getElementById(imgArray[previousFirst].name).removeEventListener('click', displayPage);
    document.getElementById(imgArray[previousSecond].name).removeEventListener('click', displayPage);
    document.getElementById(imgArray[previousThird].name).removeEventListener('click', displayPage);
  } else if (counter === 0 && flag === 'remove'){
    document.getElementById('click').removeEventListener('click', displayPage);
    document.getElementById('an').removeEventListener('click', displayPage);
    document.getElementById('image').removeEventListener('click', displayPage);
  }
}

// function removeImages() {
//   document.getElementById(imgArray[previousFirst].name).remove();
//   document.getElementById(imgArray[previousSecond].name).remove();
//   document.getElementById(imgArray[previousThird].name).remove();
// }

// Display Page Contents function
function displayPage() {
  console.log(this.id);
  if (this.id !== 'click' && this.id !== 'an' && this.id !== 'image') {
    for (var i = 0; i < imgArray.length; i++) {
      if (this.id === imgArray[i].name) {
        imgArray[i].picked++;
        break;
      }
    }
  }
  if (counter === 0) {
    compareNumbers();
    imgArray[firstImageNumber].displayed++;
    imgArray[secondImageNumber].displayed++;
    imgArray[thirdImageNumber].displayed++;
    editEventListeners('remove');
    document.getElementById('click').src = imgArray[firstImageNumber].path;
    document.getElementById('click').id = imgArray[firstImageNumber].name;
    document.getElementById('an').src = imgArray[secondImageNumber].path;
    document.getElementById('an').id = imgArray[secondImageNumber].name;
    document.getElementById('image').src = imgArray[thirdImageNumber].path;
    document.getElementById('image').id = imgArray[thirdImageNumber].name;
    editEventListeners('add');
    counter++;
  } else if (counter < 25 && counter !== 0) {
    compareNumbers();
    imgArray[firstImageNumber].displayed++;
    imgArray[secondImageNumber].displayed++;
    imgArray[thirdImageNumber].displayed++;
    editEventListeners('remove');
    document.getElementById(imgArray[previousFirst].name).src = imgArray[firstImageNumber].path;
    document.getElementById(imgArray[previousFirst].name).id = imgArray[firstImageNumber].name;
    document.getElementById(imgArray[previousSecond].name).src = imgArray[secondImageNumber].path;
    document.getElementById(imgArray[previousSecond].name).id = imgArray[secondImageNumber].name;
    document.getElementById(imgArray[previousThird].name).src = imgArray[thirdImageNumber].path;
    document.getElementById(imgArray[previousThird].name).id = imgArray[thirdImageNumber].name;
    editEventListeners('add'); // adds new event listeners and removes old ones
    counter++;
  } else if (counter === 25) {
    editEventListeners('remove');
    document.getElementById(imgArray[previousFirst].name).src = './assets/blank.jpg';
    document.getElementById(imgArray[previousFirst].name).id = 'click';
    document.getElementById(imgArray[previousSecond].name).src = './assets/blank.jpg';
    document.getElementById(imgArray[previousSecond].name).id = 'an';
    document.getElementById(imgArray[previousThird].name).src = './assets/blank.jpg';
    document.getElementById(imgArray[previousThird].name).id = 'image';
    editEventListeners('add');
    counter = 0;
  }
  previousFirst = firstImageNumber;
  previousSecond = secondImageNumber;
  previousThird = thirdImageNumber;
}
// Test Click function

document.getElementById('click').addEventListener('click', displayPage);
document.getElementById('an').addEventListener('click', displayPage);
document.getElementById('image').addEventListener('click', displayPage);
