 export interface accountInformation  
      {
        accountId?:number,
        accountName: string,
        accountNumber: number,
        accountType: string,
        balance: number,
        routingNumber: number
      }


     export enum AccountType{
    CHECKING,
    SAVING
      }


      export interface updateBalance{
        index?:number,
        accountNumber: number,
        balance:number
      }