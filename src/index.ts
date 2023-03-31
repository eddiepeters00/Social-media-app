import { findUserInDb } from "./modules/firebase";

type UserInput = {
    [key: string]: string;
}

const userObj: UserInput = {};

//Get userinputs from register-form
const signInForm = document.querySelector('#sign-in-form') as HTMLFormElement;
signInForm.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelectorAll('input').forEach(input => {
        if (input.value !== null && input.value !== '') {
            userObj[input.name] = input.value;
        }
    });

    logInHandler(userObj);
    return false;
});


//Check if user exists in db
async function logInHandler(userObj: UserInput) {
    const found: boolean = await findUserInDb(userObj);
    if (!found) {
        //Prompt message to user
        console.log('Error');        
    } else {
        console.log('Logging in');
        
        //Add animation? 
        setTimeout(() => {
            console.log('GOING TO ANOTHER PAGE')
            location.assign("./html/profile.html");
        }, 1000);
    }
}