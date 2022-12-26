import { AccountPage } from "../Account/Account"
import './Home.css'
import { TransferPage } from "../Transfer/Transfer";
import { DepositWithdrawPage } from "../DepositWithdraw/DepositWithdraw";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { accountInformation } from "../../Types/AccountInformation";
import { useEffect } from "react";
import { User } from "../../Types/User";
import { useNavigate } from "react-router-dom";

export const HomePage:React.FC= ()=>{
    
    const userState = useSelector((state:RootState) => state.auth);
    const user:User = JSON.parse(localStorage.getItem("user")||'{}');
    const navigate = useNavigate();
    console.log("user home localstorage "+JSON.stringify(user));
   // console.log("user home auth state "+JSON.stringify(userState));
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

        const handleMorgageButton= (e: { preventDefault: () => void; })=>{
             e.preventDefault();
             navigate("/mortgage");
        }

        useEffect( ()=>{
            console.log("useEffect "+JSON.stringify(user.accountInformation));
            if(!userState.currentUser){userState.currentUser=user};
        //     console.log("home page use effect "+JSON.stringify(userState.currentUser))
        },[userState.currentUser])
    
    return (
        <>
       

        <div className="HomeRootContainer">
        <h1 className="HomePageHeader">Hello {!user?
        userState.currentUser.firstName?.charAt(0).toUpperCase() + userState.currentUser.firstName?.slice(1)
       :user.firstName?.charAt(0).toUpperCase() + user.firstName?.slice(1)
     
    }</h1>
             <div className="HomeAccountContainers">
            <div className="LeftHomeContainer">
            {
           userState.currentUser.accountInformation.length? userState.currentUser.accountInformation?.map((account:accountInformation) => {
               
                return <AccountPage key={account.accountNumber} 
                accountName={''} accountNumber={account.accountNumber} 
                routingNumber={account.routingNumber} balance= {account.balance}
                accountType = {account.accountType}          />
                
            })
            :
            user.accountInformation?.map((account:accountInformation) => {
               
                return <AccountPage key={account.accountNumber} 
                accountName={''} accountNumber={account.accountNumber} 
                routingNumber={account.routingNumber} balance= {account.balance}
                accountType = {account.accountType}          />
                
            })
       }
                </div>
                <div className="CenterHomeContainer"></div>
                <div className='MobileAccountButtons'>
                <button className="flex-button" onClick={handleTransferButton}> Transfer</button>
                <button className="flex-button" onClick={handleDepositButton}>Withdraw/Deposit</button>
                <button className="flex-button" onClick={handleMorgageButton}>Apply For Mortgage</button>

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

