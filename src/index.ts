import { User } from "./modules/User";
import {findUserInDb} from "./modules/firebase";

type UserInput = {
    [key: string]:string;
}

//Get userinputs from register-form
const registerForm = document.querySelector('#register-form') as HTMLFormElement;
registerForm.addEventListener('submit', e => {
    e.preventDefault();
    const userObj: UserInput = {};
    document.querySelectorAll('input').forEach(input =>{
        if(input.value !== null && input.value !== '') userObj[input.name] = input.value;
    });

    //Check if user exists in db
    if(!findUserInDb()){
        createNewUser(userObj);
    }else{
        //Prompt message to user
    }
});


function createNewUser(userObj: UserInput){
    const user = new User(userObj.name, userObj.email, userObj.password, userObj.imgUrl);
    console.log(user);
}