const patterns = {
  email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  username: /^[A-Za-z]{3,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  otp: /^\d{6}$/
};

const fieldConfig = {
  email: {
    input: document.getElementById("email"),
    message: document.getElementById("emailMessage"),
    validator: value => patterns.email.test(value),
    error: "Enter a valid email address like student@college.edu.",
    success: "Valid email accepted."
  },
  username: {
    input: document.getElementById("username"),
    message: document.getElementById("usernameMessage"),
    validator: value => patterns.username.test(value),
    error: "Username must contain only letters and be 3 to 15 characters long.",
    success: "Username format is correct."
  },
  password: {
    input: document.getElementById("password"),
    message: document.getElementById("passwordMessage"),
    validator: value => patterns.password.test(value),
    error: "Password must be 8+ characters with uppercase, lowercase, number and special symbol.",
    success: "Strong password format detected."
  },
  confirmPassword: {
    input: document.getElementById("confirmPassword"),
    message: document.getElementById("confirmPasswordMessage"),
    validator: value => {
      const password = document.getElementById("password").value;
      return value.length > 0 && value === password;
    },
    error: "Confirm Password must exactly match Password.",
    success: "Passwords match successfully."
  },
  otp: {
    input: document.getElementById("otp"),
    message: document.getElementById("otpMessage"),
    validator: value => patterns.otp.test(value),
    error: "OTP must contain exactly 6 digits.",
    success: "OTP format is correct."
  }
};

const resultBanner = document.getElementById("resultBanner");
const form = document.getElementById("securityForm");

function setFieldState(input, messageElement, isValid, text) {
  input.classList.remove("valid", "invalid");
  messageElement.classList.remove("success", "error");

  if (!input.value.trim()) {
    messageElement.textContent = "";
    return false;
  }

  if (isValid) {
    input.classList.add("valid");
    messageElement.classList.add("success");
  } else {
    input.classList.add("invalid");
    messageElement.classList.add("error");
  }

  messageElement.textContent = text;
  return isValid;
}

function validateField(key) {
  const { input, message, validator, error, success } = fieldConfig[key];
  const value = input.value.trim();
  const isValid = validator(value);
  return setFieldState(input, message, isValid, isValid ? success : error);
}

Object.keys(fieldConfig).forEach(key => {
  const { input } = fieldConfig[key];
  input.addEventListener("input", () => {
    validateField(key);

    if (key === "password" && fieldConfig.confirmPassword.input.value.trim()) {
      validateField("confirmPassword");
    }
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();

  const results = Object.keys(fieldConfig).map(validateField);
  const allValid = results.every(Boolean);

  resultBanner.className = "result-banner show";

  if (allValid) {
    resultBanner.classList.add("success");
    resultBanner.textContent = "All inputs are valid. Secure login successful.";
    form.reset();

    Object.values(fieldConfig).forEach(({ input, message }) => {
      input.classList.remove("valid", "invalid");
      message.textContent = "";
      message.classList.remove("success", "error");
    });
  } else {
    resultBanner.classList.add("error");
    resultBanner.textContent = "Login blocked. Please correct the highlighted fields.";
  }
});
