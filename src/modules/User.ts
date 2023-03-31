export class User{
    constructor(
        private readonly imgUrl:string,
        private readonly name:string,
        private readonly password:string,
        private readonly userName:string,
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

    getInfo(){
        return {
            name: this.name,
            userName: this.userName,
            imgUrl: this.imgUrl
        }
    }
}