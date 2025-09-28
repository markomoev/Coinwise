import {supabase} from '../../client'
import {useState, useEffect} from 'react'


export default function SavingsCard(){

    
    // last savings amount variable
    const [lastSavings, setLastSavings] = useState(0);

    const [totalSavings, setTotalSavings] = useState(0);

        const fetchTotalSavings = async () => {
            // check for account
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
            alert('You need to be logged in to add a transaction!');
            return;
            }

            const { data: { user } } = await supabase.auth.getUser();
            const currentUser = user?.id;

            const { data, error } = await supabase
            .from("Transactions")
            .select("amount")
            .eq("type", "Savings")
            .eq("user_id", currentUser)
            .gte("created_at", new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());
            
            if (error) {
            console.error(error.message);
            return;
            }

            const totalAmount = data?.reduce((acc, row) => acc + Number(row.amount), 0)||0;
            setTotalSavings(totalAmount);
        };
    useEffect(() => {
    fetchTotalSavings();});


    const fetchLastSavings = async () => {
        // gettng user id
        const { data: { user } } = await supabase.auth.getUser()
        const currentUser = user?.id;

        // getting last savings transaction
        const { data, error } = await supabase
            .from('Transactions')
            .select('amount')
            .eq('user_id', currentUser)
            .eq('type', 'Savings')
            .order('date', { ascending: false })
            .limit(1)

        if(error){
            alert('Error in fetching the last expense transaction');
            console.error(error.message);
            return;
        }
        if(data && data.length > 0){
            const lastTransaction = data[0];
            setLastSavings(lastTransaction.amount);
        }
        
    }

    useEffect(() => {
        fetchLastSavings();
    }, []);

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