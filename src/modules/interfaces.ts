interface UserInput{
    [key: string]: string;
};

interface UserInfo{
    readonly imgUrl: string,
    readonly name: string,
    readonly password: string,
    readonly userName: string,
    posts: Post[]
}

interface Post {
    sender: string,
    date: string,
    message: string
}