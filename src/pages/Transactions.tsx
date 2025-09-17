import SideBar from "../components/global/SideBar";
import TopBar from '../components/global/TopBar';
import TransactionsList from "../components/transactions/TransactionsList";

export default function TransactionsPage() {
    return (
        <div className ='w-full h-auto'>
            <div className="w-full flex items-center justify-center">
                <TopBar/>
            </div>

            <div className = 'w-full flex flex-row gap-20 mt-5 pr-7'>
                <div>
                    <SideBar/>
                </div>

                <div className = 'w-7/8 mt-8'>
                    <TransactionsList/>
                </div>
            </div>
        </div>
    );
}