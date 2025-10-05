import {supabase} from '../../../client'
import {useState, useEffect} from 'react'


export default function SavingsCard(){
    // last savings amount variable
    const [lastSavings, setLastSavings] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);

    useEffect(() => {
        const userAuth = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await Promise.all([
                    fetchTotalSavings(user.id),
                    fetchLastSavings(user.id)
                ]);
            }
        };
        userAuth();
    }, []);

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
            setTotalSavings(fetchUserBalance.savings);
        } else {
            setTotalSavings(0);
        }
    };

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

    return(
        <div className = 'flex flex-col md:w-auto w-[55%] gap-8 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl'>
            <div className = ''>
                <p className = 'text-lg'>Savings:</p>
            </div>
           
           <div className = 'flex flex-row gap-7'>
                <div className = 'h-full'>
                    <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                        {totalSavings}
                    </p>
                </div>

                <div className = 'h-full pl-7 pt-1 border border-l-black/10 border-t-transparent border-r-transparent border-b-transparent'>
                    <div>
                        <p className = 'text-lg font-semibold text-stone-700'>
                            {lastSavings>=0 ? `+${lastSavings}` : `-${lastSavings}`}
                        </p>
                    </div>
                </div>
           </div>
        </div>
    )
}