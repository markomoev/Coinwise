import {supabase} from '../../client'

import { useState } from "react";

type Popup = {
    closeTransferPopup: () => void;
}

export default function TransferPopup({closeTransferPopup}: Popup) {
        // storing all the clinets info from the funds popup
        const [name, setName] = useState('');
        const [type, setType] = useState('');
        const [amount, setAmount] = useState('' as number | string);
        const [date, setDate] = useState('');
        const [note, setNote] = useState('');
    
        // better formatted type of the transfer type
        const typeToSave = type
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

    
        const transferMon = async (e?: any) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement | null;
            if (form && !form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // check for account first
            const { data: { session } } = await supabase.auth.getSession();
            if(!session){alert('You need to be logged in to transfer money!'); return;}
            else{
                // transfer money logic
                const { data: { user } } = await supabase.auth.getUser()
                const currentUser = user?.id;

                const {error: insertingTransferError} = await supabase
                .from('Transactions')
                .insert([{ 
                    user_id: currentUser,
                    name: name,
                    type: typeToSave,
                    amount: amount,
                    date: date,
                    note: note 
                }])

                if(insertingTransferError){
                    alert("Error in inserting the transfer data!")
                    console.error(insertingTransferError.message)
                    return;
                }

            // updates the balances table
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
                case "Savings Deposit":
                    newSavings += Number(amount);
                break;

                // Support both correct and legacy spellings
                case "Savings Withdrawal":
                case "Savings Withdrawl":
                    newSavings -= Number(amount);
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
                
            }
            closeTransferPopup();
        }

    return(
        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-2xl rounded-2xl w-full">
            {/* Header */}
            <div className="bg-[#D633E6]/5 p-4 sm:p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D633E6]/10 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 sm:w-5 sm:h-5 text-[#D633E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Transfer Money</h2>
                        <p className="text-xs sm:text-sm text-gray-600">Manage your savings account transactions</p>
                    </div>
                </div>
            </div>

            {/* Form Content */}
            <form onSubmit = {(e) => transferMon(e)} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Transaction Name */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                        Transaction Name
                    </label>
                    <input 
                        type="text" 
                        placeholder="e.g., Savings transfer, Emergency fund, etc."
                        className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D633E6]/20 focus:border-[#D633E6] transition-all duration-200"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Savings Operation */}
                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3">
                        Savings Operation
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'savings Deposit' 
                                ? 'border-green-300 bg-green-50 text-green-700' 
                                : 'border-gray-300 hover:border-gray-400'
                        }`}>
                            <input 
                                id="deposit"
                                name="savings-operations"
                                type="radio" 
                                checked={type === 'savings Deposit'}
                                onChange={(e) => setType(e.target.value)}
                                value="savings Deposit"
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                                <span className="text-sm font-medium">Deposit</span>
                            </div>
                        </label>

                        <label className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            type === 'savings Withdrawal' 
                                ? 'border-red-300 bg-red-50 text-red-700' 
                                : 'border-gray-300 hover:border-gray-400'
                        }`}>
                            <input 
                                id="withdrawal"
                                name="savings-operations"
                                type="radio" 
                                checked={type === 'savings Withdrawal'}
                                onChange={(e) => setType(e.target.value)}
                                value="savings Withdrawal"
                                className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                                <span className="text-sm font-medium">Withdrawal</span>
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
                            className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D633E6]/20 focus:border-[#D633E6] transition-all duration-200"
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
                            className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D633E6]/20 focus:border-[#D633E6] transition-all duration-200"
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
                        placeholder="Add any additional details about this transfer..."
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full p-3 sm:p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D633E6]/20 focus:border-[#D633E6] transition-all duration-200 resize-none"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                    <button
                        onClick={transferMon}
                        disabled={!name || !type || !amount || !date}
                        className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-[#D633E6] hover:bg-[#b02bc0] text-white rounded-xl hover:shadow-lg hover:shadow-[#D633E6]/30 hover:scale-[1.02] transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Transfer Money
                    </button>

                    <button 
                        onClick={closeTransferPopup}
                        className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-sm sm:text-base"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}