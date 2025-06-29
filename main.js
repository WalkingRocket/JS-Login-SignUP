const signUpName = document.getElementById("SignUpName");
const signUpEmail = document.getElementById("SignUpEmail");
const signUpPassword = document.getElementById("SignUpPassword");
const signUpButton = document.getElementById("SignUpButton");
const inputLoginEmail = document.getElementById("LoginEmail");
const inputLoginPassword = document.getElementById("LoginPassword");
const loginButton = document.getElementById("LoginButton");
const errorMsg = document.getElementById("error-msg");
const WelcomeMessage = document.getElementById("welcome-message");
const logoutButton = document.getElementById("logoutButton");

// Sign Up Button Event Listener
// This function validates the input fields for sign-up and stores the user data in localStorage if valid.
if (signUpButton) {
  signUpButton.addEventListener("click", function (e) {
    const name = signUpName.value;
    const email = signUpEmail.value;
    const password = signUpPassword.value;
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
}

// Login Button Event Listener
// This function validates the input fields for login and checks against stored user data in localStorage.
if (loginButton) {
  loginButton.addEventListener("click", function () {
    const email = inputLoginEmail.value;
    const password = inputLoginPassword.value;
    const lastDot = email.lastIndexOf(".");

    if (!email || !password) {
      errorMsg.innerText = "Please fill in all fields.";
      inputLoginEmail.value = "";
      inputLoginPassword.value = "";
      console.log(true);
      
      return;
    }

    if (!email.includes("@")) {
      errorMsg.innerText = "Please enter a valid email address.";
      inputLoginEmail.value = "";
      inputLoginPassword.value = "";
      return;
    }

    if (
      lastDot === -1 ||
      lastDot > email.length - 4 ||
      !/^[a-zA-Z]{3}$/.test(email.slice(lastDot + 1))
    ) {
      errorMsg.innerText =
        "Please enter a valid Email with a 3-letter extension.";
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);

      if (
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
      ) {
        // Successful login
        window.location.href = "Home.html";
        return;
      } else {
        errorMsg.innerText = "Invalid email or password.";
        inputLoginEmail.value = "";
        inputLoginPassword.value = "";
        return;
      }
    } else {
      errorMsg.innerText = "No user found. Please sign up first.";
      inputLoginEmail.value = "";
      inputLoginPassword.value = "";
      return;
    }
  });
}


//  Welcome Message Display
// This function retrieves the user data from localStorage and displays a welcome message on the Home page
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcomeMessage = document.getElementById("welcome-message");

  if (user && welcomeMessage) {
    welcomeMessage.innerText = `Welcome, ${user.name}!`;
  }
});

// Logout Button Event Listener
// This function clears the user data from localStorage and redirects to the index page.
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
}
