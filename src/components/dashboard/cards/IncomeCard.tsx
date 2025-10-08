import {supabase} from "../../../client"
import { useState, useEffect } from "react";

export default function IncomeCard(){
    // last income amount variable
    const [lastIncome, setLastIncome] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
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

    // when user make changes
    useEffect(() => {
        if (userId) {
            fetchTotalIncome(userId);
        }
    }, [userId, refreshTrigger]);

    useEffect(() => {
        if (userId) {
            fetchLastIncome(userId);
        }
    }, [userId, refreshTrigger]);


    // fetching total income from the db
    const fetchTotalIncome = async (userId: string) => {
        const {data: fetchUserBalance, error: fetchingBalanceError} = await supabase
        .from("Balances")
        .select("income")
        .eq("user_id", userId)
        .maybeSingle()

        if(fetchingBalanceError){
            console.error('Error fetching income:', fetchingBalanceError.message);
            return;
        }
        
        if(fetchUserBalance){
            setTotalIncome(fetchUserBalance.income);
        } else {
            setTotalIncome(0); 
        }
    };

    // fetching last income from the db
    const fetchLastIncome = async (userId: string) => {
        // getting last income transaction
        const { data: transactionData, error } = await supabase
            .from('Transactions')
            .select('amount')
            .eq('user_id', userId)
            .eq('type', 'Income')
            .order('date', { ascending: false })
            .limit(1)

        if(error){
            console.error('Error fetching last income:', error.message);
            return;
        }
        
        if(transactionData && transactionData.length > 0){
            const lastTransaction = transactionData[0];
            setLastIncome(lastTransaction.amount);
        } else {
            setLastIncome(0);
        }
    }

    // Auto-refresh
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 1000); // 1 second

        return () => clearInterval(interval);
    }, []);

    return(
        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div>
                        <h3 className="font-semibold text-green-700">Income</h3>
                        <p className="text-xs text-gray-600">Total earnings</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        ${totalIncome.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Total accumulated</p>
                </div>

                {lastIncome > 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                            <div>
                                <p className="text-sm font-semibold text-green-700">+${lastIncome.toLocaleString()}</p>
                                <p className="text-xs text-green-600">Latest income</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}