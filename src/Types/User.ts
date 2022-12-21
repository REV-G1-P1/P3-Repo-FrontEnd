export interface User{
user_id?: number,
first_name: string,
last_name: string,
email:string,
password: string,
ssn:number,
user_role?: string

    
}


export interface loginUser{
    email:string,
    password:string
}