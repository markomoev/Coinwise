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
        <div className="w-[95%] mt-10 flex flex-col gap-3 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl">
            <div>
                <p className = 'text-lg'>Total balance:</p>
            </div>

        <div className = 'w-full flex flex-row justify-between'>
            <div> 
                <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                    {totalBalance}
                </p>
            </div>

            <div className ='flex flex-row gap-4'>
                <button
                    onClick = {showTransferPopup}
                    className="font-semibold border border-black/10 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Transfer
                </button> 

                <button
                    onClick = {showFundsPopup}
                    className="font-semibold border border-black/10 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Add funds
                </button>
            </div>
        </div>
        </div>
    )

}   