import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// Objects data
let currentAccount = null
let userAccounts = [
    {
        username: "@OmarAlanazi_IS",
        email: "omar@gmail.com",
        password: "12345",
        profilePic: "images/scrimbalogo.png"
    }
]
let tweetsData = [   
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/troll.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Elon ✅`,
        profilePic: `images/musk.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: `@TomCruise ✅`,
                profilePic: `images/tcruise.png`,
                tweetText: `Yes! Sign me up! 😎🛩`,
            },
                  {
                handle: `@ChuckNorris ✅`,
                profilePic: `images/chucknorris.jpeg`,
                tweetText: `I went last year😴`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/flower.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/overflow.png`,
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/love.png`,
                tweetText: `You are wonderful just as you are! ❤️`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]

// Login form constants
const loginSection = document.getElementById('login-section')
const loginEmailElement = document.getElementById('login-email')
const loginPasswordElement = document.getElementById('login-password')

// Signin form constants
const signupSection = document.getElementById('signup-section')
const signupUsernameElement = document.getElementById('signup-username')
const signupEmailElement = document.getElementById('signup-email')
const signupPasswordElement = document.getElementById('signup-password')

// add the switchFormState to Sign up and Log in clickable texts
document.querySelectorAll('.login-signup-links').forEach(element => element.addEventListener('click', switchFormState))

loginSection.addEventListener('submit', function(e){
    e.preventDefault() 
    
    const account = getAccount(loginEmailElement.value, loginPasswordElement.value)
    if (account) {
        currentAccount = account
        loginEmailElement.value = loginPasswordElement.value = ""
        switchToContentState()
        renderContent()
        saveDataToLocalStorage()
    }
    else {
        if(isEmailExist(loginEmailElement.value))
            alert("The password is incorrect!")
        else 
            alert("The email isn't exists!")
    }
})

function getAccount(email, password) {
    for(let account of userAccounts)
        if (account.email === email && password === account.password)
            return account
}

function isEmailExist(email) {
    for(let account of userAccounts)
        if (account.email === email)
            return true
    return false
}

function switchToContentState() {
    // hide both forms (signin & login) + show content section
    document.querySelectorAll('.login-signup-links').forEach(element => element.parentElement.parentElement.classList.add('hidden'))
    document.getElementById('content-section').classList.remove('hidden')
}

signupSection.addEventListener('submit', function(e){
    e.preventDefault()
    if(! isEmailExist(signupEmailElement.value)){
        createAccount(signupUsernameElement.value, signupEmailElement.value, signupPasswordElement.value)
        signupUsernameElement.value = signupEmailElement.value = signupPasswordElement.value = ""
        alert("The account created successfully, you can log in it right now!")
        saveDataToLocalStorage()
    }
    else {
        alert("This email is already exists!")
    }
})

function createAccount(username, useremail, userpassword) {
    userAccounts.push({
        username: "@" + username,
        email: useremail,
        password: userpassword,
        profilePic: "images/scrimbalogo.png"
    })
}

function switchFormState() {
    // toggle hidden on the div to navigate between login and signup
    document.querySelectorAll('.login-signup-links').forEach(element => element.parentElement.parentElement.classList.toggle('hidden'))
}

// ----------------------------------------------------------------------------------------------

document.addEventListener('click', function(event){
    if(event.target.dataset.like)
       handleLikeClick(event.target.dataset.like) 
    else if(event.target.dataset.retweet)
        handleRetweetClick(event.target.dataset.retweet)
    else if(event.target.dataset.reply)
        handleReplyClick(event.target.dataset.reply)
    else if(event.target.id === 'tweet-btn')
        handleTweetBtnClick()
})
 
function handleLikeClick(tweetId){ 
    const targetTweetObj = getTweetObjectById(tweetId)

    if (targetTweetObj.isLiked)
        targetTweetObj.likes--
    else
        targetTweetObj.likes++ 

    targetTweetObj.isLiked = !targetTweetObj.isLiked
    renderContent()
    saveDataToLocalStorage()
}

function handleRetweetClick(tweetId){
    const targetTweetObj = getTweetObjectById(tweetId)
    
    if(targetTweetObj.isRetweeted)
        targetTweetObj.retweets--
    else
        targetTweetObj.retweets++
    
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    renderContent() 
    saveDataToLocalStorage()
}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: currentAccount.username,
            profilePic: currentAccount.profilePic,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
        tweetInput.value = ''
        renderContent()
        saveDataToLocalStorage()
    }
}

function getTweetObjectById(tweetId) {
    return tweetsData.filter( tweet => tweet.uuid === tweetId)[0]
}

function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){
        
        let likeIconClass = tweet.isLiked ? 'liked' : ''
        let retweetIconClass = tweet.isRetweeted ? 'retweeted' : ''
        let repliesHtml = ''
        
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=
                    `<div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                            </div>
                    </div>`
            })
        }
        
          
        feedHtml += `
            <div class="tweet">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${likeIconClass}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${retweetIconClass}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                        </div>   
                    </div>            
                </div>
                <div class="hidden" id="replies-${tweet.uuid}">
                    ${repliesHtml}
                </div>   
            </div>
            `
   })
   return feedHtml 
}

function renderContent(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

function getDataFromLocalStorage() {
    if(localStorage.getItem('tweetsData'))
        tweetsData = JSON.parse(localStorage.getItem('tweetsData')) 
    if(localStorage.getItem('userAccounts'))
        userAccounts = JSON.parse(localStorage.getItem('userAccounts'))
    if(localStorage.getItem('currentAccount'))
        currentAccount = JSON.parse(localStorage.getItem('currentAccount'))
}

function saveDataToLocalStorage() {
    localStorage.setItem('tweetsData', JSON.stringify(tweetsData))
    localStorage.setItem('userAccounts', JSON.stringify(userAccounts))
    localStorage.setItem('currentAccount', JSON.stringify(currentAccount))
}

renderContent()
getDataFromLocalStorage()