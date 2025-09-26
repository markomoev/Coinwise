import {supabase} from "../../client"
import { useState, useEffect } from "react";

export default function IncomeCard(){
    // last income amount variable
    const [lastIncome, setLastIncome] = useState(0);

    const [totalIncome, setTotalIncome] = useState(0);


        const fetchTotalIncome = async () => {
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
            .eq("type", "Income")
            .eq("user_id", currentUser)
            .gte("created_at", new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());
            
            if (error) {
            console.error(error.message);
            return;
            }

            const totalAmount = data?.reduce((acc, row) => acc + Number(row.amount), 0)||0;
            setTotalIncome(totalAmount);
        };
    useEffect(() => {
    fetchTotalIncome();});


    const fetchLastIncome = async () => {
        // gettng user id
        const { data: { user } } = await supabase.auth.getUser()
        const currentUser = user?.id;

        // getting last income transaction
        const { data, error } = await supabase
            .from('Transactions')
            .select('amount')
            .eq('user_id', currentUser)
            .eq('type', 'Income')
            .order('date', { ascending: false })
            .limit(1)

        if(error){
            alert('Error in fetching the last income transaction');
            console.error(error.message);
            return;
        }
        if(data && data.length > 0){
            const lastTransaction = data[0];
            setLastIncome(lastTransaction.amount);
        }
        
    }

    useEffect(() => {
        fetchLastIncome();
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