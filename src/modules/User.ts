export class User{
    constructor(
        private readonly name:string,
        private readonly email:string,
        private readonly password:string,
        private readonly imgUrl:string
    ){}

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getImgUrl(){
        return this.imgUrl;
    }
}