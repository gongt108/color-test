// Populate the grid
const body = document.querySelector('body');
const timerCountdown = document.querySelector('#timer');

const originalColors = ['#ff0000', '#0000FF', '#008000', '#800080', '#FFFF00'];
const offColors = ['#E34234', '#6495ED', '#023020', '#953553', '#F4C430'];

let round = 1;
let gridNumber = 2;
let timer;

function populateGrid() {
	const grid = document.createElement('div');
	grid.setAttribute('id', 'grid');

	const originalDot = document.createElement('div');
	originalDot.setAttribute('class', 'dot');
	const originalDotColor = Math.floor(Math.random() * originalColors.length);

	if (round === 1) {
		gridNumber = 2;
	} else {
		gridNumber = round;
	}
	timer = round + 3;
	timerCountdown.textContent = timer;

	document.documentElement.style.setProperty('--rowNum', gridNumber);
	body.append(grid);

	let gridArray = [];

	for (let i = 0; i < gridNumber * gridNumber; i++) {
		gridArray[i] = i;
		let gridDot = document.createElement('div');
		gridDot.setAttribute('class', 'dot');
		gridDot.style.backgroundColor = originalColors[originalDotColor];
		gridDot.setAttribute('id', `dot-${i}`);
		grid.appendChild(gridDot);
	}

	let solutionI = Math.floor(Math.random() * gridNumber * gridNumber);
	const solutionDot = document.querySelector(`#dot-${solutionI}`);
	solutionDot.className += ' solution';
	solutionDot.style.backgroundColor = offColors[originalDotColor];
}

populateGrid();

// Clear grid
function clearGrid() {
	body.removeChild(document.querySelector('#grid'));
}

// Lose sequence
function loseGame() {
	alert('you lose');
	round = 1;
	timer = 4;
	clearGrid();
	populateGrid();
}

// Timer countdown
setInterval(() => {
	if (timer > 0) {
		timer--;
		timerCountdown.textContent = timer;
	} else {
		loseGame();
	}
}, 1000);

// Onclick Listener
body.addEventListener('click', (e) => {
	if (e.target.className === 'dot solution') {
		if (round === 7) {
			alert('You win! Play again?');
			round = 1;
		} else {
			round++;
		}
		clearGrid();
		populateGrid();
	} else if (e.target.className === 'dot') {
		loseGame();
	} else {
		return;
	}
});
