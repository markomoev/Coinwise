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

    
        const transferMon = async () => {
            // transfer money logic

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
                
            }
            closeTransferPopup();
        }

    return(
        <div className = 'bg-white border border-black/10 w-full h-auto rounded-2xl flex flex-col shadow-md pb-3'>
            <div className = 'pl-5 pt-2 w-full flex flex-row justify-between'>
                <p className = 'font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-xl'>
                    Transfer Money
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
                {/* different type of operations for the savings account */}
                    <p className = ''>Savings operation:</p>
                    
                    {/* withdrawl from savings */}
                    <input required
                        id = 'withdrawl'
                        name='savings-operations'
                        type="radio" 
                        placeholder = 'Name'
                        value ='savings Withdrawl'
                        checked={type === 'savings Withdrawl'}
                        onChange={(e) => setType(e.target.value)}
                        className = 'ml-3 cursor-pointer'
                        />

                    <label 
                            htmlFor="withdrawl"
                            className= 'ml-1 font-semibold text-red-600' >
                        Withdrawl
                    </label>

                    {/* deposit into savings*/}
                    <input required
                        id = 'deposit'
                        type="radio" 
                        name='savings-operations'
                        placeholder = 'Name'
                        value ='savings Deposit'
                        checked={type === 'savings Deposit'}
                        onChange={(e) => setType(e.target.value)}
                        className="ml-3 cursor-pointer"
                        />

                    <label 
                            htmlFor="deposit"
                            className= 'ml-1 font-semibold text-green-600' >
                        Deposit
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
                    onClick = {transferMon}
                    className = 'text-lg font-bold flex items-center justify-center border-black/10 border hover:shadow-lg rounded-xl pb-1 pr-3 pl-3 pt-1 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                    Add
                </button>

                <button 
                    onClick = {closeTransferPopup}
                    className = 'text-lg font-bold flex items-center justify-center border-black/10 border hover:shadow-lg rounded-xl pb-1 pr-3 pl-3 pt-1 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                    Close
                </button>
            </div>
        </div>
    )
}