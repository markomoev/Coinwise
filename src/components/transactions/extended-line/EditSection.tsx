import DeleteAlert from "./alerts/DeleteAlert";

import { useState } from "react";
import { useTranslation } from "react-i18next";

type TransactionEditProps = {
    transactionId: number;
}

type DeleteAlert = {
    handleDeleteAlert: () => void;
}


export default function TransactionEdit({ transactionId }: TransactionEditProps) {
    const { t } = useTranslation();
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
                className="md:px-4 px-3 md:py-2 py-1 text-sm font-semibold text-[#D633E6] bg-[#D633E6]/10 border border-[#D633E6]/20 rounded-lg hover:bg-[#D633E6]/20 hover:border-[#D633E6]/30 transition-all duration-200">
                {t('trans-btn-modify')}
            </button>

            <button
                onClick = {() => setIsModifying(false)}
                className={`${isModifying ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200`}>
                {t('trans-btn-cancel')}
            </button>
            <button
                onClick={handleDeleteAlert} 
                className={`${isModifying ? "block" : "hidden"} md:px-4 px-3 md:py-2 py-1 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 ml-auto`}>
                {t('trans-btn-delete')}
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