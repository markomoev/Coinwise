import { useState } from "react";
import SideBar from "../components/global/SideBar";
import TopBar from '../components/global/TopBar';
import TransactionsList from "../components/transactions/TransactionsList";
import TransactionPopup from "../components/transactions/TransactionPopup";

export default function TransactionsPage() {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="relative w-full h-auto">
            {/* whole content */}
            <div className={`transition ${showPopup ? "blur-sm" : ""}`}>
                <div className="w-full flex items-center justify-center">
                    <TopBar/>
                </div>

                <div className="w-full flex flex-row gap-20 mt-5 pr-7">
                    <div>
                        <SideBar/>
                    </div>

                    <div className="w-7/8 mt-8">
                        <TransactionsList 
                            AddTransaction={() => setShowPopup(true)} />
                    </div>
                </div>
            </div>

            {/* Overlay + Popup */}
            {showPopup && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={() => setShowPopup(false)} // close on outside click
                    />
                    {/* Popup */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            <TransactionPopup
                                closePopup = {() => setShowPopup(false)} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
