import {supabase} from "../../../client"
import { useState, useEffect } from "react";

import { CircleOff, TrendingDown } from 'lucide-react';

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
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-red-50 rounded-lg text-red-600">
                    <CircleOff/>
                </div>
                <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Expense</span>
            </div>
            
            <div>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    €{totalEpenses.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                {lastExpense > 0 && (
                    <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                        <TrendingDown className = "w-4 h-4"/>
                        €{lastExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                )}
            </div>
        </div>
    )
}