import {supabase} from '../../../client'

export const usePocketMoney = async () => {
    // getting the user id
    const { data: { user } } = await supabase.auth.getUser()
    const user_id : any = user?.id;

    // getting user balnce and calculating
    try{
        // fetching the savings
        const {data: fetchSavings, error: fetchSavingsError} = await supabase
        .from("Balances")
        .select("savings")
        .eq("user_id", user_id)
        .maybeSingle()

        // fetching the total balance
        const {data: fetchTotal, error: fetchTotalError} = await supabase
        .from("Balances")
        .select("total")
        .eq("user_id", user_id)
        .maybeSingle()

        // calculating the pocket money
        const totalMoney: number = fetchTotal?.total
        const savingsMoney: number = fetchSavings?.savings
        const pocketMoney : number =  totalMoney - savingsMoney;
    
        // error handling
        if(fetchSavingsError || fetchTotalError){
            console.error('Fetching error')
            return;
        }
        
        return pocketMoney;
    }
    catch(error){
        console.error('An unexpected error occurred!');
    }
}