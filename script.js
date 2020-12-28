var score = 0;
var currentQIndex = 0;

var countdownTimer = document.querySelector("#countdownTimer");
var startTimer = document.querySelector("#start");
var main = document.querySelector("#main");
var wrapper = document.querySelector("#wrapper");

// seconds left is 15 seconds/question
var timeLeft = 60;
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
    var createDiv = document.createElement("rw");
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
    createDiv.textContent = "Finished! You got " + score + " questions out of 5 correct.";
  } else {
    renderQuestions(currentQIndex);
  }
  main.appendChild(createDiv);
};

// render summary (user's initials and score)
function showSummary() {
  main.innerHTML = "";
  countdownTimer.innerHTML = "";

  // display heading
  var createHeading = document.createElement("h1");
  createHeading.setAttribute("id", "createHeading");
  createHeading.textContent = "All Done!";
  main.appendChild(createHeading);

  // display score
  if (timeLeft >= 0) {
    var finalTime = timeLeft;
    var createShowScore = document.createElement("p");
    clearInterval(showTimer);
    createShowScore.textContent = "Your Final Score is: " + finalTime;
    main.appendChild(createShowScore);
  }

  // request initials
  // display label
  var createInitialsLabel = document.createElement("label");
  createInitialsLabel.setAttribute("id", "createInitialsLabel");
  createInitialsLabel.textContent = "Enter Initials: ";
  main.appendChild(createInitialsLabel);



  // display input box
  var createInput = document.createElement("input");
  createInput.setAttribute("type", "text");
  createInput.setAttribute("id", "initials");
  createInput.textContent = "";
  main.appendChild(createInput);

 

  // display submit button
  var createSubmit = document.createElement("button");
  createSubmit.setAttribute("type", "submit");
  createSubmit.setAttribute("id", "submit");
  createSubmit.textContent = "Submit";
  createSubmit.style.display = "block";
  createSubmit.style.textAlign = "center";
  main.appendChild(createSubmit);

  // submit button event listener to store initials to local storage
  createSubmit.addEventListener("click", function () {
    var initials = createInput.value;
    // validate if initials is left blank
    if (!initials) {
      createInitialsLabel.textContent =
        "Invalid entry! Please enter your initials.";
    } else {
      var finalScore = {
        initials: initials,
        score: finalTime,
      };

      // store score in local storage
      var scoresList = localStorage.getItem("scoresList");
      if (!scoresList) {
        scoresList = [];
      } else {
        scoresList = JSON.parse(scoresList);
      }
      scoresList.push(finalScore);

      var currentScore = JSON.stringify(scoresList);
      localStorage.setItem("scoresList", currentScore);

      // display scores on scores page
      window.location.replace("./scores.html");
    }
  });
};