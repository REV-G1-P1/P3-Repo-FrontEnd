import './Transfer.css'
export const TransferPage:React.FC= ()=>{

    return (
        <>
        <div className='TransferRootContainer'>
         <h1 className= "TransferHeader">Transfer</h1>
         <div className='TransferContainer'>
           <select>
            <option>
Account Selection From 
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
Action Selection to
            </option>
            <option>
Checking Account
            </option>
            <option>
Saving Account
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