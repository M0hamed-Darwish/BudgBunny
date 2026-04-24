const signInBtn = document.getElementById("SignIn");
const signUpBtn = document.getElementById("SignUp");

const signInForm = document.querySelector(".SignInCont");
const signUpForm = document.querySelector(".SignUpCont");

const regUser = document.getElementById("regUser");
const regPass = document.getElementById("regPass");

const loginUser = document.getElementById("loginUser");
const loginPass = document.getElementById("loginPass");
const errMsg = document.getElementById("errMsg");

signUpBtn.addEventListener("click", () => {
  signInForm.style.display = "none";
  signUpForm.style.display = "flex";

  signUpBtn.classList.add("active");
  signInBtn.classList.remove("active");
  errMsg.style.display = "none";
});

signInBtn.addEventListener("click", () => {
  signUpForm.style.display = "none";
  signInForm.style.display = "flex";

  signInBtn.classList.add("active");
  signUpBtn.classList.remove("active");
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem("username", regUser.value);
  localStorage.setItem("password", regPass.value);

  alert("Account Created Successfully! Now you can Sign In.");

  signInBtn.click();
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const storedUser = localStorage.getItem("username");
  const storedPass = localStorage.getItem("password");

  if (loginUser.value === storedUser && loginPass.value === storedPass) {
    window.location.href = "home.html";
  } else {
    errMsg.style.display = "block";
  }
});
