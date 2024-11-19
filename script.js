let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

const questions = [
  { question: "Quanto é 5 + 3?", options: ["6", "8", "9"], answer: 1 },
  { question: "Quanto é 7 * 6?", options: ["42", "36", "48"], answer: 0 },
  { question: "Quanto é 12 ÷ 4?", options: ["2", "3", "4"], answer: 1 },
];

let currentQuestion;

function loadQuestion() {
  const quiz = document.getElementById("quiz");
  const questionElem = document.getElementById("question");
  const optionsElem = document.getElementById("options");

  currentQuestion = questions[Math.floor(Math.random() * questions.length)];

  questionElem.textContent = currentQuestion.question;
  optionsElem.innerHTML = currentQuestion.options
    .map((option, index) => `<label><input type="radio" name="option" value="${index}"> ${option}</label><br>`)
    .join("");

  quiz.style.display = "block";
  document.getElementById("feedback").textContent = "";
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');

  if (!selectedOption) {
    alert("Por favor, selecione uma resposta!");
    return;
  }

  if (parseInt(selectedOption.value) === currentQuestion.answer) {
    document.getElementById("feedback").textContent = "Resposta correta! Você pode jogar.";
    gameActive = true;
    document.getElementById("quiz").style.display = "none";
  } else {
    document.getElementById("feedback").textContent = "Resposta errada! Passa a vez.";
    switchPlayer();
    loadQuestion();
  }
}

function makeMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  document.querySelectorAll(".cell")[index].textContent = currentPlayer;

  if (checkWinner()) {
    document.getElementById("winner").textContent = `Jogador ${currentPlayer} venceu!`;
    gameActive = false;
    return;
  }

  switchPlayer();
  gameActive = false;
  loadQuestion();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winningCombinations.some(combination => 
    combination.every(index => board[index] === currentPlayer)
  );
}

loadQuestion();
