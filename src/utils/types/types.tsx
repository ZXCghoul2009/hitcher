export interface Cards {
    id: number,
    seats: string;
    departure: string;
    arrival: string;
    day: string;
    time: string;
    price:number;
    description?:string;
    user?:null;
}
export interface Trip {
    id: number,
    seats: string;
    departure: string;
    arrival: string;
    day: string;
    time: string;
    price:number;
    description?:string;
    user?:null;
}