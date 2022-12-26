export interface User {
    id: string;
    name: string;
    role:string;
    email:string;
    active:boolean;
}

export interface UserMutation{
    name:string;
    role:string;
    email:string;
    active:boolean;
}