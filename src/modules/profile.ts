import { getAllUsers, getUserIndex, getPostsFromDb, addPostsToDb, deleteAccount } from "../modules/firebase";
import { createNewUser, Post, placeImg } from "./interfaces";
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


//EventListener on deleteAccount
const deleteAccountBtn = document.getElementById('delete-account');
if (deleteAccountBtn) {
  deleteAccountBtn.addEventListener('click', () => {
    console.log('DELETE ACCOUNT');
    if(user !== null && user !== undefined){
        deleteAccount(user);
        location.replace('../index.html');
    }
  });
}

function displayContent(user: User) {
    //Display profileName
    const profileName = document.getElementById('profile-name') as HTMLHeadingElement;
    profileName.innerText = user.getUserName();

    const menuProfileName = document.getElementById('menu-profile-name') as HTMLHeadingElement;
    menuProfileName.innerText = user.getUserName();

    //Display profileImg
    const profileImg = document.querySelectorAll('.profile-img') as NodeListOf<HTMLImageElement>;
    for (let i = 0; i < profileImg.length; i++) {
        placeImg(profileImg[i], user.getImgUrl());
    }

    //Displays all posts from this user
    displayPosts(user);
}

async function getUserPosts(user: User){
    const userIndex = await getUserIndex(user);
    if (userIndex !== null && userIndex !== undefined) {
        console.log(userIndex);
        const userPosts = await getPostsFromDb(userIndex);
        if(Array.isArray(userPosts)){
            const postsArray: Post[] = [];
            userPosts.forEach(post => {
                postsArray.push(post);
            });
            user.setPosts(postsArray);
            displayPosts(user);
        } else {
            console.log("Error: userPosts is not an array");
        }
    }
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
          if(userLink.ariaValueText){
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

export {createNewUser}