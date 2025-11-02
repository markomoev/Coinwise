import DeleteAlert from "./alerts/DeleteAlert";

import { useState } from "react";

type TransactionEditProps = {
    transactionId: number;
}

type DeleteAlert = {
    handleDeleteAlert: () => void;
}

export default function TransactionEdit({ transactionId }: TransactionEditProps){
    // edit mode
    const [isEditing, setIsEditing] = useState(false);
    // delete alert
    const [showDeleteAlert, setShowDeleteAlert] = useState(false); 
    
    // TODO: edit functionality
    // data to be edited

    /*const [data, setData] = useState({
        id: 0,
        userId: "",
        name: "",
        amount: 0,
        type: "",
        date: "",
        note: ""
    })

    const [balance, setBalance] = useState({
        id: 0,
        userId: "",
        total: 0,
        income: 0,
        expenses: 0,
        savings: 0
    });

    // get data from the db
    useEffect(() => {
        const fetchData = async() => {
            // fetch the user first
            const {data: {user}} = await supabase.auth.getUser();
            const userId:any = user?.id; 

            if(!userId) {
                console.error("No user logged in");
                return;
            };
            
            // then fetch the transaction data
            const {data: fetchTransaction,error: fetchTransactionError} = await supabase
            .from("Transactions")
            .select('*')
            .eq('id', transactionId)
            .eq('user_id', userId)
            .single();


            if (fetchTransactionError) {
                console.error("Error fetching transaction:", fetchTransactionError);
                return;
            }

            // set the data to be edited
            setData({
                id: transactionId,
                userId: userId,
                name: fetchTransaction.name,
                amount: fetchTransaction.amount,
                type: fetchTransaction.type,
                date: fetchTransaction.date,
                note: fetchTransaction.note
            });

            // fetch balance data
            const {data: fetchBalance, error: fetchBalanceError} = await supabase
            .from("Balances")
            .select('*')
            .eq('user_id', userId)
            .single();

            if(fetchBalanceError){
                console.error("Error fetching balance:", fetchBalanceError);
                return;
            }

            setBalance({
                id: fetchBalance.id,
                userId: fetchBalance.user_id,
                total: fetchBalance.total,
                income: fetchBalance.income,
                expenses: fetchBalance.expenses,
                savings: fetchBalance.savings
            });
        }
        fetchData();
    }, []) */

    // delete function
    const handleDeleteAlert = async() => {
        setShowDeleteAlert(true);
    }



    return(
        // Edit Section
        <div className="flex gap-2 pt-2 border-t border-gray-200">
            <button
                onClick =  {() => setIsEditing(!isEditing)}
                className="md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200">
                Edit
            </button>
            <button 
                className={`${isEditing ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all duration-200`}>
                Save
            </button>
            <button
                onClick = {() => setIsEditing(false)}
                className={`${isEditing ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200`}>
                Cancel
            </button>
            <button
                onClick={handleDeleteAlert} 
                className={`${isEditing ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 ml-auto`}>
                Delete
            </button>

            <div>
                {showDeleteAlert && 
                    <DeleteAlert 
                        transactionId={transactionId}
                        showDeleteAlert={showDeleteAlert}
                        onCancel  = {() => setShowDeleteAlert(false)}
                    />
                }
            </div>
        </div>
    )
}