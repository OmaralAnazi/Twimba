import { getDataFromLocalStorage, switchBetweenLoginAndSignup } from './utilities.js';
import { handleLikeClick, handleRetweetClick, handleReplyClick, handleTweetBtnClick } from './tweets.js';
import './login.js';
import './signup.js';

document.addEventListener('click', handleGlobalClicks);

function handleGlobalClicks(e) {
    if (e.target.classList.contains('login-signup-links')) {
        switchBetweenLoginAndSignup();
    } else if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet) {
        handleRetweetClick(e.target.dataset.retweet);
    } else if (e.target.dataset.reply) {
        handleReplyClick(e.target.dataset.reply);
    } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick();
    }
}

getDataFromLocalStorage();