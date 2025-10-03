import SideBar from "../../components/global/SideBar";

import TotalCard from "../../components/dashboard/cards/TotalCard";
import IncomeCard from "../../components/dashboard/cards/IncomeCard";
import ExpenseCard from "../../components/dashboard/cards/ExpenseCard";
import SavingsCard from "../../components/dashboard/cards/SavingsCard";

import FundsPopup from "../../components/dashboard/FundsPopup";
import TransferPopup from "../../components/dashboard/TransferPopup";

import { useState } from "react";

export default function DashboardPage() {
    const [showFundsPopup, setShowFundsPopup] = useState(false);
    const [showTransferPopup, setShowTransferPopup] = useState(false);

    return(
        <div className="w-full h-auto">
            <div className = 'w-full flex flex-row gap-20'>
                    
                    <SideBar/>

                <div className="md:mr-10 md:mt-0 mt-10 flex flex-1 flex-col gap-10 w-full h-auto items-center">
                    {/* for everything in the dashboard */}

                        <TotalCard
                            showTransferPopup = {() => setShowTransferPopup(true)}
                            showFundsPopup = {() => setShowFundsPopup(true)}/>

                    <div className = 'w-full flex md:flex-row flex-col md:gap-88.5 gap-10 justify-center items-center'>  
                            <IncomeCard/>

                            <ExpenseCard/>

                            <SavingsCard/>
                    </div>

                    <div>
                        {/* TODO: Charts for overall stats */}
                    </div>

                </div>

            </div>

            {showFundsPopup &&
                <>
                {/* overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={() => setShowFundsPopup(false)} // close on outside click
                    />
                    
                {/* popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <FundsPopup
                            closePopup = {() => setShowFundsPopup(false)}/>
                    </div>
                </div>
                </>
            }

            {showTransferPopup &&
                <>
                {/* overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={() => setShowTransferPopup(false)} // close on outside click
                    />
                    
                {/* popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <TransferPopup
                            closeTransferPopup = {() => setShowTransferPopup(false)}/>
                    </div>
                </div>
                </>
            }

        </div>
    )
}