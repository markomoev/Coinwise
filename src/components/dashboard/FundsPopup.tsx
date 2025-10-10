import {supabase} from '../../client'

import { useState } from 'react';

type Props = {
    closePopup: () => void;
}

export default function FundsPopup({closePopup}: Props) {

    // storing all the clinets info from the funds popup
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('' as number | string);
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    // better formatted type of the transaction
    const typeToSave = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();


    const addFunds = async () => {
        // check for account
        const { data: { session } } = await supabase.auth.getSession();

        if(!session){alert('You need to be logged in to add a transaction!'); return;}
        else{
            // add transaction logic
            const { data: { user } } = await supabase.auth.getUser()
            const currentUser = user?.id;

            const { error: transactionError } = await supabase
            .from('Transactions')
            .insert([{ 
                user_id: currentUser,
                name: name,
                type: typeToSave,
                amount: amount,
                date: date,
                note: note
            }])

            if(transactionError){
                alert('Error in adding transaction!');
                console.error(transactionError.message);
                return;
            }

            const { data: balancesData } = await supabase
            .from('Balances')
            .select('*')
            .eq('user_id', currentUser)
            .maybeSingle()

            const total = balancesData?.total || 0;
            const income = balancesData?.income || 0;
            const expenses = balancesData?.expenses || 0;
            const savings = balancesData?.savings || 0;


            let newTotal = total;
            let newIncome = income;
            let newExpenses = expenses;
            let newSavings = savings;


            switch(typeToSave){
                case "Income":
                    newTotal += Number(amount);
                    newIncome += Number(amount);
                break;

                case "Expense":
                    newTotal -= Number(amount);
                    newExpenses += Number(amount);
                break;

                case "Savings":
                    newTotal += Number(amount);
                    newSavings += Number(amount);
                break;

                case "Total": 
                    newTotal += Number(amount);
                break;

            }

                const {error: updatingBalanceError} = await supabase
                .from('Balances')
                .upsert({
                    user_id: currentUser,
                    total: newTotal,
                    income: newIncome,
                    expenses: newExpenses,
                    savings: newSavings
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
        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-2xl rounded-2xl w-full mx-2 sm:mx-4">
            {/* Header */}
            <div className="bg-purple-700/5 p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Add Funds</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Add money to your account balance</p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Transaction Name */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Transaction Name
                    </label>
                    <input 
                        type="text" 
                        placeholder="e.g., Initial deposit, Gift money, etc."
                        className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-600 transition-all duration-200"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Fund Type */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
                        Type of Funds
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'total' 
                                ? 'border-purple-300 bg-purple-50 text-purple-700' 
                                : 'border-gray-300 hover:border-gray-400'
                        }`}>
                            <input 
                                id="total"
                                name="funds-type"
                                type="radio" 
                                checked={type === 'total'}
                                onChange={(e) => setType(e.target.value)}
                                value="total"
                                className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="text-sm font-medium">Total Balance</span>
                            </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'savings' 
                                ? 'border-green-300 bg-green-50 text-green-700' 
                                : 'border-gray-300 hover:border-gray-400'
                        }`}>
                            <input 
                                id="savings"
                                name="funds-type"
                                type="radio" 
                                checked={type === 'savings'}
                                onChange={(e) => setType(e.target.value)}
                                value="savings"
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="text-sm font-medium">Savings</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Amount and Date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                            Amount ($)
                        </label>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-600 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                            Date
                        </label>
                        <input 
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-600 transition-all duration-200"
                        />
                    </div>
                </div>

                {/* Note */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Notes (Optional)
                    </label>
                    <textarea 
                        name="note" 
                        placeholder="Add any additional details about this transaction..."
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-600 transition-all duration-200 resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <button
                        onClick={addFunds}
                        disabled={!name || !type || !amount}
                        className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Add Funds
                    </button>

                    <button 
                        onClick={closePopup}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-sm sm:text-base"
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