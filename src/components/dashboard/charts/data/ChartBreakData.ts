import {supabase} from '../../../../client';

export default async function ChartBreakData(userId: string) {
    // Get current balance from Balances table
    const { data: balances, error: balancesError } = await supabase
        .from('Balances')
        .select('savings')
        .eq('user_id', userId)
        .maybeSingle();

        if(balancesError) {
            console.error('Error fetching balances:', balancesError);
            return { labels: [], values: [] };
        }

    // Fetch transactions for calculating trend
    const { data: transactions, error: transactionsError } = await supabase
        .from('Transactions')
        .select('date, amount, type')
        .eq('user_id', userId)
        .order('date', { ascending: true });

        if (transactionsError) {
            console.error('Error fetching transactions:', transactionsError);
            return { labels: [], values: [] };
        }

    
    if (transactionsError || balancesError) {
        console.error('Error fetching data:', { transactionsError, balancesError });
        return { labels: [], values: [] };
    }

    if (!transactions || transactions.length === 0) {
        return { labels: [], values: [] };
    }

    // start with current balance and work backwards
    const currentBalance = balances?.savings || 0;

    // calculate the savings before all transactions
    let totalSavingsAmount = 0;
    transactions.forEach(transaction => {
        if(transaction.type === 'Savings Deposit' || transaction.type === 'Savings'){
            totalSavingsAmount += Number(transaction.amount);
        } else if(transaction.type === 'Savings Withdrawal' || transaction.type === 'Savings Withdrawl'){
            totalSavingsAmount -= Number(transaction.amount);
        }
    });

    // starting and running savings amount
    let runningSavingsAmount = currentBalance - totalSavingsAmount;

    //group balances by date
    const dailyBalances = new Map<string, number>();

    transactions.forEach(transaction => {
        // get the date in a format
        const dateKey = new Date(transaction.date).toISOString().split('T')[0];


        // update running balance based on type
        if(transaction.type === 'Savings Deposit' || transaction.type === 'Savings'){
            runningSavingsAmount += Number(transaction.amount);
        } else if(transaction.type === 'Savings Withdrawal' || transaction.type === 'Savings Withdrawl'){
            runningSavingsAmount -= Number(transaction.amount);
        }

        // set or update the daily balance
        dailyBalances.set(dateKey, runningSavingsAmount);
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