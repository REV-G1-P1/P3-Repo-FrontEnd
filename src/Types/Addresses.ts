export interface Addresses {
    city:string,
    state:string, 
    streetAddress:string,
    streetAddressLine2:string,
    zipCode: number,
    address?:Addresses
}