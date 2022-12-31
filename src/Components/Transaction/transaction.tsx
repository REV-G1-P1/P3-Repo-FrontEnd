import { Transactions } from "../../Types/Transactions";
import './transaction.css';
export const TransactionPage:React.FC<Transactions> = ({ 
    transactionId,
    accountNumber,
    accountType, 
    balanceChange, 
    transactionType, 
    transactionTime
    }) => {
    
    function formatMoney(number:number) {
            return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
          }

    return (
        <>
            <div className="transactionRoot">
                <div className="transactionContainer">
                    <p id="transactionAccountNumber">ACCT# {accountNumber}</p>
                    <p id="transactionAccountType">{accountType}</p>
                    <p id="transactionAccountChange">{formatMoney(balanceChange)}</p>
                    <p id="transactionTransactionType">{transactionType}</p>
                    <p id="transactionTransactionDate">{`${transactionTime[1]}/${transactionTime[2]}/${transactionTime[0]}`}</p>
                </div>
            </div>
        </>
    )
}