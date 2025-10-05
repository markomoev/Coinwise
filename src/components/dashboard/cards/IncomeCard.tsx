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
        <div className = 'flex flex-col md:w-auto w-[55%] gap-8 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl'>
            <div className = ''>
                <p className = 'text-lg'>Income:</p>
            </div>
           
           <div className = 'flex flex-row gap-7'> {/* Container for the sum and the last transaction */}
                <div className = 'h-full'>
                    <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                        {totalIncome}
                    </p>
                </div>

                <div className = 'h-full pl-7 pt-1 border border-l-black/10 border-t-transparent border-r-transparent border-b-transparent'>
                    <div>
                        <p className = 'text-lg font-semibold text-green-700'>+{lastIncome}</p>
                    </div>
                </div>
           </div>
        </div>
    )
}