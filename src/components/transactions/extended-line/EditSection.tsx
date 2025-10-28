type Props = {
    closeSection: () => void;
}

export default function TransactionEdit({ closeSection }: Props){
    return(
        // Edit Section
        <div className="flex gap-2 pt-2 border-t border-gray-200">
            <button
                className="edit-button px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all duration-200">
                Edit
            </button>
            <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all duration-200">
                Save
            </button>
            <button
                onClick={closeSection}
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                Cancel
            </button>
            <button className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all duration-200 ml-auto">
                Delete
            </button>
        </div>
    )
}