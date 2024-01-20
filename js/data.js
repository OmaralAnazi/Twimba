let currentAccount = null;
let userAccounts = [
    {
        username: 'OmarAlanazi_IS',
        email: 'omar@gmail.com',
        password: '5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5', // hashed value of '12345' 
        profilePic: 'images/scrimbalogo.png'
    }
];
let tweetsData = [       
    {
        handle: 'Elon ✅',
        profilePic: 'images/musk.png',
        likes: 6500,
        retweets: 234,
        tweetText: 'I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀',
        replies: [
            {
                handle: 'TomCruise ✅',
                profilePic: 'images/tcruise.png',
                tweetText: 'Yes! Sign me up! 😎🛩',
            },
            {
                handle: 'ChuckNorris ✅',
                profilePic: 'images/chucknorris.jpeg',
                tweetText: 'I went last year😴',
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
    {
        handle: 'NoobCoder12',
        profilePic: 'images/flower.png',
        likes: 10,
        retweets: 3,
        tweetText: 'Are you a coder if you only know HTML?',
        replies: [
            {
                handle: 'StackOverflower ☣️',
                profilePic: 'images/overflow.png',
                tweetText: 'No. Obviosuly not. Go get a job in McDonald\'s.',
            },
            {
                handle: 'YummyCoder64',
                profilePic: 'images/love.png',
                tweetText: 'You are wonderful just as you are! ❤️',
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
    {
        handle: 'TrollBot66756542 💎',
        profilePic: 'images/troll.jpg',
        likes: 27,
        retweets: 10,
        tweetText: 'Buy Bitcoin, ETH Make 💰💰💰 low low prices. \n            Guaranteed return on investment. HMU DMs open!!',
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },
];

 // The getters doesn't avoid the Mutable Exports, but it's okay for the scope of the project
export const getCurrentAccount = () => currentAccount;
export const getUserAccounts = () => userAccounts;
export const getTweetsData = () => tweetsData; 

export const setCurrentAccount = newAccount => currentAccount = newAccount;
export const setUserAccounts = newUserAccounts => userAccounts = newUserAccounts;
export const setTweetsData = newTweetsData => tweetsData = newTweetsData;