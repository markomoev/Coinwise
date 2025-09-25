import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../client";

import SideBar from "../components/global/SideBar";
import TransactionsList from "../components/transactions/TransactionsList";
import TransactionPopup from "../components/transactions/TransactionPopup";

type Transaction= {
  id: number;
  name: string;
  amount: number;
  type: string;
  date: string | null;
  note?: string;
  created_at: string;
};

export default function TransactionsPage() {
    const [showPopup, setShowPopup] = useState(false);

        // exporting db data about the last transaction
        const [transactions, setTransactions] = useState<Transaction[]>([]);
    
        const fetchLastTransaction = async () => {
    
            const { data: { user } } = await supabase.auth.getUser()
            const currentUser = user?.id;
    
            const { data, error } = await supabase
            .from('Transactions')
            .select('*')
            .eq('user_id', currentUser)
    
            if(error){
                console.error(error.message);
                return;
            }
            if(data){
                setTransactions(data);
                return;
            }
        }
    
        useEffect(() => {
            fetchLastTransaction();
    
        }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* whole content */}
            <div className={`h-full transition ${showPopup ? "blur-sm" : ""}`}>

                <div className="w-full h-[calc(100%-4rem)] flex flex-row gap-10 pr-7">
                        <SideBar/>

                    <div className="w-7/8 mt-8">
                        <TransactionsList 
                            AddTransaction={() => setShowPopup(true)}
                            transactions = {transactions} />
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
                                refreshTransactions = {fetchLastTransaction}
                                closePopup = {() => setShowPopup(false)} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
