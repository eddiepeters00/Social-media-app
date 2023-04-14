import { createNewUser, Post, placeImg } from "./interfaces";
import { User } from "./User";
import { getAllUsers, getUserIndex, getPostsFromDb } from "./firebase";

const sideNav = document.getElementById('side-nav') as HTMLDivElement;
const openBtn = document.getElementById('open-btn') as HTMLSpanElement;
const closeBtn = document.getElementById('close-btn') as HTMLElement;

openBtn.addEventListener('click', () => {
    sideNav.style.width = "60%";
});

closeBtn.addEventListener('click', () => {
    sideNav.style.width = "0";
});

const user = createNewUser('visitUser');
console.log(user);
if (user !== undefined) {
    displayContent(user);
    getUserPosts(user)
        .then(loadContent);
}


//Loads content from db
async function loadContent() {
    const allUsers = await getAllUsers();
    allUsers.forEach(user => {
        const userList = document.getElementById('user-list');
        if (userList !== null && userList.children.length < allUsers.length && user !== null) {
            const userLink = document.createElement('a') as HTMLAnchorElement;
            userLink.innerText = user.userName;

            const userInfo = {
                name: user.name,
                userName: user.userName,
                imgUrl: user.imgUrl,
                posts: user.posts
            };

            userLink.ariaValueText = JSON.stringify(userInfo);
            userList.appendChild(userLink);

            userLink.addEventListener('click', () => {
                if (userLink.ariaValueText) {
                    console.log(userLink.ariaValueText);
                    const visitUserObj = JSON.parse(userLink.ariaValueText);
                    localStorage.setItem('visitUser', JSON.stringify(Object.values(visitUserObj)));
                    console.log(localStorage.getItem('visitUser'));
                }

                location.assign('./visitProfile.html');
            });
        }
    });
}


function displayContent(user: User) {
    console.log(localStorage.getItem('user'));
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser !== null) {
        const loggedInuserObject = JSON.parse(loggedInUser);
        console.log(loggedInuserObject);

        //Display profileName
        const profileName = document.getElementById('profile-name') as HTMLHeadingElement;
        profileName.innerText = user.getUserName();

        //Display profileImg
        const profileImg = document.getElementById('profile-img') as HTMLImageElement;
        const imgUrl: string = user.getImgUrl();
        placeImg(profileImg, imgUrl);


        //Display profileName in menu
        const menuProfileName = document.getElementById('menu-profile-name') as HTMLHeadingElement;
        menuProfileName.innerText = loggedInuserObject[1];


        //Display menuProfileImg
        const menuImgUrl :string = loggedInuserObject[0];
        const menuProfileImg = document.getElementById('menu-profile-img') as HTMLImageElement;
        console.log(menuProfileImg);
        placeImg(menuProfileImg, menuImgUrl);
    }
}

async function getUserPosts(user: User) {
    const userIndex = await getUserIndex(user);
    console.log('USERINDEX', userIndex);
    if (userIndex !== null && userIndex !== undefined) {
        console.log(userIndex);
        const userPosts = await getPostsFromDb(userIndex);
        if (userPosts !== null) {
            console.log('USERPOSTS', userPosts);
            const postsArray: Post[] = [];
            userPosts.forEach(post => {
                postsArray.push(post);
            });

            user.setPosts(postsArray);
            displayPosts(user);
        }
        else{
            console.log('User has no posts');
        }
    }
}


function displayPosts(user: User) {
    if (user.getPosts().length !== 0) {
        const postSection = document.getElementById('posts-container') as HTMLDivElement;
        postSection.innerHTML = '';

        user.getPosts().forEach(post => {
            const postContainer = document.createElement('div') as HTMLDivElement;
            postContainer.classList.add('post');
            postSection.append(postContainer);

            const postInfoContainer = document.createElement('div');
            postInfoContainer.classList.add('post-info');
            const postName = document.createElement('span') as HTMLSpanElement;
            const postDate = document.createElement('span') as HTMLSpanElement;
            postName.innerText = post.sender;
            postDate.innerText = post.date;
            postInfoContainer.append(postName, postDate);
            postContainer.append(postInfoContainer);

            const postMessageContainer = document.createElement('div') as HTMLDivElement;
            postMessageContainer.classList.add('post-message');
            const postMessage = document.createElement('p') as HTMLParagraphElement;
            postMessage.classList.add('message');
            postMessage.innerText = post.message;
            postMessageContainer.append(postMessage);
            postContainer.append(postMessageContainer);
        });
    } else {
        console.log('User has no posts');
    }
}
