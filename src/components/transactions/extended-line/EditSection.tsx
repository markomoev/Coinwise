import DeleteAlert from "./alerts/DeleteAlert";

import { useState } from "react";

type TransactionEditProps = {
    transactionId: number;
}

type DeleteAlert = {
    handleDeleteAlert: () => void;
}


export default function TransactionEdit({ transactionId }: TransactionEditProps) {
    // edit mode
    const [isModifying, setIsModifying] = useState(false);
    // delete alert
    const [showDeleteAlert, setShowDeleteAlert] = useState(false); 

    // delete function
    const handleDeleteAlert = async() => {
        setShowDeleteAlert(true);
    }

    return(
        // Edit Section
        <div className="flex gap-2 pt-2 border-t border-gray-200">
            <button
                onClick={() => setIsModifying(true)}
                className="md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200">
                Modify
            </button>

            <button
                onClick = {() => setIsModifying(false)}
                className={`${isModifying ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200`}>
                Cancel
            </button>
            <button
                onClick={handleDeleteAlert} 
                className={`${isModifying ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 ml-auto`}>
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