var currentScore = document.querySelector("#currentScore");
var clear = document.querySelector("#clear");
var tryAgain = document.querySelector("#tryAgain");

// event listener to clear high scores
clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});

// read and display high scores in local storage
var scoresList = localStorage.getItem("scoresList");
scoresList = JSON.parse(scoresList);
if (scoresList !== null) {
  for (var i=0; i < scoresList.length; i++) {
    var createUl = document.createElement("ul");
    createUl.textContent = scoresList[i].initials + " " + scoresList[i].score;
    currentScore.appendChild(createUl);
  }
};

// event listener to return to main page
tryAgain.addEventListener("click", function() {
  window.location.replace('./index.html');
});