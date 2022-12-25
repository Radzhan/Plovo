export interface User {
    id: string;
    name: string;
    role:string;
    email:string;
    in:boolean;
}

export interface UserMutation{
    name:string;
    role:string;
    email:string;
    in:boolean;
}