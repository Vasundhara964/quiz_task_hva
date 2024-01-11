function saveUsername() {
    var usernameValue = document.getElementById('username').value;
    localStorage.setItem('savedUsername', usernameValue);
    
}

function validateForm() {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const errorMessages = document.getElementById("errorMessages");

    const emailRegex = /^[a-zA-Z0-9_-]+@[a-z]+\.[a-z]{2,4}$/;

    const passwordMinLength = 8;

    if (!emailRegex.test(emailInput.value)) {
        displayErrorMessage("Invalid email address. Please enter a valid email.");

        return false;
    }

    if (passwordInput.value.length < passwordMinLength) {
        displayErrorMessage(`Password must be at least 8 characters long.`);
        ;
        return false;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        displayErrorMessage("Passwords do not match.");

        return false;
    }

    if (!containsUppercaseLetter(passwordInput.value) || !containsLowercaseLetter(passwordInput.value) || !containsSpecialCharacter(passwordInput.value)) {
        displayErrorMessage("Password must include at least one lowercase letter, one uppercase letter, and one special character.");

        return false;
    }

    errorMessages.innerHTML = "";
    return true;
}

function displayErrorMessage(message) {
    const errorMessages = document.getElementById("errorMessages");
    errorMessages.innerHTML = message;
}

function containsUppercaseLetter(text) {
    return /[A-Z]/.test(text);
}

function containsLowercaseLetter(text) {
    return /[a-z]/.test(text);
}

function containsSpecialCharacter(text) {
    return /[!@#$%^&*]/.test(text);
}
