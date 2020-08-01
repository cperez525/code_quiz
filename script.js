var question1 = {
    question: "How are you today?",
    Incorrect1: "Meh",
    Incorrect2: "Terrible",
    Correct: "Alright",
    Incorrect3: "Great"
}

var question1Values = Object.values(question1)
console.log(question1Values)

var body = document.querySelector("body")

function writeQuestions() {

    var divEl = document.createElement("div")
    body.appendChild(divEl)

    var ulEl = document.createElement("ul")
    divEl.appendChild(ulEl)

    var question = document.createElement("li")
    question.textContent = question1Values[0]
    ulEl.appendChild(question)

    for (var i = 1; i < question1Values.length; i++) {

        var potAnswers = document.createElement("button")
        potAnswers.setAttribute("id","button")
        potAnswers.textContent = question1Values[i]
        question.appendChild(potAnswers)
    }
    
}

writeQuestions()








