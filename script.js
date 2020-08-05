// Creating page elements and assigning appropriate quiz text
var body = $("body")
var header = $("header")
var formDiv = $(".form-section")
var resultList = $(".results-list")

// High Scores btn functionality
$(".high-scores").on("click", function () {

    var defaultItems = document.querySelectorAll(".default")
    for (d = 0; d < defaultItems.length; d++) {
        defaultItems[d].setAttribute("style", "Display: none")
    }

    renderHighScores()
})

// User's final score at the end of the quiz
var finalScore = 0

// Start quiz button listener
document.getElementById("start-btn").addEventListener("click", function () {

    var defaultItems = document.querySelectorAll(".default")
    for (d = 0; d < defaultItems.length; d++) {
        defaultItems[d].setAttribute("style", "Display: none")
    }

    buildQuiz()
})

// High Scoes page
function renderHighScores() {

    $(".score-page-btns").remove()

    var backBtn = $("<button>")
    backBtn.addClass("score-page-btns back-btn")
    backBtn.text("Back")
    header.append(backBtn)

    $(".back-btn").on("click", function () {

        resultList.css("display", "none")
        $(".score-page-btns").remove()

        var defaultItems = document.querySelectorAll(".default")
        for (d = 0; d < defaultItems.length; d++) {
            defaultItems[d].setAttribute("style", "Display: block")
        }
        $("h1").text("You think you know Javascript?!")

    })


    var clearScores = $("<button>")
    clearScores.addClass("score-page-btns clear-btn")
    clearScores.text("Clear scores")
    header.append(clearScores)

    $(".clear-btn").on("click", function () {

        localStorage.clear()

        for (var L = 0; $("li").length; L++){

        $("li").remove()
        }
    })

    formDiv.css("display", "none")
    resultList.css("display", "block")

    resultList.empty()

    for ( r = 0; r < localStorage.length; r++) {

        var resultRow = $("<li>")
        var storageKey = localStorage.key(r)
        var storageVal = localStorage.getItem(storageKey)
        resultRow.text(storageKey + " : " + storageVal)
        resultList.append(resultRow)

    }
    
    
}

// Form for user to submit name and score
function renderScoreSubmit() {

    formDiv.css("display", "inherit")

    $("h1").text("The Quiz is over! Your score: " + finalScore + ". Click the submit button if you would like to save your score")

    $("#submit-btn").on("click", function () {
        event.preventDefault()

        // Saved scores
        var userInput = document.getElementById("user-input")

        var userName = userInput.value.trim()
        var userFinalScore = finalScore

        localStorage.setItem(userName, userFinalScore)
        renderHighScores()
    })


}

function buildQuiz() {

    var testQuestions = [
        {
            question: "What symbols indicate a function/method?",
            answers: [
                "()",
                "[]",
                "/* */",
                "''"
            ],
            correctAnswer: "()"
        },
        {
            question: "Which is NOT type of variable?",
            answers: [
                "string",
                "number",
                "boolean",
                "commit"
            ],
            correctAnswer: "commit"
        },
        {
            question: "What, by default, separates indexes within an array?",
            answers: [
                "Spaces",
                "Nothing",
                "''",
                ","
            ],
            correctAnswer: ","
        },
        {
            question: "What is the extension of Javascript files?",
            answers: [
                ".javascript",
                ".java",
                ".js",
                ".script"
            ],
            correctAnswer: ".js"
        },
        {
            question: "When was Javascript created?",
            answers: [
                "2012",
                "1992",
                "1995",
                "2000"
            ],
            correctAnswer: "1995"
        },
        {
            question: "What was Javascript originally called?",
            answers: [
                "Windows.script",
                "Mocha",
                "Livescript",
                "Java"
            ],
            correctAnswer: "Livescript"
        },
        {
            question: "Which of the following is true?",
            answers: [
                "Javascript is a strictly typed language",
                "Javascript is multi-threaded",
                "In Javascript, 'Null' is an object",
                "A function cannot be assigned to a variable"
            ],
            correctAnswer: "In Javascript, 'Null' is an object"
        },
        {
            question: "Brendan Eich was hired by which company to create Javascript?",
            answers: [
                "Microsoft",
                "Apple",
                "Linux",
                "Netscape"
            ],
            correctAnswer: "Netscape"
        },
        {
            question: "Javascript is also known as which of the following?",
            answers: [
                "JS",
                "Java",
                "JScript",
                "None of these"
            ],
            correctAnswer: "JS"
        },
        {
            question: "Which of these returns a boolean?",
            answers: [
                "alert",
                "confirm",
                "prompt",
                "all of these"
            ],
            correctAnswer: "confirm"
        }
    ]

    // User Score to page
    var userScore = $("<h1>")
    userScore.attr("class", "user-score quiz")
    userScore.text(0)
    header.append(userScore)

    // Quiz Timer area
    var timeLeft = $("<h1>")
    timeLeft.attr("class", "timer quiz")
    header.append(timeLeft)

    var timer = 30

    // Timer Countdown and write to page
    function setTimer() {

        timeLeft.text(timer)

        var timerInterval = setInterval(function () {

            timer--;
            timeLeft.text(timer)

            if (timer < 20) {
                timeLeft.css("color", "orange")
            }

            if (timer < 10) {

                timeLeft.css("color", "red")
            }

            if (timer <= 0 ||
                q === testQuestions.length) {
                clearInterval(timerInterval)
                for (e = 0; e < quizEls.length; e++) {

                    quizEls[e].remove()
                }
                finalScore = userScore.text()

                renderScoreSubmit()
            }


        }, 1000);

    }


    // Question counter
    var q = 0

    // Quiz text variables to display on page for quiz

    var mainEl = $("<main>")
    mainEl.attr("class", "quiz")
    body.append(mainEl)

    var questionEl = $("<h1>")
    questionEl.attr("class", "quiz")
    mainEl.append(questionEl)

    var answerList = $("<ul>")
    answerList.attr("class", "quiz")
    mainEl.append(answerList)

    // Display currentQuestion text on page
    function renderQuestion() {

        if (q < testQuestions.length) {
            var currentQuestion = testQuestions[q].question
            questionEl.text(currentQuestion)
        }
    }

    // Display the answerChoices that correspond with the currentQuestion
    function renderAnswers() {

        if (q < testQuestions.length) {

            for (var a = 0; a < 4; a++) {

                var answerListItem = $("<li>")
                answerList.append(answerListItem)

                var ansBtn = $("<button>")
                ansBtn.attr("class", "ans-button")

                var answerChoices = testQuestions[q].answers
                ansBtn.text(answerChoices[a])
                answerListItem.append(ansBtn)
            }
        }

        handleClick()

    }

    // Click listener that also re-renders appropriate Question and answer set
    function handleClick() {
        $(".ans-button").on("click", function () {

            var currentRightAns = testQuestions[q].correctAnswer


            if ($(this).text() === currentRightAns) {

                userScore.text(Number(userScore.text() - -1))
            }
            else {

                timeLeft.text(Number(timeLeft.text() - 5))
                timer = timeLeft.text()
            }

            if (q < testQuestions.length) {

                $("li").remove()
                q++
                renderQuestion()
                renderAnswers()

                if (q < testQuestions - 1) {
                    currentRightAns = testQuestions[q].correctAnswer
                }
            }
        })
    }

    renderQuestion()
    renderAnswers()
    setTimer()

    var quizEls = $(".quiz")

    if ($(".quiz").css("display") === "none") {

        $(".quiz").css("display", "inherit")
    }
}