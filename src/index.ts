import { findUserInDb } from "./modules/firebase";

type UserInput = {
    [key: string]: string;
}

const userObj: UserInput = {};
console.log('Start');
//Get userinputs from register-form
const signInForm = document.querySelector('form') as HTMLFormElement;
    signInForm.addEventListener('submit', e => {
        e.preventDefault();
        document.querySelectorAll('input').forEach(input => {
            if (input.value !== null && input.value !== '') {
                userObj[input.name] = input.value;
            }
            logInHandler(userObj);
            return false;
        });
    });



//Check if user exists in db
async function logInHandler(userObj: UserInput) {
    const foundUser: Object = await findUserInDb(userObj);
    if (!isEmpty(foundUser)) {
        //Prompt message to user
        console.log('Error');
    } else {
        console.log('Logging in');
        //Save userInfo to localStorage
        localStorage.setItem('user', JSON.stringify(Object.values(foundUser)));

        //Add animation? 
        setTimeout(() => {
            location.assign("./html/profile.html");
        }, 1000);
    }
}

//Checks if an object is empty
function isEmpty(obj: Object): boolean {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty(key)) 
        return false;
    }
    return true;
}


export {isEmpty};