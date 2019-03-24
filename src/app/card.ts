export class Card {
    id: number;
    front: Front;
    backArray: Back[];
    constructor() {
        this.id = -1;
        this.front = new Front("");
        this.backArray = [new Back("")];
    }
    set(id: number, front: Front, backArray: Back[]) {
        this.id = id;
        this.front = front;
        this.backArray = backArray;
    }
    setID(id: number) {
        this.id = id;
    }
    getRaw(){
        var rawBackArray = [];
        this.backArray.forEach(b => {
            rawBackArray.push(b.data);
        });
        return{
            front: this.front.data,
            back: rawBackArray
        }
    }
}

export class Back {
    id: number;
    data: string;
    constructor(data: string){
        this.id = 1;
        this.data = data;
    }
    setID(id: number) {
        this.id = id;
    }
}

export class Front {
    type: string;
    data: string;
    constructor(data: string) {
        this.type = this.ValidURL(data)?"image":"text";
        this.data = data;
    }
    ValidURL(str) {
        var exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
        var pattern = new RegExp(exp);
        return pattern.test(str);
    }
}