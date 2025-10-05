type Props = {
    note?: string;
    created_at?: string;
    closeLine: () => void;
}

export default function TransactionExtendedLine({ note, created_at , closeLine }: Props) {
    
    const dateCreated = created_at;
    const formattedDate = dateCreated?.slice(0,10).split('-').reverse().join('.')
    
    return(
        <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                {/* Note Section */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-700">Note</span>
                    </div>
                    <p className="text-gray-600 text-sm bg-white rounded-lg p-3 border border-gray-200">
                        {note || "No additional notes provided"}
                    </p>
                </div>

                {/* Creation Date and Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm text-gray-600">
                            Created on <span className="font-medium text-gray-800">{formattedDate}</span>
                        </span>
                    </div>

                    <button
                        onClick={closeLine}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all duration-200"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}