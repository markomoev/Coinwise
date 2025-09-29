import { useEffect, useState } from "react"

import { supabase } from "../../../client"

type Props = {
    showFundsPopup: () => void;
    showTransferPopup: () => void;
}

type Balance = {
    totalBalance: number;
    savingsBalance: number;
}
type Transactions = {
    type: "Income" | "Expense" | "Savings" | "Withdrawl";
    amount: number | string;
}


export default function TotalCard({showFundsPopup, showTransferPopup}: Props) {
        const [totalBalance, setTotalBalance] = useState(0);

        const fetchTotalBalance = async () => {
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
            .eq("type", "Total")
            .eq("user_id", currentUser)
            .gte("created_at", new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString());
            
            if (error) {
            console.error(error.message);
            return;
            }
            const initialTotal = data?.reduce((acc, row) => acc + Number(row.amount), 0)||0;

            // get the income and the expenses amounts and calculate the balance
            const {data: transactionData, error: transactionError} = await supabase
            .from("Transactions")
            .select("type, amount")

            if(transactionError){
                alert('Error in calculating the balance')
                console.error(transactionError.message);
                return;
            }
            const transactions = transactionData as Transactions[] | null;
            if(transactions){

                const {totalBalance, savingsBalance} = transactions.reduce<Balance>(
                    (acc, t) => {
                        const amount = Number(t.amount) || 0;
                        const type = t.type;

                        switch(type){
                            case "Income":
                                acc.totalBalance += amount;
                                break;

                            case "Expense":
                                acc.totalBalance -= amount;
                                break;

                            case "Savings":
                                acc.savingsBalance += amount;
                                //acc.totalBalance -= amount;
                                break;
                            
                            case "Withdrawl":
                                acc.savingsBalance -= amount;
                                acc.totalBalance += amount;
                                break;
                        }
                        return acc;
                    }, {totalBalance: 0, savingsBalance: 0}
                )
                setTotalBalance(initialTotal + totalBalance);
            }
        };
    useEffect(() => {
    fetchTotalBalance();});

    return(
        <div className="w-[95%] mt-10 flex flex-col gap-3 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl">
            <div>
                <p className = 'text-lg'>Total balance:</p>
            </div>

        <div className = 'w-full flex flex-row justify-between'>
            <div> 
                <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                    {totalBalance}
                </p>
            </div>

            <div className ='flex flex-row gap-4'>
                <button
                    onClick = {showTransferPopup}
                    className="font-semibold border border-black/10 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Transfer
                </button> 

                <button
                    onClick = {showFundsPopup}
                    className="font-semibold border border-black/10 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Add funds
                </button>
            </div>
        </div>
        </div>
    )

}