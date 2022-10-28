class User {
    public email: string;
    public username: string;
    public age: number;
    constructor(username: string, email: string, age: number) {
        this.username = username;
        this.email = email;
        this.age = age;
    }
}

export default User;
