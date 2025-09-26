import SideBar from "../components/global/SideBar";
import TotalCard from "../components/dashboard/TotalCard";
import IncomeCard from "../components/dashboard/IncomeCard";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import SavingsCard from "../components/dashboard/SavingsCard"
import FundsPopup from "../components/dashboard/FundsPopup";

import { useState} from "react";

export default function DashboardPage() {
    const [showPopup, setShowPopup] = useState(false);

    return(
        <div className="w-full h-auto">
            <div className = 'w-full flex flex-row gap-20'>
                    
                    <SideBar/>

                <div className="md:mr-10 md:mt-0 mt-10 flex flex-1 flex-col gap-10 w-full h-auto items-center">
                    {/* for everything in the dashboard */}

                        <TotalCard
                            showPopup = {() => setShowPopup(true)}/>

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

            {showPopup &&
                <>
                {/* overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={() => setShowPopup(false)} // close on outside click
                    />
                    
                {/* popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <FundsPopup
                            closePopup = {() => setShowPopup(false)}/>
                    </div>
                </div>
                </>
            }

        </div>
    )
}