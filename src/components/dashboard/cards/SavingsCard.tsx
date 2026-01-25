import {supabase} from '../../../client'
import {useState, useEffect} from 'react'

import { Landmark } from 'lucide-react';

export default function SavingsCard(){
    // last savings amount variable
    const [lastSavings, setLastSavings] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const userAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
            }
        };
        userAuth();
    }, []);

    // when user make changes, refresh data
    useEffect(() => {
        if (userId) {
            fetchTotalSavings(userId);
        }
    }, [userId, refreshTrigger]);

    useEffect(() => {
        if (userId) {
            fetchLastSavings(userId);
        }
    }, [userId, refreshTrigger]);


    // fetching total savgings from the db
    const fetchTotalSavings = async (userId: string) => {
        const {data: fetchUserBalance, error: fetchingBalanceError} = await supabase
        .from("Balances")
        .select("savings")
        .eq("user_id", userId)
        .maybeSingle()

        if(fetchingBalanceError){
            console.error('Error fetching savings:', fetchingBalanceError.message);
            return;
        }
        
        if(fetchUserBalance){
            setTotalSavings(fetchUserBalance.savings || 0);
        } else {
            setTotalSavings(0);
        }
    };

    // fetching last savings from the db
    const fetchLastSavings = async (userId: string) => {
        // getting last savings transaction
        const { data: transactionData, error } = await supabase
            .from('Transactions')
            .select('amount')
            .eq('user_id', userId)
            .eq('type', 'Savings')
            .order('date', { ascending: false })
            .limit(1)

        if(error){
            console.error('Error fetching last savings transaction:', error.message);
            return;
        }
        
        if(transactionData && transactionData.length > 0){
            const lastTransaction = transactionData[0];
            setLastSavings(lastTransaction.amount);
        } else {
            setLastSavings(0);
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
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                    <Landmark/>
                </div>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Savings</span>
            </div>
            
            <div>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                    €{totalSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                {lastSavings !== 0 && (
                    <p className={`text-xs font-medium mt-1 flex items-center gap-1 ${
                        lastSavings >= 0 ? 'text-blue-600' : 'text-orange-600'
                    }`}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {lastSavings >= 0 
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                            }
                        </svg>
                        {lastSavings >= 0 ? '+' : '-'}€{Math.abs(lastSavings).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                )}
            </div>
        </div>
    )
}