import TransactionExtendedLine from './TransactionExtendedLine';
 
import { useState } from 'react';

type TransactionLineProps = {
  name: string;
  amount: number;
  type: string;
  date?: string | null;
  note?: string;
  created_at?: string;
};


export default function TransactionLine({name, amount, type, date, note, created_at}: TransactionLineProps) {
    const [showLine, setShowLine] = useState(false);
    
    return(
            <div className = 'mb-10 mt-5 pl-[1%] pr-[1%] pb-3 pt-3 w-full flex flex-col border border-black/10 border-l-0 border-r-0'>
               <div className = 'flex flex-row justify-between'>
                    <p className = 'font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                        {name}
                    </p>

                    <button 
                        onClick={() => setShowLine(!showLine)}
                        className = 'text-lg font-bold flex items-center justify-center border-black/10 border hover:shadow-lg rounded-xl pb-1.5 pr-2 pl-2 pt-0 mb-2 cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                        ...
                    </button>
                </div>

                <div className = 'flex flex-row justify-between'>
                    <div className = 'flex flex-row gap-5'>
                        <p className = ''>{amount}</p>
                        <p className = {type === 'expense' ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'}>{type}</p>
                    </div>

                    <div className = 'flex flex-col w-auto items-end'>
                        <p>{date}</p>
                    </div>
                </div>

                
                {showLine &&(
                    <TransactionExtendedLine
                        note={note}
                        created_at={created_at}
                        closeLine={() => setShowLine(false)}/>
                )}
            </div>
    )
}