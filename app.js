
// Single state object

var state = {
    items: [
      {   
        questionText: "What is ProteusThemes' primary focus?",
        choices: ["Well thought-out, easy-to-use niche themes for small businesses", "Multipurpose themes that can be used for any kind of industry or purpose.", "Beautifully designed themes for blogs, newspapers and creative businesses.", "None of these"],
        correctChoiceIndex: 0,
        userChoiceIndex: undefined,
        correctAnswerText: "Yay, this is correct.",
        falseAnswerText: "Your answer is not correct. ProteusThemes crafts niche themes for small businesses."
      }, 
      {  	
        questionText: "Who founded ProteusThemes?",
        choices: ["Primoz Cigler", "Jaka Smid", "Primoz Cigler and Jaka Smid", "None of these"],
        correctChoiceIndex: 2,
        userChoiceIndex: undefined,
        correctAnswerText: "Yay, this is correct. Primoz is a developer and Jaka is the designer, both are co-founders.",
        falseAnswerText: "Your answer is not correct. The correct answer is Primoz Cigler and Jaka Smid."
      },
      {
        questionText: "What aspect of WordPress themes is most important to us?",
        choices: ["Support", "Quality of code", "Design", "All of the above"],
        correctChoiceIndex: 3,
        userChoiceIndex: undefined,
        correctAnswerText: "Yay, this is correct!",
        falseAnswerText: "Unfortunately, this is not correct."
      },
      {
        questionText: "How old is ProteusThemes?",
        choices: ["1 year", "2 years", "3 years", "4 years"],
        correctChoiceIndex: 3,
        userChoiceIndex: undefined,
        correctAnswerText: "Yay, this is correct!",
        falseAnswerText: "Unfortunately, this is not correct."
      },
      {
        questionText: "Which is our go-to builder?",
        choices: ["We have our own proprietary builder", "Page Builder by SiteOrigin", "Visual Composer by WPBakery", "Beaver Builder"],
        correctChoiceIndex: 1,
        userChoiceIndex: undefined,
        correctAnswerText: "Yay, this is correct!",
        falseAnswerText: "Unfortunately, this is not correct."
      },
      {
        questionText: "What is the easiest way to import demo content?",
        choices: ["With One Click Demo Import plugin", "Dashboar > Tools > Import ","With WordPress importer", "There's no easy way to do it. It's best to start building from scratch."],
        correctChoiceIndex: 0,
        userChoiceIndex: undefined,
        correctAnswerText: "Yay, this is correct! One click demo import plugin, developed by yours truly, doesn't require any additional settings to recreate a demo of any template.", // 
        falseAnswerText: "Unfortunately, this is not correct."
      },
      {
        questionText: "Which one of our themes is NOT responsive?",
        choices: ["What is responsive?", "Readable", "HairPress", "It's a trick question. All our themes are responsive."],
        correctChoiceIndex: 3,
        userChoiceIndex: undefined,
        correctAnswerText: "Yay, this is correct!",
        falseAnswerText: "Unfortunately, this is not correct."
       }
      ],
    currentQuestion: 0, 
    currentScore: 0

  //
};
//console.log(state.items[state.currentQuestion].choices);
// State modification functions


var logUserAnswer = function(state, choiceIndex) {
  state.items[state.currentQuestion].userChoiceIndex = choiceIndex;
  console.log('logs answer no. ' + state.items[state.currentQuestion].userChoiceIndex);
}

var incrementQuestion = function(state) {
  return state.currentQuestion++;
}

var increaseScore = function(state, choiceIndex) {
   if (choiceIndex == state.items[state.currentQuestion].correctChoiceIndex) {
      return state.currentScore++
    
   }
}

// Render functions

var displayQuestion = function(state, element) {
  //  while (state.currentQuestion < 6) { 
    
    var questionHTML = '<h3 class="display-question">' + state.items[state.currentQuestion].questionText + '</h3>'; 
    
    element.html(questionHTML);
//  }
} 

var displayChoices = function(state, element) {
 
  var choiceHTML = state.items[state.currentQuestion].choices.map(function(choice, index) {
       var input = ['<div class="choice-one"><input type="radio" class="choice-item" name="choices" id="r' + index + '" value="' + index + '">' +
       '<label for="choices">' + choice + '</label></div>'];

      console.log(input);
      return input.join('<br>');
    });
  console.log(typeof choiceHTML);

  element.html(choiceHTML);
}

var displayButton = function(state, element) {
  return element.html('<button class="answer" type="submit">Submit answer</button></div>');
  
} 

var displayNextButton = function(state, element) {
  return element.html('<button class="next" type="submit">Next question</button></div>');
}

var displayProgress = function(state, element) {
  return element.html('Question ' + (state.currentQuestion + 1) + '/10');
}

var displayScore = function(state, element) {
  console.log('state.currentScore: ' + state.currentScore);
  return element.html('Current score: ' + state.currentScore + ' correct answers');
}

//state.items[state.currentQuestion].correctChoiceIndex)
var displayAnswer = function(state, element) {
 
  var correctChoice = state.items[state.currentQuestion].correctChoiceIndex;
  var userChoice = state.items[state.currentQuestion].userChoiceIndex;
  if (correctChoice == userChoice) {
    return element.html('<p class="correct">' + state.items[state.currentQuestion].correctAnswerText + '</p>');
  } 

  else {
    return element.html('<p class="incorrect">' + state.items[state.currentQuestion].falseAnswerText + '</p>');
  } 
 
}  

var displayFinalScreen = function(state, element) {
  return element.html('<p>You have reached the end of the quiz.</p>');
} 

var displayFinalScore = function(state, element) {
  return element.html('<p>Your final score is: ' + state.currentScore + '</p>');
}

var displayRepeatButton = function(state, element) {
  return element.html('<button class="repeat-quiz">Start again</button>');
}
 
   
        
	       

// Event listeners

//starts quiz

$('#js-start').submit(function(event) {
	event.preventDefault();
	
  
  displayQuestion(state, $('.replace-wrapper'));
  displayChoices(state, $('.choices'));
  displayButton(state, $('.button'));
  displayProgress(state, $('.whereabout'));
});

//submits question

$('main').on('submit', '#js-form', function(event) {
  event.preventDefault();
  logUserAnswer(state, $('input[name=choices]:checked').val());
  increaseScore(state, $('input[name=choices]:checked').val());
  
  displayAnswer(state, $('.choices'), $('input[name=choices]:checked').val());
  displayNextButton(state, $('.button'));
  displayScore(state, $('.score'));
  
 
  
});

//goes to next question
$('.button').on('click', '.next', function(event) {
  

  if (state.currentQuestion < (state.items.length - 1)) {
    console.log("current question: " + state.currentQuestion);
    console.log("total number of questions: " + state.items.length);
    incrementQuestion(state);
    displayQuestion(state, $('.replace-wrapper'));
    displayChoices(state, $('.choices'));
    displayButton(state, $('.button'));
  }
  else {
    displayFinalScreen(state, $('.wrapper'));
    displayFinalScore(state, $('.choices'));
    displayRepeatButton(state, $('.button'));
  }
  displayProgress(state, $('.whereabout'));
  displayScore(state, $('.score'));
});

//goes back to start
$('main').on('click', '.repeat-quiz', function(event) {
  location.reload();
});  







/*
I thought maybe a mini specification outline of functionality might help. I have reached out to another mentor too and will discuss with her on Friday what other ways we explain state management.
 
1. Two main objects needed, the STATE object and the ELEMENTS object
   a. STATE: contains multiple key pair values including questions (each containing 1 question, 4 answer choices, and the correct answer reference), current question location, feedback, score, router position 
   b. ELEMENTS: contain selector info for each element in the html that will get manipulated
2. Next we render the function flow:
   a. start quiz - display start button
   b. display first question
   c. display question answers
   b. display submit button - listen for answer given if form submission
   e. check for correct/false answer
      e.1. display feedback and tally score
      e.2. display next question button
   f. display next question

To better answer your question on labels (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label):

Labels are not themselves directly associated with forms. 
They are only indirectly associated with forms through the controls with which they're 
associated. This means the for attribute is the link to the form field.

Questions:
How to hide the 'start quiz' button?

*/