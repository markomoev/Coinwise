import SideBar from "../components/global/SideBar";
import TopBar from '../components/global/TopBar';

export default function TransactionsPage() {
    return (
        <div className ='w-full h-auto'>
            <div className="w-full flex items-center justify-center">
                <TopBar/>
            </div>

            <div className = 'w-full flex flex-row gap-20 mt-5'>
                <div>
                    <SideBar/>
                </div>
            </div>
        </div>
    );
}