import { Card, Front, Back } from './card';

export class Deck {
    id: number;
    title: string;
    description: string;
    author: string;
    cardArray: Card[];
    numberOfUsers: number;   
    coverImage: string;
    constructor(){
        this.id = -1;
        this.title = "";
        this.description = "";
        this.author = "";
        this.cardArray = [];
        this.numberOfUsers = 0;
        this.coverImage = "./images/deskImg.png";
    }
    set(id: number,title: string,description: string,authorName: string,cardArray: Card[],numberOfUsers: number, coverImage: string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = authorName;
        this.cardArray = cardArray;
        this.numberOfUsers = numberOfUsers;
        this.coverImage = coverImage;
    }
    setRaw(id: number,title: string,description: string,authorName: string,cardArray: any[],numberOfUsers: number, coverImage: string){
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = authorName;
        this.numberOfUsers = numberOfUsers;
        this.coverImage = coverImage;
        var newCardArray = [];
        cardArray.forEach(function(c){
            let newCard = new Card();
            let newFront = new Front(c.front);
            let newBackArray = [];
            c.back.forEach(b => {
                let newBack= new Back(b);
                newBackArray.push(newBack);
            });
            newCard.set(newCardArray.length+1,newFront, newBackArray);
            console.log(newCard);
            newCardArray.push(newCard);
        });
        this.cardArray = newCardArray;
    }
    getRaw(){
        var rawCardArray = [];
        this.cardArray.forEach(c => {
            rawCardArray.push(c.getRaw());
        });
        return {
            id : this.id,
            title : this.title,
            description : this.description,
            author : this.author,
            cardArray : rawCardArray,
            numberOfUsers : this.numberOfUsers,
            coverImage : this.coverImage,
        }
    }
}