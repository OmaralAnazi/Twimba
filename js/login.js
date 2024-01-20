import { setCurrentAccount } from './data.js';
import { isEmailExist, searchForAccount, displayContentWindow, showNotificationMessage } from './utilities.js';

const loginSection = document.getElementById('login-section');
const loginEmailElement = document.getElementById('login-email');
const loginPasswordElement = document.getElementById('login-password');

loginSection.addEventListener('submit', handleLoginButton);

async function handleLoginButton(event) {
    event.preventDefault();

    const account = await searchForAccount(loginEmailElement.value, loginPasswordElement.value);
    if (account) 
        processSuccessfulLogin(account);
    else 
        showLoginError(loginEmailElement.value);
}

function processSuccessfulLogin(account) {
    setCurrentAccount(account);
    clearLoginForm();
    showNotificationMessage('successful Log in!');
    setTimeout(() => {
        hideLoginSection();
        displayContentWindow();
    }, 500)
}

function clearLoginForm() {
    loginEmailElement.value = '';
    loginPasswordElement.value = '';
}

function showLoginError(email) {
    const errorMessage = isEmailExist(email) 
        ? 'The password is incorrect!' 
        : 'The email doesn\'t exist!';
    showNotificationMessage(errorMessage);
}

function hideLoginSection() {
    loginSection.classList.add('hidden');
}