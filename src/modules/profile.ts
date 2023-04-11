import { getAllUsers, getUserIndex, getPostsFromDb, addPostsToDb } from "../modules/firebase";
import { createNewUser, Post} from "./interfaces";
import { User } from "./User";

const sideNav = document.getElementById('side-nav') as HTMLDivElement;
const openBtn = document.getElementById('open-btn') as HTMLSpanElement;
const closeBtn = document.getElementById('close-btn') as HTMLElement;

openBtn.addEventListener('click', () => {
    sideNav.style.width = "60%";
});

closeBtn.addEventListener('click', () => {
    sideNav.style.width = "0";
});


const user = createNewUser('user');
console.log(user);
if (user !== undefined) {
    displayContent(user);
    getUserPosts(user)
    .then(loadContent);
}


//Eventlistener on postBtn
const postForm = document.getElementById('post-form') as HTMLFormElement;
postForm.addEventListener('submit', async e => {
    e.preventDefault();
    const message = document.getElementById('message-input') as HTMLInputElement;
    if (user !== undefined) {
        const postObj: Post = {
            sender: user.getUserName(),
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            message: message.value,
        }

        message.value = '';
        user.addPost(postObj);

        const userIndex = await getUserIndex(user);
        addPostsToDb(userIndex, user.getPosts());
        displayPosts(user);
    }
});


function displayContent(user: User) {
    //Display profileName
    const profileName = document.getElementById('profile-name') as HTMLHeadingElement;
    profileName.innerText = user.getUserName();

    const menuProfileName = document.getElementById('menu-profile-name') as HTMLHeadingElement;
    menuProfileName.innerText = user.getUserName();

    //Display profileImg
    const profileImg = document.querySelectorAll('.profile-img') as NodeListOf<HTMLImageElement>;
    for (let i = 0; i < profileImg.length; i++) {
        placeImg(profileImg[i], user);
    }

    //Displays all posts from this user
    displayPosts(user);
}

async function getUserPosts(user: User){
    const userIndex = await getUserIndex(user);
    if (userIndex !== null && userIndex !== undefined) {
        console.log(userIndex);
        const userPosts = await getPostsFromDb(userIndex);
        const postsArray: Post[] = [];
        userPosts.forEach(post => {
            postsArray.push(post);
        });

        user.setPosts(postsArray);
        displayPosts(user);
    }
}


//Loads content from db
async function loadContent() {
    const allUsers = await getAllUsers();
    for (let i: number = 0; i < allUsers.length; i++) {

        //Developers list
        const userList = document.getElementById('user-list');
        if (userList !== null && userList.children.length < allUsers.length){
            const userLink = document.createElement('a') as HTMLAnchorElement;
            userLink.innerText = allUsers[i].userName;

            const userInfo = {
                name: allUsers[i].name,
                userName: allUsers[i].userName,
                imgUrl: allUsers[i].imgUrl,
                posts: allUsers[i].posts
            };

            userLink.ariaValueText = JSON.stringify(userInfo);
            userList.appendChild(userLink);

            userLink.addEventListener('click', () => {
                if(userLink.ariaValueText){
                    console.log(userLink.ariaValueText);
                    const visitUserObj = JSON.parse(userLink.ariaValueText);
                    localStorage.setItem('visitUser', JSON.stringify(Object.values(visitUserObj)));
                    console.log(localStorage.getItem('visitUser'));
                }

                location.assign('./visitProfile.html');
            });
        }
    }
}


function placeImg(imgElement: HTMLImageElement, user: User): void {
    const url = user.getImgUrl();
    let imgUrl: URL = new URL('../images/angry-computer.jpg', import.meta.url);

    switch (url) {
        case '../images/angry-computer.jpg':
            imgUrl = new URL('../images/angry-computer.jpg', import.meta.url);
            imgElement.src = imgUrl.href;
            break;

        case '../images/crazy-eddie.jpg':
            imgUrl = new URL('../images/angry-computer.jpg', import.meta.url);
            imgElement.src = imgUrl.href;
            break;

        case '../images/pixeledDog.jpg':
            imgUrl = new URL('../images/angry-computer.jpg', import.meta.url);
            imgElement.src = imgUrl.href;
            break;

        default:
            console.log('URL is not recognized');
            break;
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
    }
}

/**TODO
 * Change images
 */

export {createNewUser}