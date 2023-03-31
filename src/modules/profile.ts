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

