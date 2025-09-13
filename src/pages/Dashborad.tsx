import TopBar from "../components/global/TopBar";
import SideBar from "../components/global/SideBar";
import TotalCard from "../components/dashboard/TotalCard";
import IncomeCard from "../components/dashboard/IncomeCard";
import ExpenseCard from "../components/dashboard/ExpenseCard";
import SavingsCard from "../components/dashboard/SavingsCard"

export default function DashboardPage() {
    return(
        <div className="w-full h-auto">

            <div className="w-full flex items-center justify-center">
                <TopBar/>
            </div>

            <div className = 'w-full flex flex-row gap-20 mt-5'>
                <div className = ''>
                    <SideBar/>
                </div>

                <div className="md:mr-10 flex flex-1 flex-col gap-10">
                    {/* For everything in the dashboard */}
                    <div className = ''>
                        <TotalCard/>
                    </div>

                    <div className = 'w-full flex flex-row gap-95'>
                        <div className = ''>
                            <IncomeCard/>
                        </div>

                        <div className = ''>
                            <ExpenseCard/>
                        </div>

                        <div className = ''>
                            <SavingsCard/>
                        </div>
                    </div>

                    <div>
                        {/* TODO: Charts for overall stats */}
                    </div>

                </div>

            </div>

        </div>
    )
}