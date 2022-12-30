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

      const handleApprove=(e: { preventDefault: () => void; })=>{
e.preventDefault();
setMortageState({
applicationId:applicationId,
status:"APPROVED"
      })
      console.log("mortgageState "+JSON.stringify(mortgageState))
dispatch(approveDenyMortgage(mortgageState!)).then(
    ()=> dispatch(getPendingMortgages())
)

      }

      const handleDeny=(e: { preventDefault: () => void; })=>{
        e.preventDefault();
        setMortageState({
            applicationId:applicationId,
            status:"DENIED"
                  })
                  console.log("mortgageState "+JSON.stringify(mortgageState))
            dispatch(approveDenyMortgage(mortgageState!)).then(
                ()=> dispatch(getPendingMortgages())
            )
            
                  }

    return (

        <>
        <div className="MortgageStatusRoot">
        <p className=' '>ApplicationId: {applicationId}  </p>
        <p className=''>First Name:   {firstName} </p>
        <p className=''>Last Name: {lastName} </p>
        <p className=''>Income: {formatMoney(income)} </p>
        <p className=''>Loan Amount: {formatMoney(loanAmount)} </p>
        <p className=''>Home Value: {formatMoney(homeValue)} </p>
        <p className=''>Loan Address: {loanAddress} </p>
        <p className=''>Status: {status} </p>
        {status==="PENDING"?
            <div className="MortgageStatusButtons">
            <button onClick={handleApprove}>Approve</button>
            <button onClick={handleDeny}>Deny</button>
        </div>
        :<></>
}
      

        </div>
        <br/>
        </>
    )
}