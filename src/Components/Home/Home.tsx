import { AccountPage } from "../Account/Account"
import './Home.css'
import { TransferPage } from "../Transfer/Transfer";
import { DepositWithdrawPage } from "../DepositWithdraw/DepositWithdraw";

export const HomePage:React.FC= ()=>{

        const handleTransferButton= (e: { preventDefault: () => void; })=>{
            e.preventDefault();
            document.getElementById("transferPage")!.style.display="block";
            document.getElementById("depositWithdrawPage")!.style.display="none";
        }
        const handleDepositButton= (e: { preventDefault: () => void; })=>{
            e.preventDefault();
            document.getElementById("transferPage")!.style.display="none";
            document.getElementById("depositWithdrawPage")!.style.display="block";
        }
    
    return (
        <>
        

        <div className="HomeRootContainer">
        <h1 className="HomePageHeader">Home page</h1>
      
          
             <div className="HomeAccountContainers">
            <div className="LeftHomeContainer">
            <AccountPage/>
            <br/>
            <AccountPage/>
                </div>
                <div className="CenterHomeContainer"></div>
                <div className='MobileAccountButtons'>
                <button className="flex-button" onClick={handleTransferButton}> Transfer</button>
                <button className="flex-button" onClick={handleDepositButton}>Withdraw/Deposit</button>
                <button className="flex-button">Apply For Mortgage</button>

            </div>
                <div className= "RightHomeContainer">
                    <div id="transferPage">
                        <br/>
           <TransferPage />
           </div>
           <br/>
           <div id="depositWithdrawPage">
           <DepositWithdrawPage/>
           </div>
            </div>

        </div>
        </div>
        </>
    )
}

