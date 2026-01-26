import {supabase} from '../../client'

import { useState } from 'react';
import type { FormEvent } from 'react';

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


    const addTransaction = async (e: FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget as HTMLFormElement | null;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }
        e.preventDefault();
        // check for account
        const { data: { session } } = await supabase.auth.getSession();

        if(!session){alert('You need to be logged in to add a transaction!'); return;}
        else{
            // add transaction logic
            if (!date) {
                console.warn('TransactionPopup: date missing despite form validation');
                return;
            }
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
        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden max-w-lg w-full">
            {/* Header */}
            <div className="bg-[#D633E6]/5 p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#D633E6]/10 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-[#D633E6]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">Add New Transaction</h2>
                        <p className="text-sm text-gray-500 font-medium">Record your income, expense, or savings</p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <form id="transaction-form" onSubmit={(e) => addTransaction(e)} className="p-6 space-y-6">
                {/* Transaction Name */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Transaction Name
                    </label>
                    <input 
                        type="text" 
                        placeholder="e.g., Grocery shopping, Salary, etc."
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#D633E6]/10 focus:border-[#D633E6] transition-all duration-200 outline-none"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Transaction Type */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                        Transaction Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'income' 
                                ? 'border-green-300 bg-green-50/50 text-green-700 shadow-sm' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}>
                            <input 
                                id="income"
                                name="transaction-type"
                                type="radio" 
                                checked={type === 'income'}
                                onChange={(e) => setType(e.target.value)}
                                value="income"
                                className="w-4 h-4 text-green-600 focus:ring-green-500 accent-green-600"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                                <span className="font-bold">Income</span>
                            </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'expense' 
                                ? 'border-red-300 bg-red-50/50 text-red-700 shadow-sm' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}>
                            <input 
                                id="expense"
                                name="transaction-type"
                                type="radio" 
                                checked={type === 'expense'}
                                onChange={(e) => setType(e.target.value)}
                                value="expense"
                                className="w-4 h-4 text-red-600 focus:ring-red-500 accent-red-600"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                                <span className="font-bold">Expense</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Amount and Date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">
                            Amount (€)
                        </label>
                        <input 
                            type="number" 
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#D633E6]/10 focus:border-[#D633E6] transition-all duration-200 outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="transaction-date" className="block text-sm font-bold text-gray-700 mb-2">
                            Date
                        </label>
                        <input required
                            id="transaction-date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#D633E6]/10 focus:border-[#D633E6] transition-all duration-200 outline-none"
                        />
                    </div>
                </div>

                {/* Note */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                        Notes (Optional)
                    </label>
                    <textarea 
                        name="note" 
                        placeholder="Add any additional details about this transaction..."
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-[#D633E6]/10 focus:border-[#D633E6] transition-all duration-200 resize-none outline-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        form="transaction-form"
                        disabled={!name || !type || !amount || !date}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#D633E6] hover:bg-[#b02bc0] text-white rounded-xl hover:shadow-lg hover:shadow-[#D633E6]/30 hover:scale-[1.02] transition-all duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        Add Transaction
                    </button>

                    <button 
                        onClick={closePopup}
                        type="button"
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-bold"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}