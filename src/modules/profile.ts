import { getAllUsers } from "../modules/firebase";
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

loadContent();
loadUsers();

function loadContent(){
    const storedUserInfo = localStorage.getItem('user');
    console.log(storedUserInfo);
    if(storedUserInfo !== null){
        const userInfo : string[] = JSON.parse(storedUserInfo);
        const user : User = new User(userInfo[0], userInfo[1], userInfo[2], userInfo[3]);
        console.log(user);

        //Display profileName
        const profileName = document.getElementById('profile-name') as HTMLHeadingElement;
        profileName.innerText = user.getUserName();

        const menuProfileName = document.getElementById('menu-profile-name') as HTMLHeadingElement;
        menuProfileName.innerText = user.getUserName();

        //Display profileImg
        const profileImg = document.querySelectorAll('.profile-img') as NodeListOf<HTMLImageElement>;
            for(let i = 0; i < profileImg.length; i++){
                placeImg(profileImg[i], user);
            }

        //Display posts
        if(user.getPosts().length !== 0){
            user.getPosts().forEach(post => {
                const postSection = document.getElementById('posts-container') as HTMLDivElement;
                const postContainer = document.createElement('div') as HTMLDivElement;
                postContainer.classList.add('post');
                postSection.append(postContainer);

                const postInfoContainer = document.createElement('div');
                postInfoContainer.classList.add('post-info');
                const postName = document.createElement('span') as HTMLSpanElement;
                const postDate = document.createElement('span') as HTMLSpanElement;
                //postName.innerText = post.name;
                //postDate.innerText = post.date;
                postInfoContainer.append(postName, postDate);

                const postMessageContainer = document.createElement('div') as HTMLDivElement;
                postMessageContainer.classList.add('post-message');
                const postMessage = document.createElement('p') as HTMLParagraphElement;
                postMessage.classList.add('message');
                //postMessage.innerText = post.message;
                postMessageContainer.append(postMessage);
                postContainer.append(postMessageContainer);
            });
        }

    }
}

//Loads content from db
async function loadUsers(){
    const allUsers = await getAllUsers();
    console.log(allUsers);
    allUsers.forEach(user =>{

        //Add to developers list
        const userList = document.getElementById('user-list');
        const userLink = document.createElement('a') as HTMLElement;
        userLink.innerText = user.userName;
        
        const userInfo = {
            name: user.name,
            userName: user.userName,
            imgUrl: user.imgUrl,
            posts: user.posts
        };

        userLink.ariaValueText = JSON.stringify(userInfo);
        userList?.appendChild(userLink);
    })
}


function placeImg(imgElement: HTMLImageElement, user: User):void{
    const url = user.getImgUrl();
    let imgUrl: URL = new URL('../images/angry-computer.jpg', import.meta.url);

    switch(url){
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

/**TODO
 * Change images
 * display posts
 */