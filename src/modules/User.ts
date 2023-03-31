export class User{
    constructor(
        private readonly name:string,
        private readonly userName:string,
        private readonly password:string,
        private readonly imgUrl:string,
        private readonly posts: Object[] = [{}]
    ){}

    getName(){
        return this.name;
    }

    getEmail(){
        return this.userName;
    }

    getPassword(){
        return this.password;
    }

    getImgUrl(){
        return this.imgUrl;
    }
}