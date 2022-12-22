import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateRemoteBalance } from '../../Redux/Slices/AccountSlice';
import { updateLocalBalance } from '../../Redux/Slices/UserSlice';
import { DispatchType, RootState } from '../../Redux/Store';
import { accountInformation, updateBalance } from '../../Types/AccountInformation';
import './Transfer.css'
export const TransferPage:React.FC= ()=>{
    const userState = useSelector((state:RootState) => state.auth);
    const accounts:accountInformation[] = userState.currentUser.accountInformation;
    const dispatch:DispatchType = useDispatch();

      const [FromAccountValue, setFromAccountValue] = useState("");
      const [ToAccountValue, setToAccountValue] = useState("");
      const [balance, setBalance] = useState(0);
      const [changeBalanceFrom, setChangeBalanceFrom] = useState<updateBalance>();
      const [changeBalanceTo, setChangeBalanceTo] = useState<updateBalance>();
     
      
      const handleAccountChangeFrom = (e: { target: { value: SetStateAction<string>; }; }) => {
        setFromAccountValue(e.target.value);
      };

      const handleAccountChangeTo = (e: { target: { value: SetStateAction<string>; }; }) => {
        setToAccountValue(e.target.value);
      };

      const handleAmountChange= (e: { target: { value: any; }; })=>{
        setBalance(
          e.target.value
        )
}

      const handleTransfer= (e: { preventDefault: () => void; })=>{        
        e.preventDefault(); 
            dispatch(UpdateRemoteBalance(changeBalanceFrom!));
            dispatch(UpdateRemoteBalance(changeBalanceTo!));
        //  console.log("change balance to "+JSON.stringify(changeBalanceTo));
          dispatch(updateLocalBalance(changeBalanceFrom));
          dispatch(updateLocalBalance(changeBalanceTo));
          
        clearInputs();
    }

    const clearInputs= ()=>{
        var select = document.getElementsByTagName('select');
for (var i = 0; i < select.length; i++)
{
    select[i].selectedIndex = 0;
}
setBalance(0);
    }
  
    useEffect(()=>{

        setChangeBalanceFrom({
            index: Number(FromAccountValue),
            accountNumber:accounts[Number(FromAccountValue)]?.accountNumber,
            balance:Number(accounts[Number(FromAccountValue)]?.balance)-Number(balance)        
         });
         setChangeBalanceTo({
            index: Number(ToAccountValue),
            accountNumber:accounts[Number(ToAccountValue)]?.accountNumber,
            balance:Number(accounts[Number(ToAccountValue)]?.balance)+Number(balance)        
         });
         console.log("change balance to "+JSON.stringify(changeBalanceTo));
         console.log("change balance from "+JSON.stringify(changeBalanceFrom));
        
    },[FromAccountValue, ToAccountValue, balance])
  
    return (
        <>
        <div className='TransferRootContainer'>
         <h1 className= "TransferHeader">Transfer</h1>
         <div className='TransferContainer'>
         <select id="fromAccount" onChange={handleAccountChangeFrom}>
            <option>
Account Selection From 
            </option>
            <option value="0">
{accounts[0]?.accountType}
            </option>
            <option value="1">
{accounts[1]?.accountType}
            </option>
           </select>

           <select id="fromAccount" onChange={handleAccountChangeTo}>
            <option>
Action Selection to
            </option>
            <option value="0">
{accounts[0]?.accountType}
            </option>
            <option value="1">
{accounts[1]?.accountType}
            </option>
           </select>

            <div className='TransferButtonsContainer'>
<input className='TransferPriceElement' type='number' 
value={balance} onChange={handleAmountChange} ></input>
<button onClick={handleTransfer}>Submit</button>
  
            </div>
         </div>
         
        </div>
        </>
    )
}