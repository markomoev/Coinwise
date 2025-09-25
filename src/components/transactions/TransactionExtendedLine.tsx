type Props = {
    note?: string;
    created_at?: string;
    closeLine: () => void;
}

export default function TransactionExtendedLine({ note, created_at , closeLine }: Props) {
    
    const dateCreated = created_at;
    const formattedDate = dateCreated?.slice(0,10).split('-').reverse().join('.')
    
    return(
        <div className="mt-2 mb-4 w-full overflow-hidden">
            <div className="bg-gray-50/50 border border-black/5 rounded-xl p-4 shadow-sm
                          transform transition-all duration-300 ease-out
                          animate-slideDown opacity-100">
                {/* Note Section */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Note
                        </span>
                    </div>
                </div>
                
                {/* Note Content */}
                <p className="text-gray-600 text-sm mb-4">
                    {note || "No note added"}
                </p>

                {/* Date and Close Button */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-gray-500">Created:</span>
                        <span className="font-medium bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            {formattedDate}
                        </span>
                    </div>

                    <button
                        onClick={closeLine}
                        className="cursor-pointer text-sm font-semibold border border-black/10 rounded-xl px-4 py-1.5 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}