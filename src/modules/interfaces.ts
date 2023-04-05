interface UserInput{
    [key: string]: string;
};

interface UserInfo{
    readonly name: string,
    readonly userName: string,
    readonly password: string,
    readonly imgUrl: string,
    posts: Post[]
}

interface Post {
    sender: string,
    date: string,
    message: string
}