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
        <div className = 'bg-white border border-black/10 w-full h-auto rounded-2xl flex flex-col shadow-md pb-3'>
            <div className = 'pl-5 pt-2 w-full flex flex-row justify-between'>
                <p className = 'font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-xl'>
                    Add Funds
                </p>
            </div>

            <div className = 'mt-10 w-full flex flex-row gap-10 justify-between pl-5 pr-5'>
                
                <div>
                    <input required
                        type="text" 
                        placeholder = 'Name' 
                        value={name}
                        onChange = {(e) => setName(e.target.value)}
                        className="bg-gray-600/15 text-black/70 pl-2 rounded-md"
                        />
                </div>
            
                <div className = 'flex flex-row'>
                {/* Different types of funds */}
                    <p className = ''>Type of Funds:</p>
                    
                    {/* Total balance funds */}
                    <input required
                        id = 'total'
                        name='funds-type'
                        type="radio" 
                        placeholder = 'Name'
                        checked={type === 'total'}
                        onChange={(e) => setType(e.target.value)}
                        value ='total'
                        className = 'ml-3 cursor-pointer'
                        />

                    <label 
                            htmlFor="total"
                            className= 'ml-1 font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent' >
                        Total Balance
                    </label>

                    {/* Savings transaction */}
                    <input required
                        id = 'savings'
                        type="radio" 
                        name='funds-type'
                        placeholder = 'Name'
                        checked={type === 'savings'}
                        onChange={(e) => setType(e.target.value)}
                        value ='savings'
                        className="ml-3 cursor-pointer"
                        />

                    <label 
                            htmlFor="savings"
                            className= 'ml-1 font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent' >
                        Savings
                    </label>
                </div>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <input required
                    type="number" 
                    placeholder = 'Amount'
                    value = {amount}
                    onChange = {(e) => setAmount(Number(e.target.value))}
                    className="bg-gray-600/15 text-black/70 pl-2 rounded-md" />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-600/15 text-black/70 pl-2 rounded-md"/>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <textarea 
                    name="note" 
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder='Add a note...'
                    className = 'w-full bg-gray-600/15 pl-2 rounded-md pt-1'>
                </textarea>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <button
                    onClick={addFunds}
                    className = 'text-lg font-bold flex items-center justify-center border-black/10 border hover:shadow-lg rounded-xl pb-1 pr-3 pl-3 pt-1 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                    Add
                </button>

                <button 
                    onClick={closePopup}
                    className = 'text-lg font-bold flex items-center justify-center border-black/10 border hover:shadow-lg rounded-xl pb-1 pr-3 pl-3 pt-1 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                    Close
                </button>
            </div>
        </div>
    )
}