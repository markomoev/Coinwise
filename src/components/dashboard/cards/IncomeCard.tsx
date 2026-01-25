import {supabase} from "../../../client"
import { useState, useEffect } from "react";

import { Plus, TrendingUp } from 'lucide-react';

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
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-50 rounded-lg text-green-600">
                    <Plus/>
                </div>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Income</span>
            </div>
            
            <div>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    €{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                {lastIncome > 0 && (
                    <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                        <TrendingUp className = "w-4 h-4"/>
                        €{lastIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                )}
            </div>
        </div>
    )
}