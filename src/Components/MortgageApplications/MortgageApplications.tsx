import { MortgageApplication } from "../../Types/Mortgage"
import './MortgageApplications.css';

export const MortgageApplicationPage:React.FC<MortgageApplication>= ({
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
    function formatMoney(number:number) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    return (
        <>
            <div className="MortgageApplicationRootContainer">
                <h3 className=' MortgageTitle'>Application #{applicationId}</h3>
                <h3 className='MortgageHeader'>First Name:   {firstName} </h3>
                <h3 className='MortgageHeader'>Last Name: {lastName} </h3>
                <h3 className='MortgageHeader'>Income: {formatMoney(income)} </h3>
                <h3 className='MortgageHeader'>Home Value: {formatMoney(homeValue)} </h3>
                <h3 className='MortgageHeader'>Loan Amount: {formatMoney(loanAmount)} </h3>
                <h3 className='MortgageHeader'>Loan Address: {loanAddress} </h3>
                <h3 className='MortgageHeader'>Status: {status} </h3>
            </div>
            <br/>
        </>
    )
}