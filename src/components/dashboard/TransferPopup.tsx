type Popup = {
    closeTransferPopup: () => void;
}

export default function TransferPopup({closeTransferPopup}: Popup) {
    const transferMon = async () => {
        // transfer money logic
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
                        className="bg-gray-600/15 text-black/70 pl-2 rounded-md"
                        />
                </div>
            
                <div className = 'flex flex-row'>
                {/* Different types of funds */}
                    <p className = ''>Transfer to:</p>
                    
                    {/* Total balance funds */}
                    <input required
                        id = 'total'
                        name='funds-type'
                        type="radio" 
                        placeholder = 'Name'
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
                        value ='savings'
                        className="ml-3 cursor-pointer"
                        />

                    <label 
                            htmlFor="saivings"
                            className= 'ml-1 font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent' >
                        Savings
                    </label>
                </div>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <input required
                    type="number" 
                    placeholder = 'Amount'
                    className="bg-gray-600/15 text-black/70 pl-2 rounded-md" />

                <input
                    type="date"
                    className="bg-gray-600/15 text-black/70 pl-2 rounded-md"/>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <textarea 
                    name="note" 
                    id="note"
                    placeholder='Add a note...'
                    className = 'w-full bg-gray-600/15 pl-2 rounded-md pt-1'>
                </textarea>
            </div>

            <div className = 'mt-10 w-full flex flex-row justify-between pl-5 pr-5'>
                <button
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