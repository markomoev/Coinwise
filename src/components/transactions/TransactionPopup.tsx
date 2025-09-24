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


    const addTransaction = async () => {
        // check for account
        const { data: { session } } = await supabase.auth.getSession();

        if(!session){alert('You need to be logged in to add a transaction!'); return;}
        else{
            // add transaction logic
            const { data: { user } } = await supabase.auth.getUser()
            const currentUser = user?.id;


            const { error } = await supabase
            .from('Transactions')
            .insert([{ 
                user_id: currentUser,
                name: name,
                type: type,
                amount: amount,
                date: date,
                note: note
            }])

            if(error){
                alert('Error in adding transaction!');
                console.error(error.message);
            }
            
            closePopup();
        }
    }
    
    return(
        <div className = 'bg-white border border-black/10 w-full h-auto rounded-2xl flex flex-col shadow-md pb-3'>
            <div className = 'pl-5 pt-2 w-full flex flex-row justify-between'>
                <p className = 'font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-xl'>
                    Add a Transaction
                </p>
            </div>


            <div className = 'mt-10 w-full flex flex-row gap-10 justify-between pl-5 pr-5'>
                
                <div>
                    <input 
                        type="text" 
                        placeholder = 'Name' 
                        className="bg-gray-600/15 text-black/70 pl-2 rounded-md"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                </div>
            
                <div className = 'flex flex-row'>
                {/* Different types of transaction */}
                    <p className = ''>Type of Transaction:</p>
                    
                    {/* Income transaction */}
                    <input 
                        id = 'income'
                        name='transaction-type'
                        type="radio" 
                        placeholder = 'Name'
                        checked={type === 'income'}
                        onChange={(e) => setType(e.target.value)}
                        value ='income'
                        className = 'ml-3 cursor-pointer'
                        />

                    <label 
                            htmlFor="income"
                            className= 'text-green-700 ml-1 font-semibold' >
                        Income
                    </label>

                    {/* Expense transaction */}
                    <input 
                        id = 'expense'
                        type="radio" 
                        name='transaction-type'
                        placeholder = 'Name'
                        value ='expense'
                        checked={type === 'expense'}
                        onChange={(e) => setType(e.target.value)}
                        className="ml-3 cursor-pointer"
                        />

                    <label 
                            htmlFor="expense"
                            className= 'text-red-700 ml-1 font-semibold' >
                        Expense
                    </label>
                </div>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <input 
                    type="number" 
                    placeholder = 'Amount'
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
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
                    placeholder='Add a note...'
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className = 'w-full bg-gray-600/15 pl-2 rounded-md pt-1'>
                </textarea>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <button
                    onClick={addTransaction} 
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