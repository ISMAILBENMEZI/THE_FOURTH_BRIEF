const bad = document.getElementById("bad");
const form = document.getElementById("info_form");
const infoSection = document.getElementById("info_section");
const quizInfo = document.getElementById("quiz_info");
const quizForm = document.getElementById("quiz_form");
const mySection = document.getElementById("display_info");
const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regex = /^\d{10}$/;

let questionAnswers = {
  1: {
    qustion: "1. What is the function of HTML?",
    answers: [
      "Adding colors and fonts to the page",
      "Creating the structure and content of the page",
      "Adding interaction and animations",
      "Running databases",
    ],
    correctAnswer: 2,
  },
  2: {
    qustion: "2. Which tag is used to create a link?",
    answers: ["<link>", "<a>", "<p>", "<div>"],
    correctAnswer: 2,
  },
  3: {
    qustion: "3. Which tag is used to create a paragraph?",
    answers: ["<h1>", "<span>", "<p>", "<ul>"],
    correctAnswer: 3,
  },
  4: {
    qustion: "4. What is the function of CSS?",
    answers: [
      "Controlling the structure of the page",
      "Adding colors, style, and design",
      "Running calculations and logic",
      "Creating HTML files",
    ],
    correctAnswer: 2,
  },
  5: {
    qustion:
      "5. Which of the following is used to change the text color in CSS?",
    answers: ["font-style", "color", "background-color", "text-decoration"],
    correctAnswer: 2,
  },
  6: {
    qustion: "6. What is the difference between HTML and JavaScript?",
    answers: [
      "HTML adds colors, JavaScript creates structure",
      "There is no difference",
      "HTML is for storage, JavaScript is for links",
      "HTML is for structure, JavaScript is for interaction ",
    ],
    correctAnswer: 4,
  },
  7: {
    qustion:
      "7. Which of the following is used to change the content of an element using JavaScript?",
    answers: [
      "document.getElementById ('id').innerHTML",
      "document.style.color",
      "document.write()",
      "window.alert()",
    ],
    correctAnswer: 1,
  },
  8: {
    qustion: "8. Which of the following is used to add a comment in HTML?",
    answers: ["/* comment */", "// comment", "<!-- comment --> ", "# comment"],
    correctAnswer: 3,
  },
  9: {
    qustion:
      "9. Which of the following is used to make an HTML page interactive?",
    answers: ["CSS", "HTML", "JavaScript", "XML"],
    correctAnswer: 3,
  },
  10: {
    qustion: "10. Which of the following is correct about CSS?",
    answers: [
      "It cannot be changed after the page is created",
      "It never affects the page",
      "It is used only for creating tables",
      "It can be applied to HTML elements to change their appearance",
    ],
    correctAnswer: 4,
  },
};

let currentQuestion = 1;
quizForm.style.display = "none";

form.addEventListener("submit", function (refresh) {
  refresh.preventDefault();

  const firstName = document.getElementById("Fname").value.trim();
  const lastName = document.getElementById("Lname").value.trim();
  const age = Number(document.getElementById("Age").value);
  const phone = document.getElementById("Pnumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.getElementById("gender").value;

  if (!firstName || !lastName || !age || !phone || !email || gender === "") {
    bad.textContent = "Please fill in all fields";
    bad.style.backgroundColor = "rgba(255, 255, 255, 1)";
    bad.style.color = "red";
    return;
  }
  if (age < 15) {
    bad.textContent = "Age must be 15 or older";
    bad.style.backgroundColor = "rgba(255, 255, 255, 1)";
    bad.style.color = "red";
    return;
  }

  if (!pattern.test(email)) {
    bad.textContent = "Invalid email address";
    bad.style.backgroundColor = "rgba(255, 255, 255, 0.94)";
    bad.style.color = "red";
    return;
  }

  if (!regex.test(phone)) {
    bad.textContent = "Invalid phone number";
    bad.style.backgroundColor = "rgba(255, 255, 255, 1)";
    bad.style.color = "red";
    return;
  }

  const userData = { firstName, lastName, age, phone, email, gender };
  localStorage.setItem("userInfo", JSON.stringify(userData));
  localStorage.setItem("currentSection", "quiz");

  bad.textContent = "Information saved successfully ✅";
  bad.style.backgroundColor = "rgba(255, 255, 255, 1)";
  bad.style.color = "rgb(9, 255, 0)";
  infoSection.style.display = "none";
  quizInfo.style.display = "flex";
});

window.addEventListener("DOMContentLoaded", function () {
  const currentSection = localStorage.getItem("currentSection");
  if (currentSection === "quiz") {
    infoSection.style.display = "none";
    quizInfo.style.display = "flex";
  } else {
    infoSection.style.display = "flex";
    quizInfo.style.display = "none";
  }
});

const Backbutton = document.getElementById("Back_quiz");
const startQuiz = document.getElementById("start_quiz");

Backbutton.addEventListener("click", function () {
  infoSection.style.display = "block";
  quizInfo.style.display = "none";
});

startQuiz.addEventListener("click", function () {
  quizInfo.style.display = "none";
  quizForm.style.display = "flex";
  showQuestion();
  startTimer();
});

const errorMsg = document.getElementById("error_msg");
let result = 0;
let wrong = 0;

function showQuestion() {
  let question = questionAnswers[currentQuestion];

  document.getElementById("question_text").textContent = question.qustion;

  let labels = document.querySelectorAll(".form_answers label span");
  for (let i = 0; i < 4; i++) {
    labels[i].textContent = question.answers[i];
  }
}

let countDown = 0;
let countDownResult = 0;
function startTimer() {
  countDown = 30;
  document.getElementById("count_down").textContent = countDown;

  timer = setInterval(function () {
    countDown--;
    document.getElementById("count_down").textContent = countDown;

    if (countDown <= 10) {
      document.getElementById("count_down").style.color = "red";
    }
    if (countDown === 0) {
      clearInterval(timer);
      countDownResult++;
      currentQuestion++;
      if (currentQuestion <= 10) {
        let allRadios = document.querySelectorAll('input[name="answer"]');
        for (let i = 0; i < allRadios.length; i++) {
          allRadios[i].checked = false;
        }
        showQuestion();
        startTimer();
      }
    }
  }, 1000);
}

quizForm.addEventListener("submit", function (e) {
  e.preventDefault();

  clearInterval(timer);
  let selected = document.querySelector('input[name = "answer"]:checked');

  if (!selected) {
    errorMsg.style.display = "block";
    return;
  } else {
    errorMsg.style.display = "none";
  }

  let userAnswer = Number(selected.value);

  let correctAnswer = questionAnswers[currentQuestion].correctAnswer;

  if (userAnswer === correctAnswer) {
    result++;
    document.body.style.backgroundColor = "rgba(0, 255, 0, 0.48)";
  } else {
    document.body.style.backgroundColor = "rgba(255, 0, 0, 0.48)";
    wrong++;
  }

  currentQuestion = currentQuestion + 1;

  setTimeout(function () {
    document.body.style.backgroundColor = "white";
    if (currentQuestion <= 10) {
      let allRadios = document.querySelectorAll('input[name ="answer"]');
      for (let i = 0; i < allRadios.length; i++) {
        allRadios[i].checked = false;
      }
      showQuestion();
      startTimer();
    } else {
      quizForm.style.display = "none";
      mySection.style.display = "flex";
      if (result >= 5) {
        mySection.innerHTML = `
                  <h2>Quiz Results</h2>
                  <p>Correct answers: ${result}</p>
                  <p>Wrong answers: ${wrong}</p>
                  <p>Unanswered questions: ${countDownResult}</p>
                   <h3 class = "passed">You passed</h3>
                       `;
      } else {
        mySection.innerHTML = `
                  <h2>Quiz Results</h2>
                  <p>Correct answers: ${result}</p>
                  <p>Wrong answers: ${wrong}</p>
                  <p>Unanswered questions: ${countDownResult}</p>
                   <h3 class = "failed">You failed</h3>
                       `;
      }
    }
  }, 600);
});
