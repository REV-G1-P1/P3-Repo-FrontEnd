import { useState } from "react";
import { useDispatch } from "react-redux";
import { approveDenyMortgage, ApproveDenyState, getPendingMortgages } from "../../Redux/Slices/ManagerSlice";
import { DispatchType } from "../../Redux/Store";
import { MortgageApplication } from "../../Types/Mortgage";
import './MortgageStatus.css'

export const MortgageStatus:React.FC<MortgageApplication>= ({
    applicationId,
    firstName,
    homeValue,
    income,
    lastName,
    loanAddress,
    loanAmount,
    ssn,
    status
}) => {

    const dispatch:DispatchType= useDispatch();
    const [mortgageState, setMortageState] = useState<ApproveDenyState>();
    function formatMoney(number:number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      }

      const handleApprove=(e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(approveDenyMortgage({applicationId:applicationId, status:"APPROVED"}))
          .then(()=> {
            setMortageState({applicationId:applicationId, status:"APPROVED"});
            dispatch(getPendingMortgages());
          });
    }
    
    const handleDeny=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        dispatch(approveDenyMortgage({applicationId:applicationId, status:"DENIED"}))
          .then(()=> {
            setMortageState({applicationId:applicationId, status:"DENIED"});
            dispatch(getPendingMortgages());
          });
    }

    return (
        <>
            <div className="MortgageStatusRoot">
                <div className="MortgageStatusButtons">
                    <h3 id="applicationId">#{applicationId}</h3>
                    <button onClick={handleApprove}>Approve</button>
                    <button onClick={handleDeny}>Deny</button>
                </div>
                <span>Name</span>
                <p>{firstName} {lastName}</p>
                <span>Income</span>
                <p>{formatMoney(income)}</p>
                <span>Loan Amount</span>
                <p>{formatMoney(loanAmount)}</p>
                <span>Home Value</span>
                <p>{formatMoney(homeValue)}</p>
                <span>Loan Address</span>
                <p>{loanAddress}</p>
            </div>
        </>
    )
}