'use strict';

// App Scripts

// Declared Variables
var whichSide = [0, 0, 0];
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
  this.color = Math.floor(Math.random() * 16777215).toString(16);
}

// Object Instanciation for Chart Objects
Chart.defaults.global.defaultFontColor = 'black';
Chart.defaults.global.defaultFontFamily = 'Helvetica Neue';
Chart.defaults.global.defaultFontSize = 16;
var ctc = document.getElementById('clicked_chart').getContext('2d');
var clickedChart = new Chart(ctc, {
  // The type of chart we want to create
  type: 'horizontalBar',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'Number Of Times Clicked and Viewed',
      backgroundColor: [],
      borderColor: '#000',
      data: []
    }]
  },

  // Configuration options go here
  options: {
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

var ctp = document.getElementById('percentage_chart').getContext('2d');
var percentageChart = new Chart(ctp, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: {
    labels: [],
    datasets: [{
      label: 'Percentage Clicked Vs Displayed',
      backgroundColor: [],
      borderColor: '#000',
      data: []
    }]
  },

  // Configuration options go here
  options: {
    scales: {
      xAxes: [{
        ticks: {
          max: 100,
          beginAtZero: true
        }
      }]
    }
  }
});

var ctx = document.getElementById('image_chosen_chart').getContext('2d');
var whichImageChart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'pie',

  // The data for our dataset
  data: {
    labels: ['Left', 'Center', 'Right'],
    datasets: [{
      label: 'Which Side Was More Favored',
      backgroundColor: [],
      borderColor: '#000',
      data: []
    }]
  },

  // Configuration options go here
  options: {
  }
});



// Instanciation of Image Objects

for (var i = 0; i < imgNames.length; i++) {
  imgArray.push(new ImageBuilder(imgNames[i]));
}

// updates chart information after 25 images

function chartUpdater() {
  // clickedChart.chart.config.data.labels = [];
  // clickedChart.chart.config.data.datasets[0].data = [];
  // clickedChart.chart.config.data.datasets[0].backgroundColor = [];
  //
  // percentageChart.chart.config.data.labels = [];
  // percentageChart.chart.config.data.datasets[0].data = [];
  // percentageChart.chart.config.data.datasets[0].backgroundColor = [];
  //
  // whichImageChart.chart.config.data.datasets[0].data = [];
  // whichImageChart.chart.config.data.datasets[0].backgroundColor = [];
  for (var l = 0; l < imgArray.length; l++) {
    clickedChart.chart.config.data.labels.push('Times ' + imgArray[l].name + ' was picked');
    clickedChart.chart.config.data.labels.push('Times ' + imgArray[l].name + ' was displayed');
    clickedChart.chart.config.data.datasets[0].data.push(imgArray[l].picked);
    clickedChart.chart.config.data.datasets[0].data.push(imgArray[l].displayed);
    clickedChart.chart.config.data.datasets[0].backgroundColor.push('#' + imgArray[l].color);
    clickedChart.chart.config.data.datasets[0].backgroundColor.push('#' + imgArray[l].color);

    percentageChart.chart.config.data.labels.push(imgArray[l].name);
    percentageChart.chart.config.data.datasets[0].data.push(((imgArray[l].picked / imgArray[l].displayed) * 100));
    percentageChart.chart.config.data.datasets[0].backgroundColor.push('#' + imgArray[l].color);
  }
  for (var m = 0; m < 3; m++) {
    whichImageChart.chart.config.data.datasets[0].data.push(whichSide[m]);
    whichImageChart.chart.config.data.datasets[0].backgroundColor.push('#' + imgArray[m].color);
  }
  clickedChart.update();
  percentageChart.update();
  whichImageChart.update();
  document.getElementById('slider_section').style.visibility = 'visible';
  document.getElementById('slider_section').style.overflow = 'visible';
  document.getElementById('slider_section').style.height = '700px';
  document.getElementById('click').style.display = 'none';
  document.getElementById('an').style.display = 'none';
  document.getElementById('image').style.display = 'none';
};


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
    for (var a = 0; a < 3; a++) {
      document.getElementById(possibleInputs[change][a].name).addEventListener('click', displayPage);
    }
  }
  if (flag === 'remove'){
    for (var r = 0; r < 3; r++) {
      document.getElementById(possibleInputs[change][r].name).removeEventListener('click', displayPage);
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
    for (var j = 0; j < 3; j++) {
      if (name === possibleInputs.current[j].name) {
        whichSide[j]++;
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

// Combined Image Listener System

function changeListeners(added, removed) {
  compareNumbers();
  editEventListeners('remove', removed);
  changeImages(added, removed);
  editEventListeners('add', added);
}

// Display Page Contents function

function displayPage() {
  console.log(this.id);
  increasePicked(this.id);
  if (counter === 0) {
    // compareNumbers();
    // editEventListeners('remove', 'blank');
    // changeImages('current', 'blank');
    // editEventListeners('add', 'current');
    changeListeners('current', 'blank');
    counter++;
    save();
  } else if (counter < 25 && counter > 0) {
    // compareNumbers();
    // editEventListeners('remove', 'previous');
    // changeImages('current', 'previous');
    // editEventListeners('add', 'current'); // adds new event listeners and removes old ones
    changeListeners('current', 'previous');
    counter++;
    save();
  } else if (counter === 25) {
    editEventListeners('remove', 'previous');
    changeImages('blank', 'previous');
    // editEventListeners('add', 'blank');
    counter = 0;
    chartUpdater();
    save();
  }
  previousFirst = firstImageNumber;
  previousSecond = secondImageNumber;
  previousThird = thirdImageNumber;
}

// Saves App State To Local Storage

function save() {
  localStorage.counter = counter;
  localStorage.previousFirst = previousFirst;
  localstorage.previousSecond = previousSecond;
  localstorage.previousThird = previousThird;
  var saveImages = [];
  var saveCharts = [];
  for (var i = 0; i < imgArray.length; i++) { // stringifies/pushes objects and adds a carrot for easy splitting
    if (i === imgArray.length - 1) saveImages.push(JSON.stringify(imgArray[i])); break;
    saveImages.push(JSON.stringify(imgArray[i]) + '^');
  }
  saveCharts.push(JSON.stringify(clickedChart) + '^', JSON.stringify(percentageChart) + '^', JSON.stringify(whichImageChart));
  localStorage.imageArray = saveImages;
  localStorage.chartsArray = saveCharts;
  console.log(localStorage);
}

// Loads App State From Local Storage

function load() {
  editEventListeners('add', 'blank');
  if (!localStorage) return;
  counter = localStorage.counter;
  previousFirst = localStorage.previousFirst;
  previousSecond = localStorage.previousSecond;
  previousThird = localStorage.previousThird;
  var savedImages = localStorage.saveImages.split('^,');
  console.log(savedImages);
  for (var i = 0; i < savedImages.length; i++) {
    savedImages[i] = JSON.parse(savedImages[i]);
  }
  console.log(savedImages);
  imgArray = savedImages;
  var savedCharts = localStorage.saveCharts.split('^,');
  clickedChart = JSON.parse(savedCharts[0]);
  percentageChart = JSON.parse(savedCharts[1]);
  whichImageChart = JSON.parse(savedCharts[2]);
  if (counter != 25) {
    changeListeners('current', 'blank');
    previousFirst = firstImageNumber;
    previousSecond = secondImageNumber;
    previousThird = thirdImageNumber;
    return;
  }
  chartUpdater();
}

// Initialize Application System


load();
save();
