import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  UpdateRemoteBalance } from '../../Redux/Slices/AccountSlice';
import { getUsers } from '../../Redux/Slices/UserSlice';
import { DispatchType, RootState } from '../../Redux/Store';
import { accountInformation, updateBalance } from '../../Types/AccountInformation';
import { ErrorType } from '../../Types/Error';
import './ReceiveSend.css'

export const ReceiveSendPage:React.FC= ()=>{
    const userState = useSelector((state:RootState) => state.auth);
    const accounts:accountInformation[] = userState.currentUser?
    userState.currentUser.accountInformation:[];
    const dispatch:DispatchType = useDispatch();
      const [accountValue, setAccountValue] = useState("");
      const [actionValue, setActionValue] = useState("");
      const [balance, setBalance] = useState(0);
      const [changeBalance, setChangeBalance] = useState<updateBalance>();
      const [error, setError] = useState<ErrorType>();
      
      const handleAccountChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setAccountValue(e.target.value);
      };

      const handleActionChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setActionValue(e.target.value);
      };

      const handleReceiveSend= (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        if(accounts[Number(accountValue)].balance-balance<0 && actionValue==="send")
        {
          setError({
            showError:true,
            message:'Insufficient Balance'
          })
          setInterval(function(){ setError({
            showError:false,
            message:''
          })},3000);
          clearInputs();
        }else{
          dispatch(UpdateRemoteBalance(changeBalance!))
          .then(() => dispatch(getUsers()));
          clearInputs();
    }
  }

    const handleAmountChange= (e: { target: { value: any; }; })=>{
                 setBalance(
                   e.target.value
                 )
    }

    useEffect(()=>{
   
      if(actionValue==="receive"){
        setChangeBalance({
           index: Number(accountValue),
           accountNumber:accounts[Number(accountValue)]?.accountNumber,
           balance:Number(accounts[Number(accountValue)]?.balance)+Number(balance)        
    });
    
    }else if(actionValue==="send")
    {
     
        setChangeBalance({
            index: Number(accountValue),
            accountNumber:accounts[Number(accountValue)]?.accountNumber,
            balance:accounts[Number(accountValue)]?.balance-balance<0
            ?accounts[Number(accountValue)]?.balance
            :accounts[Number(accountValue)]?.balance-balance       
     });
    
  }
    
    },[accountValue, actionValue, balance])

    const clearInputs= ()=>{
        var select = document.getElementsByTagName('select');
        for(var i = 0; i < select.length; i++) {
            select[i].selectedIndex = 0;
        }
        setBalance(0);
    }

    return (
        <>
            <form className='TransferRootContainer' onSubmit={handleReceiveSend}>
                <h1 className= "TransferHeader">Receive / Send</h1>
                <div className='TransferContainer'>
                    <select id="fromAccount" onChange={handleAccountChange}>
                        <option value="default">Account Selection</option>
                        <option value="0">{accounts[0]?.accountNumber}</option>
                        <option value="1">{accounts[1]?.accountNumber}</option>
                    </select>
                    <select id="withAction" onChange={handleActionChange}>
                        <option>Requested Action</option>
                        <option value="receive">Receive</option>
                        <option value="send">Send</option>
                    </select>
                    <div className='TransferButtonsContainer'>
                        <input className='TransferPriceElement' type='number' value ={balance} onChange={handleAmountChange} required></input>
                        <button>Submit</button>
                    </div>
                    <p>{error?.showError? error.message:''}</p>
                </div>
            </form>
        </>
    )
}

