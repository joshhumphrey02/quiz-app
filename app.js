const startQuizButton = document.querySelector('#start-quiz');
const welcomeUser = document.querySelector('#welcome-user');
const questionContainer = document.querySelector('#question-container');
const userAnswerInput = document.querySelector('#user-answer');
const submitAnswerButton = document.querySelector('#submit-answer');
const scoreDisplay = document.querySelector('#score');
const retakeQuizButton = document.querySelector('#retake-quiz');
const resultsContainer = document.querySelector('#results-container');
const usersTableBody = document.querySelector('#users-table-body');
const forms = document.querySelectorAll('form');
const pages = document.querySelectorAll('.pages');
const cancels = document.querySelectorAll('#cancel');
const leaderButtons = document.querySelectorAll('#leader');
const totalUsers = document.querySelector('#users');

const questions = [
	{ question: 'What is the capital of France?', correctAnswer: 'paris' },
	{ question: 'What is 2 + 2?', correctAnswer: '4' },
	{ question: 'What is the capital of Japan?', correctAnswer: 'tokyo' },
	{ question: 'What color is the sky on a clear day?', correctAnswer: 'blue' },
	{ question: 'How many days are there in a week?', correctAnswer: '7' },
];

let currentQuestionIndex = 0;
let score = 0;
let userName = '';
let userId = '';
let activePage = 2;

forms.forEach((form) =>
	form.addEventListener('submit', (e) => e.preventDefault())
);
function changePage(a) {
	localStorage.setItem('activePage', a);
	pages.forEach((page, i) => {
		i + 1 != a ? page.classList.add('hide') : page.classList.remove('hide');
	});
	if (a == 2) {
		welcomeUser.textContent = `Welcome, ${localStorage.getItem(
			'userName'
		)} 💪!`;
		showQuestion(currentQuestionIndex);
	}
	if (a == 3) displayAllUsers();
}
changePage(activePage);

// Initialize the quiz
startQuizButton.addEventListener('click', () => {
	const userNameInput = document.querySelector('#user-name').value.trim();
	if (userNameInput === '') {
		alert('Please enter your name to start the quiz!');
		return;
	}
	userName = userNameInput;
	localStorage.setItem('userName', userName);
	userId = generateUniqueId();
	changePage(2);
	welcomeUser.textContent = `Welcome, ${userName} 💪!`;

	showQuestion(currentQuestionIndex);
});

// Show a question
function showQuestion(questionIndex) {
	const questionData = questions[questionIndex];
	questionContainer.textContent = questionData.question;
	userAnswerInput.value = ''; // Clear the input field for the new question
	submitAnswerButton.style.display = 'block';
}

// Handle answer submission
submitAnswerButton.addEventListener('click', () => {
	const userAnswer = userAnswerInput.value.trim().toLowerCase();
	const correctAnswer =
		questions[currentQuestionIndex].correctAnswer.toLowerCase();

	if (userAnswer === '') {
		alert('Please type your answer before submitting!');
		return;
	}

	if (userAnswer === correctAnswer) {
		score++;
	}

	if (currentQuestionIndex < questions.length - 1) {
		currentQuestionIndex++;
		showQuestion(currentQuestionIndex);
	} else {
		displayResults();
	}
	const tab = document.querySelector('#ques-tab');
	tab.textContent = currentQuestionIndex;
});

// Display the results and show the retake quiz option
function displayResults() {
	scoreDisplay.textContent = `Your score: ${score}/${questions.length}`;
	scoreDisplay.style.display = 'block';
	retakeQuizButton.style.display = 'block';
	submitAnswerButton.style.display = 'none';

	saveUserResults(userId, userName, score);
	displayAllUsers();
	resetQuiz();
}
retakeQuizButton.addEventListener('click', changePage(1));
// Reset the quiz
function resetQuiz() {
	currentQuestionIndex = 0;
	score = 0;
	userName = '';
	userId = '';
	document.querySelector('#user-name').value = '';
}

// Generate a unique ID for each user
function generateUniqueId() {
	return Math.floor(Math.random() * 999);
}

// Save user results to localStorage
function saveUserResults(id, name, score) {
	const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
	users.push({ id, name, score });
	localStorage.setItem('quizUsers', JSON.stringify(users));
}

// Display all users who have taken the quiz
function displayAllUsers() {
	const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
	usersTableBody.innerHTML = '';

	users.forEach((user) => {
		const row = document.createElement('tr');
		row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.score}</td>`;
		usersTableBody.appendChild(row);
	});

	resultsContainer.style.display = 'block';
}

cancels.forEach((item) =>
	item.addEventListener('click', () => {
		if (localStorage.getItem('activePage') != 1) {
			changePage(1);
		}
	})
);
leaderButtons.forEach((item) =>
	item.addEventListener('click', () => changePage(3))
);

totalUsers.textContent =
	JSON.parse(localStorage.getItem('quizUsers'))?.length ?? 0;

localStorage.setItem('username', 'Emma');
