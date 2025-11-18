import {supabase} from '../../../client'
import {useState, useEffect} from 'react'


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
        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div>
                        <h3 className="font-semibold text-blue-700">Savings</h3>
                        <p className="text-xs text-gray-600">Money saved</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        ${totalSavings.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Total saved</p>
                </div>

                {lastSavings !== 0 && (
                    <div className={`${lastSavings >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} border rounded-lg p-3`}>
                        <div className="flex items-center gap-2">
                            <div>
                                <p className={`text-sm font-semibold ${
                                    lastSavings >= 0 ? 'text-blue-700' : 'text-orange-700'
                                }`}>
                                    {lastSavings >= 0 ? `+$${lastSavings.toLocaleString()}` : `-$${Math.abs(lastSavings).toLocaleString()}`}
                                </p>
                                <p className={`text-xs ${
                                    lastSavings >= 0 ? 'text-blue-600' : 'text-orange-600'
                                }`}>
                                    Latest {lastSavings >= 0 ? 'deposit' : 'withdrawal'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}