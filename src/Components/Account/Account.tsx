import { accountInformation } from '../../Types/AccountInformation';
import './Account.css';

export const AccountPage:React.FC<accountInformation> = ({accountNumber, routingNumber, balance, accountType }) => {

    function formatMoney(number:number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (
        <>
            <div className="AccountRootContainer">
                <h3 className=' AccountType'>{accountType === "CHECKING" ? 'Checking' : 'Saving'} Account </h3>
                <h3 className='AccountHeader'>Account Number: {accountNumber} </h3>
                <h3 className='AccountHeader'>Routing Number: {routingNumber} </h3>
                <h3 className='AccountHeader'>Balance: {formatMoney(balance)} </h3>
            </div>
        </>
    )
}