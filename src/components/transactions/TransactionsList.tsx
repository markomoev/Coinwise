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
        <div className="w-full bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">All Transactions</h2>
                            <p className="text-sm text-gray-600">{transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found</p>
                        </div>
                    </div>

                    <button
                        onClick={AddTransaction}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add New
                    </button>
                </div>
            </div>
            
            {/* Transaction List */}
            <div className="max-h-[600px] overflow-y-auto">
                {transactions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 8l2 2 4-4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No transactions yet</h3>
                        <p className="text-gray-500 text-center mb-4">Start tracking your finances by adding your first transaction</p>
                        <button
                            onClick={AddTransaction}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Your First Transaction
                        </button>
                    </div>
                ) : (
                    <div className="p-4 space-y-2">
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