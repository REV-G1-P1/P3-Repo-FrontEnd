import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { getPendingMortgages } from "../../Redux/Slices/ManagerSlice";
import { DispatchType, RootState } from "../../Redux/Store"
import { MortgageApplication } from "../../Types/Mortgage";
import { MortgageStatus } from "../MortgageStatus/MortgageStatus";
import './Manager.css'

export const ManagerPage:React.FC= ()=>{
    const managerState = useSelector((state:RootState) => state.manager);
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType= useDispatch();
    const navigate = useNavigate();
    const [showMap, setShowMap] = useState(false);

    useEffect(()=>{
        if(userState.currentUser.userRole === "CUSTOMER") {
            navigate("/home");
        }
        dispatch(getPendingMortgages());
        setTimeout(() => {
            setShowMap(true);
          }, 5000);
    },[])

    return (
        <div className="ManagerRootContainer">
            { showMap ? (
                managerState.pendingMortgages
                    .filter((mortgage: MortgageApplication) => mortgage.status === 'PENDING')
                        .map((mortage: MortgageApplication) => {
                            return (
                                <MortgageStatus
                                    key={mortage.applicationId}
                                    firstName={mortage.firstName}
                                    lastName={mortage.lastName}
                                    homeValue={mortage.homeValue}
                                    income={mortage.income}
                                    loanAddress={mortage.loanAddress}
                                    loanAmount={mortage.loanAmount}
                                    applicationId={mortage.applicationId}
                                    ssn={mortage.ssn}
                                    status={mortage.status}
                                />
                            );
                })
            ) : <div>Loading</div>}
        </div>
    );
}