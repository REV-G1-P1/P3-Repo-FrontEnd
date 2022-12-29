import { MortgageApplication } from "../../Types/Mortgage"

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
       
        <div className="AccountRootContainer">
        <h3 className=' AccountType'>{applicationId} ApplicationId </h3>
        <h3 className='AccountHeader'>First Name:   {firstName} </h3>
        <h3 className='AccountHeader'>Last Name: {lastName} </h3>
        <h3 className='AccountHeader'>Income: {formatMoney(income)} </h3>
        <h3 className='AccountHeader'>Home Value: {formatMoney(homeValue)} </h3>
        <h3 className='AccountHeader'>Loan Amount: {formatMoney(loanAmount)} </h3>
        <h3 className='AccountHeader'>Loan Address: {loanAddress} </h3>
        <h3 className='AccountHeader'>Status: {status} </h3>
       
      

        </div>
        <br/>
        </>
    )
}