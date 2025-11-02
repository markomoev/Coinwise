import { useState, useEffect } from "react";

import {supabase} from "../../../../client";


type Props = {
    showDeleteAlert: boolean;
    onCancel: () => void;
    transactionId: number;
}

export default function DeleteAlert({ showDeleteAlert, onCancel, transactionId }: Props){
        // the whole data of the transaction to be deleted
        const [data, setData] = useState({
            id: 0,
            userId: "",
            name: "",
            amount: 0,
            type: "",
            date: "",
            note: ""
        })
    
        const [balance, setBalance] = useState({
            id: 0,
            userId: "",
            total: 0,
            income: 0,
            expenses: 0,
            savings: 0
        });
    
        // get data from the db
        useEffect(() => {
            const fetchData = async() => {
                // fetch the user first
                const {data: {user}} = await supabase.auth.getUser();
                const userId:any = user?.id; 
    
                if(!userId) {
                    console.error("No user logged in");
                    return;
                };
                
                // then fetch the transaction data
                const {data: fetchTransaction,error: fetchTransactionError} = await supabase
                .from("Transactions")
                .select('*')
                .eq('id', transactionId)
                .eq('user_id', userId)
                .single();
    
    
                if (fetchTransactionError) {
                    console.error("Error fetching transaction:", fetchTransactionError);
                    return;
                }
    
                // set the data to be edited
                setData({
                    id: transactionId,
                    userId: userId,
                    name: fetchTransaction.name,
                    amount: fetchTransaction.amount,
                    type: fetchTransaction.type,
                    date: fetchTransaction.date,
                    note: fetchTransaction.note
                });
    
                // fetch balance data
                const {data: fetchBalance, error: fetchBalanceError} = await supabase
                .from("Balances")
                .select('*')
                .eq('user_id', userId)
                .single();
    
                if(fetchBalanceError){
                    console.error("Error fetching balance:", fetchBalanceError);
                    return;
                }
    
                setBalance({
                    id: fetchBalance.id,
                    userId: fetchBalance.user_id,
                    total: fetchBalance.total,
                    income: fetchBalance.income,
                    expenses: fetchBalance.expenses,
                    savings: fetchBalance.savings
                });
            }
            fetchData();
        }, [])

    
    const handleDelete = async() => {
        const {error} = await supabase 
        .from("Transactions")
        .delete()
        .eq('id', transactionId)
        .eq('user_id', data.userId)

        if(error){
            console.error("Error deleting transaction:", error);
            return;
        }

        // Update balance after deletion
        let newTotal = balance.total;
        let newIncome = balance.income;
        let newExpenses = balance.expenses;
        let newSavings = balance.savings;

        // update the balance values based on transaction type
        switch(data.type){
            case "Income": 
                newTotal -= data.amount
                newIncome -= data.amount
                break;
            case "Expense":
                newTotal += data.amount
                newExpenses -= data.amount
                break;
            case "Savings":
                newTotal += data.amount
                newSavings -= data.amount
                break;
        }

        // update the balance in the database
        const {error: balanceError} = await supabase
        .from("Balances")
        .update({
            total: newTotal,
            income: newIncome,
            expenses: newExpenses,
            savings: newSavings
        })
        .eq('id', balance.id)
        .eq('user_id', data.userId)

        if(balanceError){   
            console.error("Error updating balance:", balanceError);
            return;
        }

        onCancel();
    } 
    
    return (
        <div className={`${showDeleteAlert ? 'block' : 'hidden'} fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]`}>
            <div className="bg-white/95 border border-red-200 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden max-w-md w-full mx-4">
                {/* Header */}
                <div className="bg-red-50/80 p-6 border-b border-red-200">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-xl font-bold text-red-800">Attention!</h2>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div className="space-y-3">
                        <p className="text-gray-700 text-base leading-relaxed">
                            If you delete this transaction, it will be removed from your history and cannot be undone.
                        </p>
                        <p className="text-gray-800 font-medium text-base">
                            Are you sure you want to proceed?
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button 
                            onClick={onCancel}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium">
                            Cancel
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}