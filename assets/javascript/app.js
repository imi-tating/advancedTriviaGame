// "#countdown-timer"
// "#trivia-questions"

var countdown;
var countdownTimer;
var allTriviaQuestions = [{
  question: "A cat has how many rows of whiskers?",
  correctAnswer: "four",
  option01: "two",
  option02: "three",
  option03: "four"
}, {
  question: "A cat will spend nearly what percentage of its life grooming itself?",
  correctAnswer: "30%",
  option01: "20%",
  option02: "30%",
  option03: "40%"
}, {
  question: "With the exception of polydactyl cats, cats are supposed to have how many toes?",
  correctAnswer: "18 toes",
  option01: "10 toes",
  option02: "18 toes",
  option03: "20 toes"
}, {
  question: "Cats move both of their right feet first, then move both of their left feet.<br>Only two other animals walk this way. Which of the following is NOT one of them?",
  correctAnswer: "elephants",
  option01: "elephants",
  option02: "camels",
  option03: "giraffes"
}, {
  question: "Cats can jump up to how many times their length?",
  correctAnswer: "six",
  option01: "three",
  option02: "four",
  option03: "six"
}];

var correctAnswers;
var inCorrectAnswers;
var unAnswered;

var testQuestion = allTriviaQuestions[0];

//changing createQuestion to generic: format question
function formatQuestion(questionToBeFormated) {
  var question =
  `<div class="card mx-auto mb-4" style="width: 80%">
    <h5 class="card-header">${questionToBeFormated.question}</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item form-check">
        <input
          class="form-check-input"
          type="radio"
          name="radio-question"
          id="radio-option01"
          value="${questionToBeFormated.option01}">
        <label class="form-check-label"
          for="radio-option01">
          ${questionToBeFormated.option01}
        </label>
      </li>
      <li class="list-group-item form-check">
        <input
          class="form-check-input"
          type="radio"
          name="radio-question"
          id="radio-option02"
          value="${questionToBeFormated.option02}">
        <label class="form-check-label"
          for="radio-option02">
          ${questionToBeFormated.option02}
        </label>
      </li>
      <li class="list-group-item form-check">
        <input
          class="form-check-input"
          type="radio"
          name="radio-question"
          id="radio-option03"
          value="${questionToBeFormated.option03}">
        <label class="form-check-label"
          for="radio-option03">
          ${questionToBeFormated.option03}
        </label>
      </li>

    </ul>
  </div>`;

  return question;
}

//NOT USED CURRENTLY
function createAnswer() {
  var answer = "";
  for (var i = 0; i < allTriviaQuestions.length; i++) {
    answer += '<div class="card mx-auto mb-4" style="width: 80%"><h5 class="card-header">' + allTriviaQuestions[i].question + '</h5><ul class="list-group list-group-flush"><li class="list-group-item form-check"><label class="form-check-label">' + allTriviaQuestions[i].correctAnswer + '</label></li></ul></div>';
  }
  return answer;
}

function checkAnswers() {
  for (var i = 0; i < allTriviaQuestions.length; i++) {
    var currentRadioName = "questionRadios-" + i;
    if (!$('input[name=' + currentRadioName + ']').is(':checked')) {
      unAnswered++;
    } else {
      if ($('input[name=' + currentRadioName + ']:checked').val() === allTriviaQuestions[i].correctAnswer) {
        correctAnswers++;
      } else {
        inCorrectAnswers++;
      }
    }
  }
}

//starts/resets game - leads to: triviaQuestions()
function triviaStart() {
  $("#countdown-timer").empty();
  $(".footer").empty();
  countdown = 5;
  correctAnswers = 0;
  inCorrectAnswers = 0;
  unAnswered = 0;
  $("#trivia-questions").html("<h3>Welcome! Welcome! Welcome!</h3>").append("<p>In this More Advanced Trivia Game, Ellie will present you with a single question at a time. <br> You will be given a set amount of time to answer that question. Once you have either selected an answer, or time runs out, you will shown the correct answer before moving on to the next question. <br> Are you ready to play?</p>");
  $("#trivia-questions").append("<button id='button-trivia-start' class='btn btn-success'>Start</button>");
  $("#button-trivia-start").click(triviaQuestions);
}

function triviaQuestions() {
  $("#countdown-timer").html("<p>Time Remaining: <span id='timer'>" + countdown + "</span> seconds.</p>");
  startCountDown();

  $("#trivia-questions").html(formatQuestion(testQuestion));

  $(".footer").html('<p>Trivia Questions were sourced from: <a href="http://www.petcarefoundation.org/trivia.asp">petcarefoundation.com</a> and <a href="https://www.care.com/c/stories/6045/101-amazing-cat-facts-fun-trivia-about-your-feline-friend/">care.com</a></p>');
}

function startCountDown() {
   countdown--;
   $("#timer").html(countdown);
   countdownTimer = setTimeout(startCountDown, 1000);

   if (countdown === 0) {
     clearTimeout(countdownTimer);
     triviaAnswers();
   }
}

function triviaAnswers() {
  checkAnswers();
  $("#countdown-timer").empty();
  $("#trivia-questions").html("<h3>Alright, let's see how you did!</h3>").append('<p>Correct Answers: ' + correctAnswers + '<br>Incorrect Answers: ' + inCorrectAnswers + '<br>Unanswered: ' + unAnswered + '</p>');
  $("#trivia-questions").append("<button id='button-trivia-play-again' class='btn btn-success'>Play Again</button>");
  $("#button-trivia-play-again").click(triviaStart);
}

$(document).ready(function(){
  triviaStart();

});
