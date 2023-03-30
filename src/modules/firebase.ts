import { User } from "./User";

type UserInput = {
    [key: string]: string;
};

type UserValidation = {
    email: string,
    password: string
};

async function findUserInDb(userObj: UserInput): Promise<boolean> {
    const users = await getAllUsers();
    return validateUser(users, userObj);
}

//Fetch users from firebase
async function getAllUsers(): Promise<UserValidation[]> {
    const url: string = 'https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    const response = await fetch(url);
    const users = await response.json();
    console.log(users)
    return users;
}

//Checks if the new users password and email matches an registered users email and password
//Return true if its a match
function validateUser(users: UserValidation[], userObj: UserInput):boolean{
    let userFound: boolean = false;

    console.log('VALIDATION');
    console.log('ALL USERS',users);
    console.log('USER OBJECT', userObj);
    if(users !== null){
        for (const user of users) {
            if (user["email"] === userObj["email"] && user["password"] === userObj["password"]) {
              console.log('User found!');
              userFound = true;
            }
            else{
                console.log('User does not exist in database');
            }
          }
    }
      return userFound;
}

async function addUserToDb(user:User) {
    console.log("ADDING USER TO DB");
    let index: number = 0;
    const url: string = `https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${index}.json`;
    const init = {
        method: 'PUT',
        body: JSON.stringify(user),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const response = await fetch(url, init);
    const data = response.json();
    console.log(data);
}

export { findUserInDb, addUserToDb};