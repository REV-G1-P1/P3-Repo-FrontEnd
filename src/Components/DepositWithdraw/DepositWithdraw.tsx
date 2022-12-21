import './DepositWithdraw.css'
export const DepositWithdrawPage:React.FC= ()=>{

    return (
        <>
        <div className='TransferRootContainer'>
         <h1 className= "TransferHeader">Deposit/ Withdraw</h1>
         <div className='TransferContainer'>
           <select>
            <option>
Account Selection  
            </option>
            <option>
Checking Account
            </option>
            <option>
Saving Account
            </option>
           </select>

           <select>
            <option>
Requested Action 
            </option>
            <option>
Deposit            </option>
            <option>
Withdraw
            </option>
           </select>

            <div className='TransferButtonsContainer'>
<input className='TransferPriceElement' type='number' ></input>
<button >Submit</button>
  
            </div>
         </div>
         
        </div>
        </>
    )
}