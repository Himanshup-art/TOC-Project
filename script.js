const patterns = {
  email: /^[A-Za-z0-9._%+-]+@mitaoe\.ac\.in$/i,
  username: /^[A-Za-z]{3,15}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  otp: /^\d{6}$/
};

const fieldConfig = {
  email: {
    input: document.getElementById("email"),
    message: document.getElementById("emailMessage"),
    validator: value => patterns.email.test(value),
    error: "Enter a valid MITAOE email address like studentprn@mitaoe.ac.in.",
    success: "Official MITAOE email accepted."
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
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const passwordStrengthFill = document.getElementById("passwordStrengthFill");
const passwordStrengthText = document.getElementById("passwordStrengthText");

const statusMap = {
  email: document.getElementById("emailStatus"),
  username: document.getElementById("usernameStatus"),
  password: document.getElementById("passwordStatus"),
  otp: document.getElementById("otpStatus")
};

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

function updateStatusCard(key, state, label) {
  if (!statusMap[key]) {
    return;
  }

  const card = document.querySelector(`[data-status-card="${key}"]`);
  statusMap[key].textContent = label;
  card.classList.remove("active", "complete", "error");

  if (state === "valid") {
    card.classList.add("active", "complete");
  } else if (state === "invalid") {
    card.classList.add("active", "error");
  }
}

function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[@$!%*?&]/.test(password)) score += 1;

  return score;
}

function updatePasswordStrength() {
  const password = fieldConfig.password.input.value;
  const score = getPasswordStrength(password);
  const percentage = (score / 5) * 100;
  let color = "#fb7185";
  let label = "Password strength: too weak";

  if (!password) {
    passwordStrengthFill.style.width = "0%";
    passwordStrengthFill.style.background = color;
    passwordStrengthText.textContent = "Password strength: waiting for input";
    updateStatusCard("password", "", "Waiting");
    return;
  }

  if (score >= 4) {
    color = "#4ade80";
    label = "Password strength: strong";
  } else if (score >= 3) {
    color = "#67e8f9";
    label = "Password strength: medium";
  }

  passwordStrengthFill.style.width = `${percentage}%`;
  passwordStrengthFill.style.background = color;
  passwordStrengthText.textContent = label;
}

function updateProgress() {
  const validCount = Object.keys(fieldConfig).filter(key => fieldConfig[key].validator(fieldConfig[key].input.value.trim())).length;
  const percentage = Math.round((validCount / Object.keys(fieldConfig).length) * 100);
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% complete`;
}

function validateField(key) {
  const { input, message, validator, error, success } = fieldConfig[key];
  const value = input.value.trim();
  const isValid = validator(value);
  const result = setFieldState(input, message, isValid, isValid ? success : error);

  if (key === "confirmPassword") {
    updateStatusCard(key, isValid ? "valid" : "invalid", isValid ? "Matched" : "Mismatch");
  } else if (value) {
    updateStatusCard(key, isValid ? "valid" : "invalid", isValid ? "Ready" : "Fix needed");
  } else {
    updateStatusCard(key, "", "Waiting");
  }

  updateProgress();
  return result;
}

Object.keys(fieldConfig).forEach(key => {
  const { input } = fieldConfig[key];
  input.addEventListener("input", () => {
    validateField(key);

    if (key === "password" && fieldConfig.confirmPassword.input.value.trim()) {
      validateField("confirmPassword");
    }

    if (key === "password") {
      updatePasswordStrength();
    }
  });
});

document.querySelectorAll("[data-toggle-target]").forEach(button => {
  button.addEventListener("click", () => {
    const targetId = button.getAttribute("data-toggle-target");
    const input = document.getElementById(targetId);
    const nextType = input.type === "password" ? "text" : "password";
    input.type = nextType;
    button.textContent = nextType === "password" ? "Show" : "Hide";
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

    Object.keys(statusMap).forEach(key => updateStatusCard(key, "", "Waiting"));
    progressFill.style.width = "0%";
    progressText.textContent = "0% complete";
    passwordStrengthFill.style.width = "0%";
    passwordStrengthText.textContent = "Password strength: waiting for input";
  } else {
    resultBanner.classList.add("error");
    resultBanner.textContent = "Login blocked. Please correct the highlighted fields.";
  }
});

updateProgress();
