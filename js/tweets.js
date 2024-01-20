import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { getCurrentAccount, getTweetsData } from './data.js';
import { saveDataToLocalStorage, showNotificationMessage } from './utilities.js';

export function handleLikeClick(tweetId) { 
    handleInteraction('like', tweetId);
}

export function handleRetweetClick(tweetId){
    handleInteraction('retweet', tweetId);
}

export function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}

export async function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input');

    if(!tweetInput.value) return;
    
    const newTweet = createNewTweet(tweetInput.value);
    getTweetsData().unshift(newTweet);
    tweetInput.value = '';
    showNotificationMessage('The tweet has been sent!')
    renderContent();
}

export function renderContent(){
    document.getElementById('feed').innerHTML = getFeedHtml();
    saveDataToLocalStorage();
}

function createNewTweet(tweetContent) {
    const currentAccount = getCurrentAccount();
    return {
        handle: currentAccount.username,
        profilePic: currentAccount.profilePic,
        likes: 0,
        retweets: 0,
        tweetText: tweetContent,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    };
}

function handleInteraction(type, tweetId) {
    const targetTweetObj = getTweetObjectById(tweetId);
    const isType = type === 'like' ? 'isLiked' : 'isRetweeted';
    const countType = type === 'like' ? 'likes' : 'retweets';

    targetTweetObj[countType] += targetTweetObj[isType] ? -1 : 1;
    targetTweetObj[isType] = !targetTweetObj[isType];

    renderContent();
}

function getTweetObjectById(tweetId) {
    return getTweetsData().find(tweet => tweet.uuid === tweetId);
}

function getFeedHtml(){
    return getTweetsData().map(tweet => {
        const likeIconClass = tweet.isLiked ? 'liked' : '';
        const retweetIconClass = tweet.isRetweeted ? 'retweeted' : '';
        
        const repliesHtml = tweet.replies.map(reply => `
            <div class='tweet-reply'>
                <img src='${reply.profilePic}' class='profile-pic'>
                <div class='tweet-inner'>
                    <p class='tweet-user-name'>@${reply.handle}</p>
                    <p class='tweet-content'>${reply.tweetText}</p>
                </div>
            </div>
        `).join('');

        return `
            <div class='tweet'>
                <img src='${tweet.profilePic}' class='profile-pic'>
                <div class='tweet-inner'>
                    <p class='tweet-user-name'>@${tweet.handle}</p>
                    <p class='tweet-content'>${tweet.tweetText}</p>
                    <div class='tweet-interactions-container'>
                        <span>
                            <i class='fa-regular fa-comment-dots' data-reply='${tweet.uuid}'></i>
                            ${tweet.replies.length}
                        </span>
                        <span>
                            <i class='fa-solid fa-heart ${likeIconClass}' data-like='${tweet.uuid}'></i>
                            ${tweet.likes}
                        </span>
                        <span>
                            <i class='fa-solid fa-retweet ${retweetIconClass}' data-retweet='${tweet.uuid}'></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                    <div class='hidden' id='replies-${tweet.uuid}'>
                        ${repliesHtml}
                    </div>   
                </div>            
            </div>
        `;
    }).join('');
}