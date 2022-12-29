import { Transactions } from "../../Types/Transactions"
import './transaction.css'
export const TransactionPage:React.FC<Transactions> = ({  transactionId,accountNumber,
    accountType, balanceChange, transactionType, transactionTime}) => {
return (

    <>
    <div className="transactionRoot">
         
         <div className="transactionContainer">
           
          <p> {accountNumber}</p>
          <p>{accountType}</p>
          <p>{balanceChange}</p>
          <p>{transactionType}</p>
          <p>{transactionTime}</p>
            
         </div>

    </div>
    
    </>
)
}