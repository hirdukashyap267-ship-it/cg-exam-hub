let current = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionNo = document.getElementById("questionNo");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("score");
const totalBox = document.getElementById("total");
const progressBar = document.getElementById("progressBar");
const timerBox = document.getElementById("timer");

totalBox.innerHTML = questions.length;

function loadQuestion() {

    clearInterval(timer);

    if (current >= questions.length) {

        questionNo.innerHTML = "🎉 Quiz Complete";

        question.innerHTML =
            "आपका अंतिम स्कोर : " +
            score + " / " + questions.length;

        options.forEach(function(btn) {
            btn.style.display = "none";
        });

        nextBtn.style.display = "none";

        result.innerHTML = "बहुत बढ़िया!";

        progressBar.style.width = "100%";
        progressBar.innerHTML = "100%";

        timerBox.innerHTML = "⏱ Quiz समाप्त";

        return;
    }

    const q = questions[current];

    questionNo.innerHTML =
        "प्रश्न " + (current + 1);

    question.innerHTML =
        q.question;

    options.forEach(function(btn, index) {

        btn.style.display = "block";

        btn.disabled = false;

        btn.className =
            "btn btn-outline-primary option";

        btn.innerHTML =
            q.options[index];

    });

    result.innerHTML = "";

    scoreBox.innerHTML = score;

    let progress =
        ((current + 1) / questions.length) * 100;

    progressBar.style.width =
        progress + "%";

    progressBar.innerHTML =
        Math.round(progress) + "%";

    startTimer();
}


function startTimer() {

    timeLeft = 30;

    timerBox.innerHTML =
        "⏱ Time : " + timeLeft + " sec";

    timer = setInterval(function() {

        timeLeft--;

        timerBox.innerHTML =
            "⏱ Time : " + timeLeft + " sec";

        if (timeLeft <= 0) {

            clearInterval(timer);

            result.innerHTML =
                "⏰ Time Over!";

            result.style.color = "red";

            options.forEach(function(btn) {
                btn.disabled = true;
            });

        }

    }, 1000);
}


function checkAnswer(index) {

    clearInterval(timer);

    options.forEach(function(btn) {
        btn.disabled = true;
    });

    if (index === questions[current].answer) {

        options[index].className =
            "btn btn-success option";

        result.innerHTML =
            "✅ सही उत्तर";

        result.style.color = "green";

        score++;

        scoreBox.innerHTML = score;

    } else {

        options[index].className =
            "btn btn-danger option";

        options[questions[current].answer].className =
            "btn btn-success option";

        result.innerHTML =
            "❌ गलत उत्तर";

        result.style.color = "red";

    }
}


function nextQuestion() {

    current++;

    loadQuestion();

}


loadQuestion();