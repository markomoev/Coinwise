type Props = {
    showPopup: () => void;
}

export default function TotalCard({showPopup}: Props) {
    return(
        <div className="w-[95%] mt-10 flex flex-col gap-3 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl">
        <div>
            <p className = 'text-lg'>Total balance:</p>
        </div>

        <div className = 'w-full flex flex-row justify-between'>
            <div> {/* TODO: Here the price would be a variable */}
                <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>23 500$</p>
            </div>

            <div>
                <button
                    onClick = {showPopup}
                    className="font-semibold border border-black/10 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Add funds
                </button>
            </div>
        </div>
        </div>
    )
}