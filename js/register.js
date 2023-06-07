const API_BASE_URL = "https://nf-api.onrender.com/api/v1";
const registerEndpoint = "/social/auth/register"; // POST
const registerURL = `${API_BASE_URL}${registerEndpoint}`;

const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const userConfirmPassword = document.getElementById("confirm-password");
const userAvatar = document.getElementById("avatar");
const userBanner = document.getElementById("banner");
const userMessage = document.getElementById("userMessage");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");

const signup = document.getElementById("signup");

signup.addEventListener("click", (e) => {
  e.preventDefault();
  //console.log('form is submitted!');

  const name = userName.value.trim();
  const email = userEmail.value.trim();
  const password = userPassword.value.trim();
  const confirmPassword = userConfirmPassword.value.trim();
  const avatar = userAvatar.value.trim();
  const banner = userBanner.value.trim();
  const userMessage = document.getElementById("userMessage");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById(
    "confirm-password-error"
  );
  /**
   * Validation limitations
   * if email is already in use this validation showing the same email error message because there is no function to check duplicate email in the DB
   */
  var validation = true;
  if (name === "") {
    nameError.innerHTML = "Name is required";
    validation = false;
  } else if (name.length < 3) {
    nameError.innerHTML = "Name is too short.";
    validation = false;
  } else {
    nameError.innerHTML = "";
  }

  if (email === "") {
    emailError.innerHTML = "Email is required";
    validation = false;
  } else if (!email.includes("noroff.no" || "student.noroff.no")) {
    emailError.innerHTML = "Please enter your student email address.";
    validation = false;
  } else {
    emailError.innerHTML = "";
    validation = true;
  }

  if (password === "") {
    passwordError.innerHTML = "Password is required";
    validation = false;
  } else if (password.length < 8) {
    passwordError.innerHTML = "password must be longer than 8.";
    validation = false;
  } else {
    passwordError.innerHTML = "";
    validation = true;
  }

  if (confirmPassword === "") {
    confirmPasswordError.innerHTML = "Please confirm your password.";
    validation = false;
  } else if (confirmPassword.length < 8) {
    confirmPasswordError.innerHTML = "Password must be longer than 8.";
    validation = false;
  } else {
    confirmPasswordError.innerHTML = "";
    validation = true;
  }

  if (password !== confirmPassword) {
    confirmPasswordError.innerHTML = "Passwords do not match.";
    validation = false;
  } else {
    confirmPasswordError.innerHTML = "";
    validation = true;
  }

  const registerData = {
    name,
    email,
    password,
  };
  //console.log(registerData);

  async function registerUser(url, data) {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      //console.log(url, data, options);

      const response = await fetch(url, options);
      //console.log(response);
      const answer = await response.json();
      //console.log(answer);
      if (response.ok) {
        userMessage.innerHTML = `
                <div class="alert alert-success" role="alert">
                You are registered now! Please login!
              </div>`;

        setTimeout(() => {
          window.location.href = "/index.html";
        }, 5000);
      }
    } catch (error) {
      console.warn(error);
    }
  }
  registerUser(registerURL, registerData);
});
