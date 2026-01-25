import { useEffect, useState } from "react"
import { supabase } from "../../../client"

type Props = {
    showFundsPopup: () => void;
    showTransferPopup: () => void;
}

export default function TotalCard({showFundsPopup, showTransferPopup}: Props) {
    const [totalBalance, setTotalBalance] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);

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
        <div className="w-full text-center py-8">
            <h2 className="text-gray-100/80 text-sm font-medium uppercase tracking-wide mb-2">Total Balance</h2>
            <div className="flex flex-col items-center justify-center">
                <span className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-sm">
                    €{totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
            </div>

            {/* Floating Action Buttons */}
            <div className="flex items-center justify-center gap-6 mt-8">
                <button 
                    onClick={showTransferPopup}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-purple-600 transition-all duration-300 shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                    <span className="text-xs text-white/90 font-medium tracking-wide">Transfer</span>
                </button>

                <button 
                    onClick={showFundsPopup}
                    className="flex flex-col items-center gap-2 group"
                >
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-purple-600 transition-all duration-300 shadow-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <span className="text-xs text-white/90 font-medium tracking-wide">Add Funds</span>
                </button>
            </div>
        </div>
    )
}   