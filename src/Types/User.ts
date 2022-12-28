import { accountInformation } from "./AccountInformation"
import { Addresses } from "./Addresses"

export interface User{
userId?: number,
firstName: string,
lastName: string,
email:string,
password: string,
phoneNumber:number,
ssn:number,
address:Addresses,
accountInformation:accountInformation[]
}


export interface loginUser{
    email:string,
    password:string
}