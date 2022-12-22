import { accountInformation } from '../../Types/AccountInformation'
import './Account.css'
export const AccountPage:React.FC<accountInformation> =({  accountNumber, 
routingNumber, balance, accountType}) => {

    function formatMoney(number:number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }
    return (

        <>
       
        <div className="AccountRootContainer">
        <h1 className='AccountHeader'>Account Type: {accountType} </h1>
        <h1 className='AccountHeader'>Account Number:   {accountNumber} </h1>
        <h1 className='AccountHeader'>Routing Number: {routingNumber} </h1>
        <h1 className='AccountHeader'>Balance: {formatMoney(balance)} </h1>
       
      

        </div>
        <br/>
        </>
    )
}