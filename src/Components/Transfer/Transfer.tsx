import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { accountInformation } from '../../Types/AccountInformation';
import './Transfer.css'
export const TransferPage:React.FC= ()=>{
    const userState = useSelector((state:RootState) => state.auth);
    const accounts:accountInformation[] = userState.currentUser.accountInformation;
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
{accounts[0]?.accountType}
            </option>
            <option>
{accounts[1]?.accountType}
            </option>
           </select>

           <select>
            <option>
Action Selection to
            </option>
            <option>
{accounts[0]?.accountType}
            </option>
            <option>
{accounts[1]?.accountType}
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