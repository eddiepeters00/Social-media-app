import { findUserInDb } from "./modules/firebase";
import { UserInput } from "./modules/interfaces";


const userObj: UserInput = {};
console.log('Start');

//Get userinputs from register-form
const signInForm = document.querySelector('form') as HTMLFormElement;
signInForm.addEventListener('submit', e => {
    e.preventDefault();

    console.log('clicked btn')

    document.querySelectorAll('input').forEach(input => {
        console.log('Kommer hit')

        if (input.value !== null && input.value !== '') {
            userObj[input.name] = input.value;
        }

    });

        console.log('innan login handler')
        logInHandler(userObj);
});


//Check if user exists in db
async function logInHandler(userObj: UserInput) {
    console.log(userObj);
    console.log('Handle log in');

    const foundUser: Object = await findUserInDb(userObj);
    if (!isEmpty(foundUser)) {
        //Prompt message to user
        console.log('Error');
    } else {
        console.log('Logging in');
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


export { isEmpty };