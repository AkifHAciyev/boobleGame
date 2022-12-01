const login = document.getElementById('login');
const game_box = document.getElementById('game_box');
const nameInput = document.getElementById('nameInput');
const player_name = document.getElementById('player_name');
const player_score = document.getElementById('player_score');
const player_Highscore = document.getElementById('player_Highscore');
const levels = document.querySelectorAll('#levels');
const btn = document.querySelectorAll('.btn');
const Btn_easy = document.getElementById('Btn_easy');
const Btn_medium = document.getElementById('Btn_medium');
const Btn_hard = document.getElementById('Btn_hard');
const Btn_start = document.getElementById('Btn_start');
const Btn_stop = document.getElementById('Btn_stop');
const ball = document.getElementById('ball');
const ballBox = document.getElementById('ballBox');
let high_score;
let show_bubble;
let score = 0;

btn_start.addEventListener('click', () => {
	if (nameInput.value.length > 0) {
		login.style.display = 'none';
		game_box.style.display = 'block';
		player_name.innerHTML = nameInput.value;
	} else {
		nameInput.style.backgroundColor = '#df1717';
	}
});

function clickBubble(item) {
	item.remove();
	new Audio('bubble-sound.wav').play();
	if (Btn_easy.classList.contains('selected_level') || Btn_start.classList.contains('selected_level')) {
		score += 1;
	} else if (Btn_medium.classList.contains('selected_level')) {
		score += 2;
	} else {
		score += 3;
	}
	player_score.innerText = `${score}`;
}

function bubble(time) {
	clearInterval(show_bubble);
	player_Highscore.innerText = window.localStorage.getItem('player_Highscore');
	show_bubble = setInterval(() => {
		let newBall = document.createElement('span');
		newBall.classList.add('ball');
		ballBox.appendChild(newBall);
		newBall.addEventListener('click', () => {
			clickBubble(event.target);
		});
		let randomWeight = Math.floor(Math.random() * 160);
		let randomHeight = Math.floor(Math.random() * 180);
		newBall.style.left = randomWeight + 'px';
		newBall.style.top = randomHeight + 'px';

		if (document.querySelectorAll('.ball').length == 50) {
			clearInterval(show_bubble);
			alert(`Game Over\nYour Score:${score}`);
			localScore();
			ballBox.innerHTML = '';
			stopGame();
			player_Highscore.innerText = window.localStorage.getItem('player_Highscore');
			score = 0;
		}
	}, time);
}

function localScore() {
	if (+player_Highscore.innerHTML < +player_score.innerHTML) {
		window.localStorage.setItem('player_Highscore', player_score.innerText);
		player_Highscore.innerText = player_score.innerText;
	}
}

function selectedLevel() {
	btn.forEach((e) => {
		if (e == event.target) {
			e.classList.add('selected_level');
		} else {
			e.classList.remove('selected_level');
		}
	});
}

function stopGame() {
	clearInterval(show_bubble);
	player_Highscore.innerText = score;
}

Btn_start.addEventListener('click', () => {
	bubble(1000);
	selectedLevel();
});

Btn_easy.addEventListener('click', () => {
	bubble(1000);
	selectedLevel();
});

Btn_medium.addEventListener('click', () => {
	bubble(500);
	selectedLevel();
});

Btn_hard.addEventListener('click', () => {
	bubble(250);
	selectedLevel();
});

Btn_stop.addEventListener('click', () => {
	stopGame();
	selectedLevel();
});
