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

loadUsers();

//Loads content from db
async function loadUsers(){
    const allUsers = await getAllUsers();
    console.log(allUsers);
    allUsers.forEach(user =>{
        console.log(user);
        //Add to developers list
        const userList = document.getElementById('user-list');
        const userLink = document.createElement('a') as HTMLElement;
        userLink.innerText = user.email;
        userLink.ariaValueText = JSON.stringify(user);
        userList?.appendChild(userLink);
    })
}