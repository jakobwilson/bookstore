export interface Category {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    categoryid: number;
    title: string;
    author: string;
    price: number;
    _created: string;
}

export interface User extends NewUser {
    id: number;
    role: string;
    _created: string;
}

export interface NewUser {
    email: string;
    password: string;
    name: string;
}

export interface Payload {
    id: number;
    name: string;
    role: string;
}

declare global {
    namespace Express {
        export interface User extends Payload {}
    }
}
