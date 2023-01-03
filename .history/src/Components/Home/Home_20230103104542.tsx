import { AccountPage } from "../Account/Account"
import './Home.css';
import { TransferPage } from "../Transfer/Transfer";
import { ReceiveSendPage } from "../ReceiveSend/ReceiveSend";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { accountInformation } from "../../Types/AccountInformation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Transactions } from "../../Types/Transactions";
import { TransactionPage } from "../Transaction/transaction";
import { MortgageApplication } from "../../Types/Mortgage";
import { MortgageApplicationPage } from "../MortgageApplications/MortgageApplications";


export const HomePage:React.FC= ()=>{
    
    const userState = useSelector((state:RootState) => state.auth);
    const navigate = useNavigate();
  
    const handleTransferButton= (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        document.getElementById("transferPage")!.style.display="block";
        document.getElementById("receiveSendPage")!.style.display="none";
    }

    const handleReceiveButton= (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        document.getElementById("transferPage")!.style.display="none";
        document.getElementById("receiveSendPage")!.style.display="block";
    }

    const handleMorgageButton= (e: { preventDefault: () => void; }) => {
            e.preventDefault();
            navigate("/mortgage");
    }

    useEffect(() => {
        if(!userState.isLoggedIn) navigate('/login');
        if(userState.currentUser.userRole !== "MANAGER")navigate("/manager");
    },[]);
    
    return (
        <>
            <div className="HomeRootContainer">
                <h1 className="HomePageHeader">Hello {userState.currentUser ?
                    userState.currentUser.firstName?.charAt(0).toUpperCase() + userState.currentUser.firstName?.slice(1) + ","
                    : " " }
                </h1>
                <div className="HomeAccountContainers">
                    <div className="LeftHomeContainer">
                        { userState.currentUser ?
                            userState.currentUser.accountInformation?.slice().sort((a:accountInformation, b: accountInformation) => {
                                if (a.accountType < b.accountType) {
                                    return -1;
                                  } else if (a.accountType > b.accountType) {
                                    return 1;
                                  } else {
                                    return 0;
                                  }
                            }).map((account:accountInformation) => {
                                return <AccountPage key={account.accountNumber} 
                                            accountName={''} 
                                            accountNumber={account.accountNumber} 
                                            routingNumber={account.routingNumber} 
                                            balance= {account.balance}
                                            accountType = {account.accountType}
                                        />
                            })
                            : <></>
                        }
                    </div>
                    <div className="CenterHomeContainer"></div>
                    <div className='MobileAccountButtons'>
                        <button className="flex-button" onClick={handleTransferButton}> Transfer</button>
                        <button className="flex-button" onClick={handleReceiveButton}>Send/Receive</button>
                        <button className="flex-button" onClick={handleMorgageButton}>Apply For Mortgage</button>

                    </div>
                    <div className= "RightHomeContainer">
                        <div id="transferPage">
                            <br/>
                            <TransferPage />
                        </div>
                        <br/>
                        <div id="receiveSendPage">
                            <ReceiveSendPage/>
                        </div>
                    </div>

                    <div className= "EndtHomeContainer">
                        <h1>Transactions</h1>
                        <div style={{overflowY: 'scroll', height: '455px'}}>
                            { userState.currentUser ?
                                userState.currentUser.transactions?.slice().reverse().map((transaction:Transactions) => {
                                    return (
                                        <TransactionPage key={transaction.transactionId} 
                                            transactionId={transaction.transactionId}
                                            accountNumber={transaction.accountNumber} 
                                            accountType={transaction.accountType}
                                            balanceChange={transaction.balanceChange} 
                                            transactionType={transaction.transactionType}
                                            transactionTime={transaction.transactionTime}
                                        />
                                    )
                                })
                                :<></>
                            }
                        </div>
                    </div>
                </div>
                <div className="mortgageHomeContainer">
                    { userState.currentUser ?
                            userState.currentUser.mortgageApplication?.map((mortage:MortgageApplication) => {
                                return <MortgageApplicationPage key={mortage.applicationId} 
                                applicationId={mortage.applicationId} 
                                firstName={mortage.firstName} 
                                homeValue={mortage.homeValue} 
                                income= {mortage.income}
                                lastName = {mortage.lastName}   
                                loanAddress={mortage.loanAddress} 
                                loanAmount={mortage.loanAmount} 
                                ssn={mortage.ssn} 
                                status= {mortage.status}
                                        />
                            })
                            :<></>
                    }
                </div>
            </div> 
        </>
    )
}

