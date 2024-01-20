import { setTweetsData, setCurrentAccount, setUserAccounts, getCurrentAccount, getUserAccounts, getTweetsData } from './data.js';
import { renderContent } from './tweets.js';

const encoder = new TextEncoder();

// Local Storage Utilities
export function getDataFromLocalStorage() {
    const retrieveAndSetData = (key, setterFunc) => {
        const item = localStorage.getItem(key);
        if(item) setterFunc(JSON.parse(item));
    };

    retrieveAndSetData('currentAccount', setCurrentAccount);
    retrieveAndSetData('userAccounts', setUserAccounts);
    retrieveAndSetData('tweetsData', setTweetsData);
}

export function saveDataToLocalStorage() {
    localStorage.setItem('tweetsData', JSON.stringify(getTweetsData()));
    localStorage.setItem('userAccounts', JSON.stringify(getUserAccounts()));
    localStorage.setItem('currentAccount', JSON.stringify(getCurrentAccount()));
}

// Account Utilities
export async function searchForAccount(email, password) {
    const hashedPassword = await hashPassword(password);
    return getUserAccounts().find(account => account.email === email && account.password === hashedPassword);
}

export function isEmailExist(email) {
    return getUserAccounts().some(account => account.email === email);
}

export function isUserNameExist(username) {
    return getUserAccounts().some(account => account.username === username);
}

export async function createAccount(username, email, password) {
    const newAccount = {
        username,
        email,
        password: await hashPassword(password),
        profilePic: 'images/scrimbalogo.png'
    };
    getUserAccounts().push(newAccount);
    return newAccount;
}

// DOM Utilities
export function switchBetweenLoginAndSignup() {
    document.querySelectorAll('.login-signup-links').forEach(element => 
        element.parentElement.parentElement.classList.toggle('hidden')
    );
}

export function displayContentWindow() {
    document.getElementById('content-section').classList.remove('hidden');
    renderContent();
}

// Encryption Utilities
export async function hashPassword(password) {
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

// Notification Utilities
export function showNotificationMessage(message) {
    let notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    // Delay the appearance transition to ensure the browser recognizes the initial state
    setTimeout(() => {
        notification.style.top = '35px';
        notification.style.opacity = '1'; // Fade in
    }, 10); 
    
    // Hide the notification after 2 seconds and then remove it from the DOM
    setTimeout(() => {
        notification.style.top = '-100px';
        notification.style.opacity = '0'; // Fade out
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 2000);
}