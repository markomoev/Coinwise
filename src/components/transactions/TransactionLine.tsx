import TransactionExtendedLine from './extended-line/TransactionExtendedLine';
 
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
        <div className="bg-white border border-gray-200 rounded-xl p-3 md:p-4 hover:shadow-md transition-all duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Left side - Name and Amount */}
                <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
                    <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-800 text-base md:text-lg truncate">{name}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                            <span className="text-lg md:text-xl font-bold text-purple-600">
                                ${amount.toLocaleString()}
                            </span>
                            <span className={`text-xs md:text-sm font-medium px-2 py-1 rounded-full w-fit ${
                                type === 'Income' ? 'bg-green-100 text-green-700' :
                                type === 'Expense' ? 'bg-red-100 text-red-700' :
                                type === 'Savings' ? 'bg-blue-100 text-blue-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                                {type}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right side - Date and Expand Button */}
                <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-4">
                    <div className="text-left sm:text-right">
                        <p className="text-xs md:text-sm text-gray-500">Transaction Date</p>
                        <p className="font-medium text-gray-700 text-sm md:text-base">{date || 'No date'}</p>
                    </div>
                    
                    <button 
                        onClick={() => setShowLine(!showLine)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex-shrink-0"
                    >
                        <svg 
                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showLine ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Expandable Details */}
            {showLine && (
                <TransactionExtendedLine
                    note={note}
                    created_at={created_at}
                    closeLine={() => setShowLine(false)}
                />
            )}
        </div>
    )
}