import {supabase} from "../../../../client"

export default async function IncVSExpData(userId: string) {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // fetching transactions for the current month
    const { data: transactions, error: transactionsError } = await supabase
        .from('Transactions')
        .select('amount, type')
        .eq('user_id', userId)
        .gte('date', startOfMonth);

    if(transactionsError){
        console.error('Error fetching transactions:', transactionsError);
        return { labels: [], values: [] };
    }

    let income = 0;
    let expenses = 0;

    transactions?.forEach(transaction => {
        if(transaction.type === 'Income'){
            income += Number(transaction.amount);
        } else if(transaction.type === 'Expense'){
            expenses += Number(transaction.amount);
        }
    });

    // return the data in the chart format
    return { labels: ['Income', 'Expenses'], values: [income, expenses] };
}