import './Account.css'
export const AccountPage:React.FC =()=>{


    interface Account{
        account_name:string,
        account_type: string,
        balance:number,
        rounting_number:number
    }
    const savingAccount:Account={
        account_name: "12315SVAC",
        account_type:"Saving Account",
        balance: 100,
        rounting_number: 123116561
    }

    return (

        <>
        <div className="AccountRootContainer">
        <h1 className='AccountHeader'> {savingAccount.account_type} </h1>
        <h1 className='AccountHeader'> {savingAccount.rounting_number} </h1>
        <h1 className='AccountHeader'> ${savingAccount.balance} </h1>

      

        </div>
     
        </>
    )
}