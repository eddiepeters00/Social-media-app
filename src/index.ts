import { findUserInDb } from "./modules/firebase";
import { UserInput } from "./modules/interfaces";


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
        location.replace("/FE22-js2-slutprojekt-eddie-peters/html/profile.html");
    }
}


//Returns true if object is empty
function isEmpty(obj: Object): boolean {
    console.log('ISEMPTY', obj);
    console.log(Object.keys(obj).length !== 0);
      return Object.keys(obj).length !== 0;
}


export { isEmpty };