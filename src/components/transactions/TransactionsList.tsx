import TransactionLine from "./TransactionLine";

type Transaction= {
  id: number;
  name: string;
  amount: number;
  type: string;
  date: string | null;
  note?: string;
};

type Props = {
    AddTransaction: () => void;
    transactions: Transaction[];
}


export default function TransactionsList({AddTransaction, transactions}: Props) {


    return(
        <div className = {`bg-white shadow-lg border border-black/10 rounded-2xl flex flex-col gap-10 transition`}>
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
                
                <div>
                    {transactions.map((t: any) => (
                    <TransactionLine
                        key={t.id}
                        name={t.name}
                        amount={t.amount}
                        type={t.type}
                        date={t.date}
                        note={t.note}
                    />
                    ))}
                </div>
            </div>
        </div>
    );
}