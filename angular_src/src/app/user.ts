export class User {
    id: number; 
    username: string;
    email: string; 
    name: string; 
    bio: string; 
    constructor() {
        this.id = 1;
        this.name = "Loading...";
        this.bio = "";
        this.email = "email@loading";
        this.username = "loadingUser...";
    }
    set(id: number, username: string, email: string, name: string, bio: string) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.email = email;
        this.username = username;
    }
}