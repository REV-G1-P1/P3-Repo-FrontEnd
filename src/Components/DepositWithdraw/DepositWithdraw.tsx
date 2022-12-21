import { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  UpdateRemoteBalance } from '../../Redux/Slices/AccountSlice';
import { updateLocalBalance } from '../../Redux/Slices/UserSlice';
import { DispatchType, RootState } from '../../Redux/Store';
import { accountInformation, updateBalance } from '../../Types/AccountInformation';
import './DepositWithdraw.css'
export const DepositWithdrawPage:React.FC= ()=>{
    const userState = useSelector((state:RootState) => state.auth);
    const accounts:accountInformation[] = userState.currentUser.accountInformation;
    const dispatch:DispatchType = useDispatch();
      const [accountValue, setAccountValue] = useState("");
      const [actionValue, setActionValue] = useState("");
      const [balance, setBalance] = useState(0);
      const [changeBalance, setChangeBalance] = useState<updateBalance>();
      
      const handleAccountChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setAccountValue(e.target.value);
      };

      const handleActionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setActionValue(e.target.value);
      };

      const handleDepositWithdraw= ()=>{
        if(actionValue==="deposit"){
            setChangeBalance({
               index: Number(accountValue),
               accountNumber:accounts[Number(accountValue)].accountNumber,
               balance:Number(accounts[Number(accountValue)].balance)+Number(balance)        
        });
        
        }else if(actionValue==="withdraw")
        {
            setChangeBalance({
                index: Number(accountValue),
                accountNumber:accounts[Number(accountValue)].accountNumber,
                balance:accounts[Number(accountValue)].balance-balance        
         }); 
        }
        dispatch(UpdateRemoteBalance(changeBalance!));
     
        dispatch(updateLocalBalance(changeBalance));
    }

    const handleAmountChange= (e: { target: { value: any; }; })=>{
                 setBalance(
                   e.target.value
                 )
    }

    return (
        <>
        <div className='TransferRootContainer'>
         <h1 className= "TransferHeader">Deposit/ Withdraw</h1>
         <div className='TransferContainer'>
      
           <select id="fromAccount" onChange={handleAccountChange}>
            
            <option value="default">
Account Selection  
            </option>
            
            <option value="0">
{accounts[0]?.accountType}
            </option>
            <option value="1">
{accounts[1]?.accountType}
            </option>
           </select>
          
           <select id="withAction" onChange={handleActionChange}>
            <option>
Requested Action 
            </option>
            <option value="deposit">
Deposit            </option>
            <option value="withdraw">
Withdraw
            </option>
           </select>
          
            <div className='TransferButtonsContainer'>
<input className='TransferPriceElement' type='number' onChange={handleAmountChange}></input>
<button onClick={handleDepositWithdraw}>Submit</button>
  
            </div>
         
         </div>
        
        </div>
        </>
    )
}

