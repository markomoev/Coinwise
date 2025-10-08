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
            <div className="bg-purple-700/5 p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div>
                            <h2 className="text-lg md:text-xl font-semibold text-gray-800">All Transactions</h2>
                            <p className="text-xs md:text-sm text-gray-600">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found</p>
                        </div>
                    </div>

                    <button
                        onClick={AddTransaction}
                        className="flex items-center justify-center gap-2 px-3 py-2 md:px-4 bg-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium text-sm md:text-base w-full sm:w-auto"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New
                    </button>
                </div>
            </div>
            
            {/* Transaction List */}
            <div className="flex-1 overflow-y-auto">
                {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 md:w-8 md:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">No transactions yet</h3>
                        <p className="text-sm md:text-base text-gray-500 text-center mb-4 max-w-sm">Start tracking your finances by adding your first transaction</p>
                        <button
                            onClick={AddTransaction}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium text-sm md:text-base"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Your First Transaction
                        </button>
                    </div>
                ) : (
                    <div className="p-3 md:p-4 space-y-2">
                        {transactions.map((t: Transaction) => (
                            <TransactionLine
                                key={t.id}
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