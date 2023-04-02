type Post = {
    sender: string,
    date: string,
    message: string
}

export class User{
    constructor(
        private readonly imgUrl:string,
        private readonly name:string,
        private readonly password:string,
        private readonly userName:string,
        private readonly posts: Post[] = []
    ){}

    getName(){
        return this.name;
    }

    getUserName(){
        return this.userName;
    }

    getPassword(){
        return this.password;
    }

    getImgUrl(){
        return this.imgUrl;
    }

    getPosts(){
        return this.posts;
    }

    addPost(post: Post){
        //Lägg till post-objektet i this.posts
    }

    removePost(post: Post){
        //Ta bort post-objektet i this.posts
    }
}