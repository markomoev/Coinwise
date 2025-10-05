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
    
    const getTypeIcon = () => {
        switch(type) {
            case 'Income':
                return (
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                    </div>
                );
            case 'Expense':
                return (
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                        </svg>
                    </div>
                );
            case 'Savings':
                return (
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                    </div>
                );
        }
    };


    
    return(
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
                {/* Left side - Icon, Name, and Amount */}
                <div className="flex items-center gap-4">
                    {getTypeIcon()}
                    
                    <div>
                        <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                ${amount.toLocaleString()}
                            </span>
                            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
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
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Transaction Date</p>
                        <p className="font-medium text-gray-700">{date || 'No date'}</p>
                    </div>
                    
                    <button 
                        onClick={() => setShowLine(!showLine)}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                    >
                        <svg 
                            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
                                showLine ? 'rotate-180' : ''
                            }`} 
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