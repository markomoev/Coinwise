import { useEffect, useState } from "react";

import {supabase} from "../../../client";

type TransactionEditProps = {
    transactionId: number;
}

export default function TransactionEdit({ transactionId }: TransactionEditProps){
    // edit mode
    const [isEditing, setIsEditing] = useState(false);
    // data to be edited
    const [data, setData] = useState({
        id: 0,
        userId: "",
        name: "",
        amount: 0,
        type: "",
        date: "",
        note: ""
    })

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

            const {data: fetchData,error: fetchError} = await supabase
            .from("Transactions")
            .select('*')
            .eq('id', transactionId)
            .eq('user_id', userId)
            .single();


            if (fetchError) {
                console.error("Error fetching transaction:", fetchError);
                return;
            }

            // set the data to be edited
            setData({
                id: transactionId,
                userId: userId,
                name: fetchData.name,
                amount: fetchData.amount,
                type: fetchData.type,
                date: fetchData.date,
                note: fetchData.note
            });
        }
        fetchData();
    }, [])

    // delete function
    const handleDelete = async() => {
        const {error} = await supabase 
        .from("Transactions")
        .delete()
        .eq('id', transactionId)
        .eq('user_id', data.userId)

        if(error){
            console.error("Error deleting transaction:", error);
            return;
        }
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
                onClick={handleDelete} 
                className={`${isEditing ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 ml-auto`}>
                Delete
            </button>
        </div>
    )
}