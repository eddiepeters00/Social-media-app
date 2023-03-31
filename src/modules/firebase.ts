import { User } from "./User";

type UserInput = {
    [key: string]: string;
};

type UserValidation = {
    userName: string,
    password: string
};

type UserInfo = {
    name: string,
    userName: string,
    password: string
    imgUrl: string
    posts: string[]
}

async function findUserInDb(userObj: UserInput): Promise<boolean | Object> {
    const users = await getAllUsers();
    console.log(users);
    return validateUser(users, userObj);
}

//Fetch users from firebase
async function getAllUsers(): Promise<UserInfo[]> {
    const url: string = 'https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    const response = await fetch(url);
    const users = await response.json();
    return users;
}

//Checks if the new users password and email matches an registered users email and password
//Return true if its a match
function validateUser(users: UserInfo[], userObj: UserInput): Object | UserInfo {
    let userFound = {};

    console.log('VALIDATION');
    if (users !== null) {
        for (const user of users) {
            if (user["userName"] === userObj["userName"] && user["password"] === userObj["password"]) {
                console.log('User found!');
                userFound = user;
                console.log(userFound);
            }
        }
    }
    else{
        console.log('user not found');
    }
    return userFound;
}

async function addUserToDb(userObj: UserInput) {
    const users = await getAllUsers();
    let index: number = 0;
    if (users !== null) {
        index = users.length;
    }

    const url: string = `https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${index}.json`;
    const init = {
        method: 'PUT',
        body: JSON.stringify(userObj),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const response = await fetch(url, init);
    const data = response.json();
    console.log(data);
}

export { findUserInDb, addUserToDb, getAllUsers };