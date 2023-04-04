import { getAllUsers, getUserIndex, getPostsFromDb, addPostsToDb } from "../modules/firebase";
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

//Creating a new User-object
function createNewUser() {
    const storedUserInfo = localStorage.getItem('user');
    console.log(storedUserInfo);
    if (storedUserInfo !== null) {
        const userInfo: string[] = JSON.parse(storedUserInfo);
        const user: User = new User(userInfo[0], userInfo[1], userInfo[2], userInfo[3]);
        console.log(user);
        return user;
    }
    return;
}

const user = createNewUser();
console.log(user);
if (user !== undefined) {
    displayContent(user);
    loadContent(user);
}


//Eventlistener on postBtn
const postForm = document.getElementById('post-form') as HTMLFormElement;
postForm.addEventListener('submit', async e => {
    e.preventDefault();
    const message = document.getElementById('message-input') as HTMLInputElement;
    if (user !== undefined) {
        const postObj: Post = {
            sender: user.getUserName(),
            date: new Date().toUTCString(),
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


//Loads content from db
async function loadContent(user: User) {
    const userIndex = await getUserIndex(user);
    if(userIndex !== null && userIndex !== undefined){
        console.log(userIndex);
        const userPosts = await getPostsFromDb(userIndex);
        const postsArray: Post[] = [];
        userPosts.forEach(post =>{
            postsArray.push(post);
        });

        user.setPosts(postsArray);
        displayPosts(user);
    }

    const allUsers = await getAllUsers();
    for (let i: number = 0; i < allUsers.length; i++) {

        //Developers list
        const userList = document.getElementById('user-list');
        const userLink = document.createElement('a') as HTMLElement;
        userLink.innerText = allUsers[i].userName;

        const userInfo = {
            name: allUsers[i].name,
            userName: allUsers[i].userName,
            imgUrl: allUsers[i].imgUrl,
            posts: allUsers[i].posts
        };

        userLink.ariaValueText = JSON.stringify(userInfo);
        userList?.appendChild(userLink);
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
 * Add posts to db
 */

