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
                <div className="bg-white shadow-lg border border-black/10 rounded-2xl flex flex-col transition h-[calc(100vh-11.5rem)]">
            {/* header*/}
            <div className="flex flex-row justify-between p-5 border-b border-black/5">
                <p className="text-xl font-bold">
                    Transactions History
                </p>

                <button
                    onClick={AddTransaction} 
                    className="font-semibold border border-black/10 rounded-2xl hover:shadow-lg cursor-pointer px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Add new
                </button>
            </div>
            
            {/* Scrollable Transaction List */}
            <div className="flex-1 overflow-y-auto">
                {transactions.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-500">There are no transactions</p>
                    </div>
                ) : (
                    <div className="px-[1%]">
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