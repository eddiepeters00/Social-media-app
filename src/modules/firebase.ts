import { User } from "./User";

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


async function getUserIndex(user: User): Promise<any> {
    const allUsers = await getAllUsers();
    for (let i: number = 0; i < allUsers.length; i++) {
        if (user !== undefined && allUsers[i].userName === user.getUserName() && allUsers[i].password === user.getPassword()) {
            return i;
        }
    }
}

async function getPostsFromDb(index: number): Promise<Post[]>{
    console.log(index);
    const postUrl = `https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${index}/posts.json`;
    const response = await fetch(postUrl);
    const posts = await response.json();
    console.log(posts);
    return posts;
}

async function addPostsToDb(userIndex: number, posts: Post[]){
    const url = `https://js2-social-media-default-rtdb.europe-west1.firebasedatabase.app/users/${userIndex}/posts.json`;
    const init = {
        method: 'PUT',
        body: JSON.stringify(posts),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }

    const response = await fetch(url, init);
    const data = response.json();
    console.log(data);
}


//Checks if the new users password and email matches an registered users email and password
//Return true if its a match
function validateUser(users: UserInfo[], userObj: UserInput): Object {
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
    else {
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


export { findUserInDb, addUserToDb, getAllUsers, getUserIndex, getPostsFromDb, addPostsToDb };