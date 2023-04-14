console.log('Index.ts is running');

import { findUserInDb } from "../src/modules/firebase";
import { UserInput, isEmpty } from "../src/modules/interfaces";

const userObj: UserInput = {};

//Get userinputs from register-form
const signInForm = document.querySelector('form') as HTMLFormElement;
signInForm.addEventListener('submit', e => {
    e.preventDefault();

    document.querySelectorAll('input').forEach(input => {
        if (input.value !== null && input.value !== '') {
            userObj[input.name] = input.value;
        }
    });
        logInHandler(userObj);
});


//Check if user exists in db
async function logInHandler(userObj: UserInput) {
    console.log(userObj);
    const foundUser: Object = await findUserInDb(userObj);
    if (!isEmpty(foundUser)) {
        console.log('Error');
    } else {
        console.log('Logging in...');
        localStorage.setItem('user', JSON.stringify(Object.values(foundUser)));
        location.replace("./profile.html");
    }
}
