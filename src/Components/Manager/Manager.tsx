import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPendingMortgages } from "../../Redux/Slices/ManagerSlice";
import { DispatchType, RootState } from "../../Redux/Store"
import { MortgageApplication } from "../../Types/Mortgage";
import { MortgageStatus } from "../MortgageStatus/MortgageStatus";
import './Manager.css'

export const ManagerPage:React.FC= ()=>{
  const managertState = useSelector((state:RootState) => state.manager);
    const dispatch:DispatchType= useDispatch();

const handleclick = ()=>{
  dispatch(getPendingMortgages());

}

  useEffect(()=>{
console.log('fsdfdsf');
  dispatch(getPendingMortgages());

  },[])

  
    return (

        <>
       
        <div className="ManagerRootContainer">
        
        {
         managertState?
         managertState.pendingMortgages?.map((mortage:MortgageApplication) => {

                return (
                    <MortgageStatus key={mortage.applicationId}
                  firstName={mortage.firstName}
                  lastName={mortage.lastName}
                  homeValue={mortage.homeValue}
                  income={mortage.income}
                  loanAddress={mortage.loanAddress}
                  loanAmount={mortage.loanAmount} 
                  applicationId={mortage.applicationId} 
                  ssn={mortage.ssn}
                  status={mortage.status}                    />
                )
           })
           :<>
         
           </>
           
       }
      </div>
        </>
    )
}