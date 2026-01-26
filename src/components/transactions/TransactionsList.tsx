import TransactionLine from "./TransactionLine";

type Transaction= {
  id: number;
  name: string;
  amount: number;
  type: string;
  date: string | null;
  note?: string;
  created_at: string;
};

type Props = {
    AddTransaction: () => void;
    transactions: Transaction[];
}

export default function TransactionsList({AddTransaction, transactions}: Props) {
    return(
        <div className="w-full h-full bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-[#D633E6]/5 p-4 md:p-6 border-b border-gray-100 flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#D633E6]/10 rounded-xl">
                            <svg className="w-6 h-6 text-[#D633E6]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                        </div>
                        <div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-800">All Transactions</h2>
                            <p className="text-xs md:text-sm text-gray-500 font-medium">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found</p>
                        </div>
                    </div>

                    <button
                        onClick={AddTransaction}
                        className="flex items-center justify-center gap-2 px-3 py-2 md:px-5 bg-[#D633E6] hover:bg-[#b02bc0] text-white rounded-xl hover:shadow-lg hover:shadow-[#D633E6]/30 hover:scale-[1.02] transition-all duration-300 font-semibold text-sm md:text-base w-full sm:w-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New
                    </button>
                </div>
            </div>
            
            {/* Transaction List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-12 md:py-16 px-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                             <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">No transactions yet</h3>
                        <p className="text-sm md:text-base text-gray-500 text-center mb-6 max-w-sm">Start tracking your finances by adding your first transaction</p>
                        <button
                            onClick={AddTransaction}
                            className="flex items-center gap-2 px-5 py-2.5 bg-[#D633E6] hover:bg-[#b02bc0] text-white rounded-xl hover:shadow-lg hover:shadow-[#D633E6]/30 hover:scale-[1.02] transition-all duration-300 font-semibold text-sm md:text-base"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Your First Transaction
                        </button>
                    </div>
                ) : (
                    <div className="p-3 md:p-4 space-y-2">
                        {transactions.map((t: Transaction) => (
                            <TransactionLine
                                key={t.id}
                                id={t.id}
                                name={t.name}
                                amount={t.amount}
                                type={t.type}
                                date={t.date}
                                note={t.note}
                                created_at={t.created_at}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}