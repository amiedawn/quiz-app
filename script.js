var score = 0;
var currentQIndex = 0;

var countdownTimer = document.querySelector("#countdownTimer");
var startTimer = document.querySelector("#start");
var main = document.querySelector("#main");
var wrapper = document.querySelector("#wrapper");

// seconds left is 15 seconds/question
var timeLeft = 76;
// hold interval
var showTimer = 0;
// 10 second penalty per wrong question
var penalty = 10;
// new element
var ulCreate = document.createElement("ul");

// quiz questions array
var arrQuestions = [
  {
    showQuestion: 
      "1.  Commonly used data types DO NOT include: ",
    choices: [
      "a.  strings", 
      "b.  booleans", 
      "c.  alerts", 
      "d.  numbers"
    ],
    rightChoice: "c.  alerts"
  },
  {
    showQuestion:
      "2.  A very useful tool during development and debugging for printing content to the debugger is: ",
    choices: [
      "a.  JavaScript",
      "b.  terminal/bash",
      "c.  for loops",
      "d.  console.log",
    ],
    rightChoice: "d.  console.log"
  },
  {
    showQuestion:
      "3.  String values must be enclosed within _____________ when being assigned to variables. ",
    choices: [
      "a.  quotes",
      "b.  curly brackets",
      "c.  parentheses",
      "d.  square brackets",
    ],
    rightChoice: "a.  quotes"
  },
  {
    showQuestion:
      "4.  Arrays in JavaScript can be used to store _____________ .",
    choices: [
      "a.  numbers and strings",
      "b.  other arrays",
      "c.  booleans",
      "d.  all of the above",
    ],
    rightChoice: "d.  all of the above"
  },
  {
    showQuestion:
      "5.  The condition in an if/else statement is enclosed with __________ .",
    choices: [
      "a.  quotes",
      "b.  curly brackets",
      "c.  parentheses",
      "d.  square brackets",
    ],  
    rightChoice: "c.  parentheses"
  },
];

// start
startTimer.addEventListener("click", function () {
  if (showTimer === 0) {
    showTimer = setInterval(function () {
      timeLeft = timeLeft - 1;
      countdownTimer.textContent = "Time: " + timeLeft;

      if (timeLeft <= 0) {
        clearInterval(showTimer);
        showSummary();
        countdownTimer.textContent = "Time is up!";
      }
    }, 1000);
  }
  renderQuestions(currentQIndex);
});

// render questions and answers
function renderQuestions(currentQIndex) {
  // initialize variables
  main.innerHTML = "";
  ulCreate.innerHTML = "";

  // render each question
  for (var i=0; i < arrQuestions.length; i++) {
    var renQuestion = arrQuestions[currentQIndex].showQuestion;
    var renChoices = arrQuestions[currentQIndex].choices;
    main.textContent = renQuestion;
  }
  
  // render choices for each question
  renChoices.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    main.appendChild(ulCreate);
    ulCreate.appendChild(listItem);
    listItem.addEventListener("click", (answerRW));
  })
};

// compare choice chosen to correct answer
function answerRW(event) {
  var answer = event.target;
  if (answer.matches("li")) {
    var createDiv = document.createElement("div");
    createDiv.setAttribute("id", "createDiv");
    // answer is correct
    if (answer.textContent === arrQuestions[currentQIndex].rightChoice) {
      score = score + 1;
      createDiv.textContent = "Right! The answer is: " + arrQuestions[currentQIndex].rightChoice;
    } else {
      // answer is incorrect: deduct 10 seconds
      timeLeft = timeLeft - penalty;
      createDiv.textContent =
        "Wrong! The correct answer is : " + arrQuestions[currentQIndex].rightChoice;
    }
  }
  // move to next question
  currentQIndex = currentQIndex + 1;

  if (currentQIndex >= arrQuestions.length) {
    // quiz is finished, show user's initials and score
    showSummary();
    createDiv.textContent = "Finished! You got " score + "questions out of 5 correct!"
  } else {
    renderQuestions(currentQIndex);
  }
  main.appendChild(createDiv);
};

