import {supabase} from '../../client'

import { useState } from 'react';

type Props = {
    closePopup: () => void;
}

export default function TransactionPopup({closePopup}: Props) {
    // storing all the clinets info from the popups
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('' as number | string);
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    const typeToSave = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();


    const addTransaction = async () => {
        // check for account
        const { data: { session } } = await supabase.auth.getSession();

        if(!session){alert('You need to be logged in to add a transaction!'); return;}
        else{
            // add transaction logic
            const { data: { user } } = await supabase.auth.getUser()
            const currentUser = user?.id;

            const { error:TransactionListError } = await supabase
            .from('Transactions')
            .insert([{ 
                user_id: currentUser,
                name: name,
                type: typeToSave,
                amount: amount,
                date: date,
                note: note
            }])

            if(TransactionListError){
                alert('Error in adding transaction!');
                console.error(TransactionListError.message);
            }
            // Auto-refresh will handle updating the transaction list

            const { data: balancesData } = await supabase
            .from('Balances')
            .select('*')
            .eq('user_id', currentUser)
            .maybeSingle()

            const total = balancesData?.total || 0;
            const income = balancesData?.income || 0;
            const expenses = balancesData?.expenses || 0;


            let newTotal = total;
            let newIncome = income;
            let newExpenses = expenses;


            switch(typeToSave){
                case "Income":
                    newTotal += Number(amount);
                    newIncome += Number(amount);
                break;

                case "Expense":
                    newTotal -= Number(amount);
                    newExpenses += Number(amount);
                break;
            }

                const {error: updatingBalanceError} = await supabase
                .from('Balances')
                .upsert({
                    user_id: currentUser,
                    total: newTotal,
                    income: newIncome,
                    expenses: newExpenses,
                }as any, { onConflict: ['user_id'] } as any); 

                    if(updatingBalanceError){
                        alert("Error in updating the balances!")
                        console.error(updatingBalanceError.message)
                        return;
                    }
            
            closePopup();
        }
    }
    
    return(
        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden max-w-lg w-full mx-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Add New Transaction</h2>
                        <p className="text-sm text-gray-600">Record your income, expense, or savings</p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-6 space-y-6">
                {/* Transaction Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Name
                    </label>
                    <input 
                        type="text" 
                        placeholder="e.g., Grocery shopping, Salary, etc."
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Transaction Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Transaction Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'income' 
                                ? 'border-green-300 bg-green-50 text-green-700' 
                                : 'border-gray-300 hover:border-gray-400'
                        }`}>
                            <input 
                                id="income"
                                name="transaction-type"
                                type="radio" 
                                checked={type === 'income'}
                                onChange={(e) => setType(e.target.value)}
                                value="income"
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                                <span className="font-medium">Income</span>
                            </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'expense' 
                                ? 'border-red-300 bg-red-50 text-red-700' 
                                : 'border-gray-300 hover:border-gray-400'
                        }`}>
                            <input 
                                id="expense"
                                name="transaction-type"
                                type="radio" 
                                checked={type === 'expense'}
                                onChange={(e) => setType(e.target.value)}
                                value="expense"
                                className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                                <span className="font-medium">Expense</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Amount and Date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Amount ($)
                        </label>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date
                        </label>
                        <input 
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Note */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes (Optional)
                    </label>
                    <textarea 
                        name="note" 
                        placeholder="Add any additional details about this transaction..."
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-500 transition-all duration-200 resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={addTransaction}
                        disabled={!name || !type || !amount}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Add Transaction
                    </button>

                    <button 
                        onClick={closePopup}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}