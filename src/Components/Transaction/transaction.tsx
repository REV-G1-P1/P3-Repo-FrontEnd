import { Transactions } from "../../Types/Transactions"
import './transaction.css'
export const TransactionPage:React.FC<Transactions> = ({  transactionId,accountNumber,
    accountType, balanceChange, transactionType, transactionTime}) => {

        function formatMoney(number:number) {
            return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          }
return (

    <>
        <div className="transactionRoot">
            <div className="transactionContainer">
            <p>{accountNumber}</p>
            <p>{accountType}</p>
            <p>{formatMoney(balanceChange)}</p>
            <p>{transactionType}</p>
            <p>{`${transactionTime[1]}/${transactionTime[2]}/${transactionTime[0]}`}</p>
            </div>
        </div>
    </>
)
}
