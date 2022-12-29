import { accountInformation } from "./AccountInformation"
import { Addresses } from "./Addresses"
import {  MortgageApplication } from "./Mortgage"
import { Transactions } from "./Transactions"

export interface User{
userId?: number,
firstName: string,
lastName: string,
email:string,
password: string,
phoneNumber:number,
ssn:number,
address:Addresses,
accountInformation:accountInformation[], 
mortgageApplication: MortgageApplication[],
transactions:Transactions[]
}


export interface loginUser{
    email:string,
    password:string
}