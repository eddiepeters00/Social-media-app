import { User } from "./User";

export interface UserInput{
    [key: string]: string;
};

export interface UserInfo{
    readonly name: string,
    readonly userName: string,
    readonly password: string,
    readonly imgUrl: string,
    posts: Post[]
}

export interface Post {
    sender: string,
    date: string,
    message: string
}

//Creating a new User-object
export function createNewUser(localUser: string) {
    const storedUserInfo = localStorage.getItem(localUser);
    console.log(storedUserInfo);
    if (storedUserInfo !== null) {
        if(localUser === 'user'){
            const userInfo: string[] = JSON.parse(storedUserInfo);
            if(typeof userInfo[3] == 'object' || userInfo[3] === ''){
                const user: User = new User(userInfo[0], userInfo[1], userInfo[2], userInfo[4]);
                console.log(user);
                return user;
            }
            else{
                const user: User = new User(userInfo[0], userInfo[1], userInfo[2], userInfo[3]);
                console.log(user);
                return user;
            }
        }else{
            const userInfo: string[] = JSON.parse(storedUserInfo);
            const user: User = new User(userInfo[2], userInfo[0], 'password', userInfo[1]);
            console.log(user);
            return user;
        }
    }
    return;
}