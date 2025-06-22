const signUpName = document.getElementById("SignUpName");
const signUpEmail = document.getElementById("SignUpEmail");
const signUpPassword = document.getElementById("SignUpPassword");
const signUpButton = document.getElementById("SignUpButton");
const inputLoginEmail = document.getElementById("LoginEmail");
const inputLoginPassword = document.getElementById("LoginPassword");
const loginButton = document.getElementById("LoginButton");

// Sign Up Button Event Listener
// This function validates the input fields for sign-up and stores the user data in localStorage if valid.
signUpButton.addEventListener("click", function (e) {
  const name = signUpName.value;
  const email = signUpEmail.value;
  const password = signUpPassword.value;
  const errorMsg = document.getElementById("error-msg");
  const lastDot = email.lastIndexOf(".");

  if (!name || !email || !password) {
    errorMsg.innerText = "Please fill in all fields.";
    return;
  } else if (!email.includes("@")) {
    errorMsg.innerText = "Please enter a valid email address.";
    return;
  } else if (
    lastDot === -1 ||
    lastDot > email.length - 4 ||
    !/^[a-zA-Z]{3}$/.test(email.slice(lastDot + 1))
  ) {
    errorMsg.innerText =
      "Please enter a valid Email with a 3-letter extension.";
    return;
  } else if (password.length < 8) {
    errorMsg.innerText = "Password must be at least 8 characters long.";
    return;
  } else if (
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/\d/.test(password)
  ) {
    errorMsg.innerText =
      "Password must contain at least one uppercase letter, one lowercase letter, and one number.";
    return;
  } else if (!/^[a-zA-Z0-9]+$/.test(name)) {
    errorMsg.innerText = "Name can only contain letters and numbers.";
    return;
  } else if (name.length < 3 || name.length > 20) {
    errorMsg.innerText = "Name must be between 3 and 20 characters long.";
    return;
  } else if (email.length < 5 || email.length > 50) {
    errorMsg.innerText = "Email must be between 5 and 50 characters long.";
    return;
  } else if (password.length > 20) {
    errorMsg.innerText = "Password must not exceed 20 characters.";
    return;
  } else {
    errorMsg.innerText = "";
    signUpName.value = "";
    signUpEmail.value = "";
    signUpPassword.value = "";
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    );
    window.location.href = "index.html";
  }
});

// Login Button Event Listener
// This function validates the input fields for login and checks against stored user data in localStorage.
loginButton.addEventListener("click", async () => {
  const email = inputLoginEmail.value;
  const password = inputLoginPassword.value;
  const lastDot = filename.lastIndexOf(".");

  if (!email || !password) {
    errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "Please fill in all fields.";
    email.value = "";
    password.value = "";
    return;
  } else if (!email.includes("@")) {
    errorMsg = document.getElementById("error-msg");
    errorMsg.innerText = "Please enter a valid email address.";
    email.value = "";
    password.value = "";
    return;
  } else if (localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.email === email && user.password === password) {
      errorMsg = document.getElementById("error-msg");
      errorMsg.innerText = "Login successful!";
      email.value = "";
      password.value = "";
      return;
    } else {
      errorMsg = document.getElementById("error-msg");
      errorMsg.innerText = "Invalid email or password.";
      email.value = "";
      password.value = "";

      return;
    }
  }
});
