import { setCurrentAccount } from './data.js';
import { isEmailExist, isUserNameExist, createAccount, displayContentWindow, showNotificationMessage } from './utilities.js';

const signupSection = document.getElementById('signup-section');
const signupUsernameElement = document.getElementById('signup-username');
const signupEmailElement = document.getElementById('signup-email');
const signupPasswordElement = document.getElementById('signup-password');

signupSection.addEventListener('submit', handleSignupButton);

export function handleSignupButton(event) {
    event.preventDefault();

    if (!isEmailExist(signupEmailElement.value) && !isUserNameExist(signupUsernameElement.value))
        processSuccessfulSignup(signupUsernameElement.value, signupEmailElement.value, signupPasswordElement.value);
    else
        showSignupError();
}

async function processSuccessfulSignup(username, email, password) {
    const newAccount = await createAccount(username, email, password);
    setCurrentAccount(newAccount);
    clearSignupForm();
    showNotificationMessage('The account created successfully!');
    setTimeout(() => {
        hideSignupSection();
        displayContentWindow();
    }, 500)
}

function clearSignupForm() {
    signupUsernameElement.value = '';
    signupEmailElement.value = '';
    signupPasswordElement.value = '';
}

function showSignupError() {
    const errorMessage = isEmailExist(signupEmailElement.value) 
        ? 'The email already exists!' 
        : 'The username already exist!';
    showNotificationMessage(errorMessage);
}

function hideSignupSection() {
    signupSection.classList.add('hidden');
}