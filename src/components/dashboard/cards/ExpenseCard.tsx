import {supabase} from "../../../client"
import { useState, useEffect } from "react";

export default function ExpenseCard(){
    // last expense amount variable
    const [lastExpense, setLastExpense] = useState(0);
    const [totalEpenses, setTotalExpenses] = useState(0);
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
            fetchTotalExpenses(userId);
        }
    }, [userId, refreshTrigger]);

    useEffect(() => {
        if (userId) {
            fetchLastExpense(userId);
        }
    }, [userId, refreshTrigger]);

    // fetching total expenses from the db
    const fetchTotalExpenses = async (userId: string) => {
        const {data: fetchUserBalance, error: fetchingBalanceError} = await supabase
        .from("Balances")
        .select("expenses")
        .eq("user_id", userId)
        .maybeSingle()

        if(fetchingBalanceError){
            console.error('Error fetching expenses:', fetchingBalanceError.message);
            return;
        }
        
        if(fetchUserBalance){
            setTotalExpenses(fetchUserBalance.expenses);
        } else {
            setTotalExpenses(0);
        }
    };

    // fetching last expense from the db
    const fetchLastExpense = async (userId: string) => {
        // getting last expense transaction
        const { data: transactionData, error } = await supabase
            .from('Transactions')
            .select('amount')
            .eq('user_id', userId)
            .eq('type', 'Expense')
            .order('date', { ascending: false })
            .limit(1)

        if(error){
            console.error('Error fetching last expense:', error.message);
            return;
        }
        
        if(transactionData && transactionData.length > 0){
            const lastTransaction = transactionData[0];
            setLastExpense(lastTransaction.amount);
        } else {
            setLastExpense(0);
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
            <div className="bg-gradient-to-r from-red-50 to-rose-50 p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">Expenses</h3>
                        <p className="text-xs text-gray-600">Total spending</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        ${totalEpenses.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Total spent</p>
                </div>

                {lastExpense > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                                    <path d="M0 4l4-4v8z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-red-700">-${lastExpense.toLocaleString()}</p>
                                <p className="text-xs text-red-600">Latest expense</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}