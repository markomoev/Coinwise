import {supabase} from "../../../../client"

export default async function getAccTrendData(userId: string) {
    // Get current balance from Balances table
    const { data: balances, error: balancesError } = await supabase
        .from('Balances')
        .select('total')
        .eq('user_id', userId)
        .maybeSingle();

    // Fetch transactions for calculating trend
    const { data: transactions, error: transactionsError } = await supabase
        .from('Transactions')
        .select('date, amount, type')
        .eq('user_id', userId)
        .order('date', { ascending: true });

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

    //group balances by date
    const dailyBalances = new Map<string, number>();

    transactions.forEach(transaction => {
        // get the date in a format
        const dateKey = new Date(transaction.date).toISOString().split('T')[0];


        // update running balance based on type
        if(transaction.type === 'Income' || transaction.type === 'Savings'){
            runningBalance += Number(transaction.amount);
        } else if(transaction.type === 'Expense'){
            runningBalance -= Number(transaction.amount);
        }

        // set or update the daily balance
        dailyBalances.set(dateKey, runningBalance);
    });

    // Convert to chart format
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const labels: string[] = [];
    const values: number[] = [];

    dailyBalances.forEach((balance, dateStr) => {
        const date = new Date(dateStr);
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
            values.push(balance);
        }
    });

    return { labels, values };
}
