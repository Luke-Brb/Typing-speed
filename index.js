let totalSeconds = 60;
let countdownElement;
let minutes;
let seconds;
let interval;

let inputText;
let inputValue;
let inputArrayWords = [];

let displayText;

let randomText;
let randomContent;
let randomArrayWords = [];

let result;
let spanElements;
let newSpanResult;

let isMatch;
let correctWords = 0;

window.onload = function() {
	countdownElement = document.getElementById('time');

	result = document.getElementById('result');
	newSpanResult = document.createElement('span');
	result.appendChild(newSpanResult);
	spanResult = result.querySelector('span');
	spanResult.textContent = correctWords;
	spanResult.style.color = "red";

	// Get the input value as a string from an input field
	inputText = document.getElementById('text');

	displayText = document.getElementById('display');

	randomText = document.getElementById('lorem');
	randomContent = randomText.textContent; //'textContent' will return the markup as text'

	document.addEventListener('keydown', start);
	updateCountdown();
}

function splitIntoWords() {
	inputValue = inputText.value;

	// Split the input text and the predefined text into arrays of words
	inputArrayWords = inputValue.split(' ').filter(word => word !== '');
	randomArrayWords = randomContent.split(' ').filter(word => word !== '');

	// counts the numbers entered correctly
	for (let i = 0; i < inputArrayWords.length; ++i) {
		if (inputArrayWords[i] === randomArrayWords[i]) {
			++correctWords;
		}
	}

	// check on the shortest string if the words between the homologous strings 'insert' and 'random' have equal lengths
	for (let i = 0; i < inputValue.length; ++i) {
		displayResult();
	}
}

function displayResult() {
	// Get the <span> elements and update them
	spanElements = displayText.querySelectorAll("span");
	
	// Calculate the length of the <span> elements and the maximum length of characters 
	let numSpanElements = spanElements.length;
	let maxCharLength = randomContent.length;
	let resultWords = correctWords;

	// Create new <span> elements if there are not enough 
	// existing <span> elements to display the colored text
  for (let i = numSpanElements; i < maxCharLength; ++i) {
    let newSpan = document.createElement('span');
    displayText.appendChild(newSpan);
  }
  spanElements = displayText.querySelectorAll("span");
	
	// Initialize hasMismatch to indicate if there 
	// is a mismatch between the corresponding characters
	let hasMismatch;
	for (let i = 0; i < maxCharLength; ++i) {
    hasMismatch = false;
    if (i < inputValue.length) {
    	if (inputValue[i] !== randomContent[i]) {
      	hasMismatch = true;
    	}
    	spanElements[i].textContent = inputValue[i];
    	spanElements[i].style.color = hasMismatch ? "red" : "green";
    } else {
      spanElements[i].textContent = randomContent[i];
    	spanElements[i].style.color = "black";
    }
	}
	spanResult.textContent = correctWords;
	spanResult.style.color = "yellow";
}

function updateCountdown() {
	minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (totalSeconds >= 0) {
    	--totalSeconds;
	}
	if (!interval) {
		interval = setInterval(updateCountdown, 1000);
	}
	if (totalSeconds < 0) {
		clearInterval(interval);
		interval = null;
    splitIntoWords();
	}
}

function start(e) {
	if (e.code == 'Enter') {
		displayText.textContent = '';
		inputText.value = '';
		correctWords = 0;
		spanResult.textContent = correctWords;
		spanResult.style.color = "red";
		totalSeconds = 60;
		countdownElement = document.getElementById('time');
		countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
		updateCountdown();
	}
}