import { findUserInDb, addUserToDb } from "../modules/firebase";
import { isEmpty } from "../index";

type UserInput = {
    [key: string]: string;
}

const userObj: UserInput = {};

document.querySelectorAll('.image-select img').forEach(img => {
    img.addEventListener('click', () => {
        console.log(img.ariaValueText);
        if (img.ariaValueText !== null) {
            userObj['imgUrl'] = img.ariaValueText;
        }
    });
});

//Get userinputs from register-form
const registerForm = document.querySelector('#register-form') as HTMLFormElement;
registerForm.addEventListener('submit', e => {
    e.preventDefault();
    document.querySelectorAll('input').forEach(input => {
        if (input.value !== null && input.value !== '') {
            userObj[input.name] = input.value;
        }
    });

    registerHandler(userObj);
});


//Check if user exists in db
async function registerHandler(userObj: UserInput) {
    const foundUser: Object = await findUserInDb(userObj);
    if (isEmpty(foundUser)) {
        addUserToDb(userObj);

        //Add animation? 
        setTimeout(() => {
            location.replace('/src/index.html');
        }, 1000);
    } else {
        //Prompt message to user
        console.log('User already exists');
    }
}


    
