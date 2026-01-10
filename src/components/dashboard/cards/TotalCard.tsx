import { useEffect, useState } from "react"
import { useCurrencyRates } from "../../../hooks/useCurrencyRates";

import { supabase } from "../../../client"

type Props = {
    showFundsPopup: () => void;
    showTransferPopup: () => void;
}

export default function TotalCard({showFundsPopup, showTransferPopup}: Props) {
    const [totalBalance, setTotalBalance] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);
    const { rates } = useCurrencyRates("BGN");
    const exchangeRate = rates?.EUR || 1;

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        };
        fetchData();
    }, []);


    // when user make changes, refresh data
    useEffect(() => {
        if (userId) {
            fetchTotalBalance(userId);
        }
    }, [userId, refreshTrigger]);

    // Auto-refresh
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 1000); // 1 second

        return () => clearInterval(interval);
    }, []);    
    
    // fetching total balance from the db
    const fetchTotalBalance = async (userId: string) => {
        const {data: fetchUserBalance, error: fetchingBalanceError} = await supabase
        .from("Balances")
        .select("total")
        .eq("user_id", userId)
        .maybeSingle()

        if(fetchingBalanceError){
            console.error('Error fetching total balance:', fetchingBalanceError.message);
            return;
        }
        
        if(fetchUserBalance){
            setTotalBalance(fetchUserBalance.total);
        } else {
            setTotalBalance(0);
        }
    }

    return(
        <div className="w-full bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-purple-700/5 p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Total Balance</h2>
                        <p className="text-sm text-gray-600">Your current account balance</p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Balance Display */}
                    <div className="flex items-center gap-4">
                        <div>
                            <p className="text-4xl font-bold text-purple-600">
                                €{(totalBalance * exchangeRate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Available balance</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={showTransferPopup}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Transfer
                        </button>

                        <button
                            onClick={showFundsPopup}
                            className="flex items-center gap-2 px-4 py-2 border border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50 hover:border-purple-400 hover:shadow-md transition-all duration-300 font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Funds
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}   