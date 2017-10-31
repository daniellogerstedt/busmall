'use strict';

// App Scripts

// Declared Variables

var possibleInputs;
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

// Random Number Generator -- generates numbers and verifies they weren't used the previous round.

function getRandom() {
  var generatedNumber = Math.floor(Math.random() * imgArray.length); //Image Array Length
  while (generatedNumber === previousFirst || generatedNumber === previousSecond || generatedNumber === previousThird) {
    generatedNumber = Math.floor(Math.random() * imgArray.length); //Image Array Length
    console.log('caught previous number');
  }
  return generatedNumber;
}

// Random Number Comparator -- compares random numbers to verify they aren't the same.

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

// Possible Input Array Updater -- Helper to update values as needed for global input arrays.

function inputUpdater () {
  possibleInputs = {
    previous: [imgArray[previousFirst], imgArray[previousSecond], imgArray[previousThird]],
    current: [imgArray[firstImageNumber], imgArray[secondImageNumber], imgArray[thirdImageNumber]],
    blank: [{name: 'click', path: './assets/blank.jpg'}, {name: 'an', path: './assets/blank.jpg'}, {name: 'image', path: './assets/blank.jpg'}]
  };
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

// Event Listener Manipulation -- Based on input arguments will add/remove specific event listeners.

function editEventListeners(flag, change) {
  inputUpdater();
  if (flag === 'add') {
    console.log('c not 0', counter != 0);
    console.log('c', counter);
    for (var a = 0; a < 3; a++) {
      document.getElementById(possibleInputs[change][a].name).addEventListener('click', displayPage);
    }
  }
  if (flag === 'remove'){
    for (var r = 0; r < 3; r++) {
      document.getElementById(possibleInputs[change][r].name).addEventListener('click', displayPage);
    }
  }
}

// Increase Picked Counter -- looks at clicked image and adds to picked counter on object.

function increasePicked(name) {
  if (name !== 'click' && name !== 'an' && name !== 'image') {
    for (var i = 0; i < imgArray.length; i++) {
      if (name === imgArray[i].name) {
        imgArray[i].picked++;
        break;
      }
    }
  }
}

// Changes Image Sources and Ids

function changeImages(add, remove) { // what am I adding what am I removing
  inputUpdater();
  for (var i = 0; i < 3; i++) {
    document.getElementById(possibleInputs[remove][i].name).src = possibleInputs[add][i].path;
    document.getElementById(possibleInputs[remove][i].name).id = possibleInputs[add][i].name;
    if (add != 'blank') {
      possibleInputs.current[i].displayed++;
    }
  };
}

// Display Page Contents function

function displayPage(event) {
  console.log(this.id);
  increasePicked(this.id);
  if (counter === 0) {
    compareNumbers();
    editEventListeners('remove', 'blank');
    changeImages('current', 'blank');
    editEventListeners('add', 'current');
    counter++;
  } else if (counter < 25 && counter > 0) {
    compareNumbers();
    editEventListeners('remove', 'previous');
    changeImages('current', 'previous');
    editEventListeners('add', 'current'); // adds new event listeners and removes old ones
    counter++;
  } else if (counter === 25) {
    editEventListeners('remove', 'previous');
    changeImages('blank', 'previous');
    editEventListeners('add', 'blank');
    counter = 0;
  }
  previousFirst = firstImageNumber;
  previousSecond = secondImageNumber;
  previousThird = thirdImageNumber;
}
// Test Click function

editEventListeners('add', 'blank');
