import { useState } from "react";

import TransactionPopup from './TransactionPopup'

export default function TransactionsList() {
    const [showPopup, setShowPopup] = useState(false);

    
    const AddTransaction = () => {
        setShowPopup(true);
    }
    
    
    return(
        <div className = 'bg-white shadow-lg border border-black/10 rounded-2xl flex flex-col gap-10'>
            <div>
                <div className = 'flex flex-row justify-between mt-5 pl-[1%] pr-[1%] pb-3'>
                    <p className = 'text-xl font-bold'>
                        Transactions History
                    </p>

                    <button
                        onClick={AddTransaction} 
                        className = 'font-semibold border border-black/10 rounded-2xl hover:shadow-lg cursor-pointer pr-3 pl-3 pt-1 pb-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                        Add new
                    </button>
                </div>
                
                
                <div className = 'mb-10 mt-5 pl-[1%] pr-[1%] pb-3 pt-3 w-full flex flex-col border border-black/10 border-l-0 border-r-0'>
                    <div className = 'flex flex-row justify-between'>
                        <p className = 'font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                            Shopify payment
                        </p>

                        <button className = 'text-lg font-bold flex items-center justify-center border-black/10 border hover:shadow-lg rounded-xl pb-1.5 pr-2 pl-2 pt-0 mb-2 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                            ...
                        </button>
                    </div>

                    <div className = 'flex flex-row justify-between'>
                        <div className = 'flex flex-row gap-5'>
                            <p className = ''>+350$</p>

                            <p className = 'text-green-600 font-semibold'>Income</p>
                        </div>

                        <div className = 'flex flex-col w-auto items-end'>
                            <p>10/02/2025</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className = {`z-100 ${showPopup ? "flex" : "hidden"} inset-0 fixed w-full h-full items-center justify-center`}>
                <TransactionPopup/>
            </div>
        </div>
    );
}