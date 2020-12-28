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
        showScores();
        countdownTimer.textContent = "Time is up!";
      }
    }, 1000);
  }
  renderQuestions(currentQIndex);
});

