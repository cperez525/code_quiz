
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
        correctAnswer: "function"
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
            "funcscript",
            "Java"
        ],
        correctAnswer: "Mocha"
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
    }

]

// Question counter
var q = 0

// Quiz text variables to display on page for quiz
var currentQuestion = testQuestions[q].question
var currentRightAns = testQuestions[q].correctAnswer

// Creating page elements and assigning appropriate quiz text
var body = $("body")

var mainEl = $("<main>")
body.append(mainEl)

var questionEl = $("<h1>")
mainEl.append(questionEl)

var answerList = $("<ul>")
mainEl.append(answerList)

function renderQuestion() {

    var currentQuestion = testQuestions[q].question
    questionEl.text(currentQuestion)
}

function renderAnswers() {
    for (var a = 0; a < 4; a++) {


        var answerListItem = $("<li>")
        answerList.append(answerListItem)

        var ansBtn = $("<button>")
        ansBtn.attr("id", "button")

        var answerChoices = testQuestions[q].answers
        ansBtn.text(answerChoices[a])
        answerListItem.append(ansBtn)

        console.log($("button").text())

        handleClick()
    }
}

function handleClick() {
    $("button").on("click", function () {

        console.log($(this).text())
        q++

        if (q < testQuestions.length) {

            $("li").remove()

            renderQuestion()
            renderAnswers()
            console.log($("button").text())
        }
    })
}
renderQuestion()
renderAnswers()




