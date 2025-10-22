import {supabase} from "../../../../client"

export default async function IncVSExpData(userId: string) {

// fetching income and expenses from the Balances table
const { data: balances, error: balancesError } = await supabase
    .from('Balances')
    .select('income, expenses')
    .eq('user_id', userId)
    .maybeSingle();

if(balancesError){
    console.error('Error fetching balances:', balancesError);
    return { labels: [], values: [] };
}

// storing the income and expenses
const income = balances?.income || 0;
const expenses = balances?.expenses || 0;

// return the data in the chart format
return { labels: ['Income', 'Expenses'], values: [income, expenses] };
}