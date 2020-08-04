// Creating page elements and assigning appropriate quiz text
var body = $("body")
var header = $("header")

// Start quiz button listener
document.getElementById("start-btn").addEventListener("click", function () {

    var defaultItems = document.querySelectorAll(".default")
    for (d = 0; d < defaultItems.length; d++) {
        defaultItems[d].setAttribute("style", "Display: none")
    }

    buildQuiz()
})

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

    // User Score
    var userScore = $("<h1>")
    userScore.attr("class", "user-score")
    userScore.text(0)
    header.append(userScore)

    // Quiz Timer
    var timeLeft = $("<h1>")
    timeLeft.attr("class", "timer")
    header.append(timeLeft)

    var timer = 31

    function setTimer() {

        var timerInterval = setInterval(function () {

            timer--;
            timeLeft.text(timer)

            if (timer < 10) {

                timeLeft.attr("style", "color: red")
            }

            if (timer === 0) {
                clearInterval(timerInterval)
            }

        }, 1000);
    }
    
    setTimer()


    // Question counter
    var q = 0

    // Quiz text variables to display on page for quiz

    var mainEl = $("<main>")
    mainEl.attr("class", "quiz")
    body.append(mainEl)

    var questionEl = $("<h1>")
    mainEl.append(questionEl)

    var answerList = $("<ul>")
    mainEl.append(answerList)

    // Display currentQuestion text on page
    function renderQuestion() {

        var currentQuestion = testQuestions[q].question
        questionEl.text(currentQuestion)
    }

    // Display the answerChoices that correspond with the currentQuestion
    function renderAnswers() {
        for (var a = 0; a < 4; a++) {

            var answerListItem = $("<li>")
            answerList.append(answerListItem)

            var ansBtn = $("<button>")
            ansBtn.attr("class", "ans-button")

            var answerChoices = testQuestions[q].answers
            ansBtn.text(answerChoices[a])
            answerListItem.append(ansBtn)
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
                currentRightAns = testQuestions[q].correctAnswer
            }
        })
    }

    renderQuestion()
    renderAnswers()
}