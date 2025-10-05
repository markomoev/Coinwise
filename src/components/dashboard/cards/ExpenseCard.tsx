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

    // useEffect to fetch total expenses when userId changes or refresh is triggered
    useEffect(() => {
        if (userId) {
            fetchTotalExpenses(userId);
        }
    }, [userId, refreshTrigger]);

    // useEffect to fetch last expense when userId changes or refresh is triggered
    useEffect(() => {
        if (userId) {
            fetchLastExpense(userId);
        }
    }, [userId, refreshTrigger]);

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

    // You can trigger refresh by updating this value from parent component
    // Or set up a timer to refresh periodically
    useEffect(() => {
        // Optional: Auto-refresh every 30 seconds
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 30000); // 30 seconds

        return () => clearInterval(interval);
    }, []);

    return(
        <div className = 'flex flex-col gap-8 md:w-auto w-[55%] bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl'>
            <div className = ''>
                <p className = 'text-lg'>Expenses:</p>
            </div>
           
           <div className = 'flex flex-row gap-7'> {/* Container for the sum and the last transaction */}
                <div className = 'h-full'>
                    <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                        {totalEpenses}
                    </p>
                </div>

                <div className = 'h-full pl-7 pt-1 border border-l-black/10 border-t-transparent border-r-transparent border-b-transparent'>
                    <div>
                        <p className = 'text-lg font-semibold text-red-700'>-{lastExpense}</p>
                    </div>
                </div>
           </div>
        </div>
    )
}