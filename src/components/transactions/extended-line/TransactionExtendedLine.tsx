import EditSection from "./EditSection";

type Props = {
    id: number;
    note?: string;
    created_at?: string;
    closeLine: () => void;
}


export default function TransactionExtendedLine({id, note, created_at , closeLine }: Props) {

    const dateCreated = created_at;
    const formattedDate = dateCreated?.slice(0,10).split('-').reverse().join('.')

    return(
        <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                {/* Note Section */}
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-700">Note</span>
                    </div>
                    <p className="text-gray-600 text-sm bg-white rounded-lg p-3 border border-gray-200">
                        {note || "No additional notes provided"}
                    </p>
                </div>

                {/* Creation Date and Actions */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                            Created on <span className="font-medium text-gray-800">{formattedDate}</span>
                        </span>
                    </div>

                    <button
                        onClick={closeLine}
                        className="px-3 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-white hover:border-gray-400 transition-all duration-200"
                    >
                        Close
                    </button>
                </div>

                {/* Edit Section */}
                <EditSection
                    transactionId={id}
                />
            </div>
        </div>
    )
}