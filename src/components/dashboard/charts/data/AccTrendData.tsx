import {supabase} from "../../../../client"

export default async function getAccTrendData(userId: string) {
    // Get current balance from Balances table
    const { data: balances, error: balancesError } = await supabase
        .from('Balances')
        .select('total')
        .eq('user_id', userId)
        .single(); // Use single() to get one record, not an array

    // Fetch transactions for calculating trend
    const { data: transactions, error: transactionsError } = await supabase
        .from('Transactions')
        .select('created_at, amount, type')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

    if (transactionsError || balancesError) {
        console.error('Error fetching data:', { transactionsError, balancesError });
        return { labels: [], values: [] };
    }

    if (!transactions || transactions.length === 0) {
        return { labels: [], values: [] };
    }

    // start with current balance and work backwards
    const currentBalance = balances?.total || 0;
    
    // calculate the balance before all transactions
    let totalTransactionAmount = 0;
    transactions.forEach(transaction => {
        if(transaction.type === 'Income' || transaction.type === 'Savings'){
            totalTransactionAmount += Number(transaction.amount);
        } else if(transaction.type === 'Expense'){
            totalTransactionAmount -= Number(transaction.amount);
        }
    });
    
    // starting and running balance
    let runningBalance = currentBalance - totalTransactionAmount;
    const balanceHistory: { date: string, balance: number }[] = [];

    transactions.forEach(transaction => {
        // update running balance based on type
        if(transaction.type === 'Income' || transaction.type === 'Savings'){
            runningBalance += Number(transaction.amount);
        } else if(transaction.type === 'Expense'){
            runningBalance -= Number(transaction.amount);
        }

        // Store the balance at this point in time
        balanceHistory.push({
            date: transaction.created_at,
            balance: runningBalance
        });
    });

    // Convert to chart format
    const labels = balanceHistory.map(item => 
        new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );
    
    const values = balanceHistory.map(item => item.balance);

    return { labels, values };
}
