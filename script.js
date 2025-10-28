let bad = document.getElementById("bad");
const form = document.getElementById("info_form");
const infoSection = document.getElementById("info_section");
const quizInfo = document.getElementById("quiz_info");
const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regex = /^\d{10}$/;

quizInfo.style.display = "none";

form.addEventListener("submit", function (refresh) {
  refresh.preventDefault();

  const firstName = document.getElementById("Fname").value.trim();
  const lastName = document.getElementById("Lname").value.trim();
  const age = Number(document.getElementById("Age").value);
  const phone = document.getElementById("Pnumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const gender = document.getElementById("gender").value;

  if (
    !firstName ||
    !lastName ||
    !age ||
    !phone ||
    !email ||
    gender === ""
  ) {
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
  quizInfo.style.display = "";
});

