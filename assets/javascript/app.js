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
var currentQuestionNumber = allTriviaQuestions.length;


//creates single question at a time
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

//creates answer for previously created single question
function formatAnswer(answerToBeFormated) {
  var answer =
  `<div class="card mx-auto mb-4" style="width: 80%">
    <h5 class="card-header">${answerToBeFormated.question}</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item form-check">
        <label class="form-check-label">${answerToBeFormated.correctAnswer}</label>
      </li>
    </ul>
  </div>`;
  return answer;
}

//changing checkAnswers to generic: checkAnswer (checks single q/a at a time)
function checkAnswer(questionAnswerToBeChecked) {
    if (!$('input[name=radio-question]').is(':checked')) {
      unAnswered++;
      return '<p class="answer-checked">You failed to select an answer!<br>(which is worse than selecting the incorrect answer)</p><br><h4 class="lead">The correct answer was:</h4>';
    } else {
      if ($('input[name=radio-question]:checked').val() === questionAnswerToBeChecked.correctAnswer) {
        correctAnswers++;
        return '<p class="answer-checked">You\'re so smart.<br>You selected the correct answer!</p><br>';
      } else {
        inCorrectAnswers++;
        return '<p class="answer-checked">Opps!<br>You selected the incorrect answer.</p><br><h4 class="lead">The correct answer was:</h4>';
      }
    }
}

//starts/resets game - leads to: triviaQuestions()
function triviaStart() {
  $("#countdown-timer").empty();
  $(".footer").empty();
  correctAnswers = 0;
  inCorrectAnswers = 0;
  unAnswered = 0;
  $("#trivia-questions").html("<h3>Welcome! Welcome! Welcome!</h3>").append("<p>In this More Advanced Trivia Game, Ellie will present you with a single question at a time. <br> You will be given a set amount of time to answer that question. Once you have either selected an answer, or time runs out, you will shown the correct answer before moving on to the next question. <br> Are you ready to play?</p>");
  $("#trivia-questions").append("<button id='button-trivia-start' class='btn btn-info'>Start</button>");
  $("#button-trivia-start").click(triviaQuestions);
}

//calls startCountDown();
function triviaQuestions() {
  countdown = 6;
  $("#countdown-timer").html("<p>Time Remaining: <span id='timer'>" + countdown + "</span> seconds.</p>");
  startCountDown(triviaAnswers);
  currentQuestionNumber--;

  $("#trivia-questions").html(formatQuestion(allTriviaQuestions[currentQuestionNumber]));

  $(".footer").html('<p>Trivia Questions were sourced from: <a href="http://www.petcarefoundation.org/trivia.asp">petcarefoundation.com</a> and <a href="https://www.care.com/c/stories/6045/101-amazing-cat-facts-fun-trivia-about-your-feline-friend/">care.com</a></p>');
}

//leads to: triviaAnswers or triviaQuestions depending upon callback given
function startCountDown(callThisLater) {
   countdown--;
   $("#timer").html(countdown);
   countdownTimer = setTimeout(function () {
    startCountDown(callThisLater)
   }, 1000);

   if (countdown === 0) {
     clearTimeout(countdownTimer);
     callThisLater();
   }
}

//clears countdownTimer + updates html with answer to single trivia question
function triviaAnswers() {
  countdown = 4;
  $("#countdown-timer").empty();
  $("#trivia-questions").html(checkAnswer(allTriviaQuestions[currentQuestionNumber])).append(formatAnswer(allTriviaQuestions[currentQuestionNumber]));
  continueOrEnd();
}

//either calls triviaQuestions() or finalTally()
function continueOrEnd() {
  if (currentQuestionNumber > 0) {
    startCountDown(triviaQuestions);
  } else {
    finalTally();
  }
}

//shows final score and offers play again button
function finalTally() {
  $("#countdown-timer").empty();
  $("#trivia-questions").html("<h3>Alright, let's see how you did!</h3>").append('<p>Correct Answers: ' + correctAnswers + '<br>Incorrect Answers: ' + inCorrectAnswers + '<br>Unanswered: ' + unAnswered + '</p>');
  $("#trivia-questions").append("<button id='button-trivia-play-again' class='btn btn-success'>Play Again</button>");
  $("#button-trivia-play-again").click(triviaStart);
}

$(document).ready(function(){
  triviaStart();

});
