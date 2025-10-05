import { useEffect, useState } from "react"

import { supabase } from "../../../client"

type Props = {
    showFundsPopup: () => void;
    showTransferPopup: () => void;
}


export default function TotalCard({showFundsPopup, showTransferPopup}: Props) {
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await fetchTotalBalance(user.id);
            }
        };
        fetchData();
    }, []);

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
            setTotalBalance(0); // No balance record found
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