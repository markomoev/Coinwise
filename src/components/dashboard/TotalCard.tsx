export default function TotalCard() {
    return(
        <div className="w-full mt-10 flex flex-col gap-3 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl">
        <div>
            <p className = 'text-lg'>Total balance:</p>
        </div>

        <div className = 'w-full flex flex-row justify-between'>
            <div> {/* TODO: Here the price would be a variable */}
                <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>23 500$</p>
            </div>

            <div>
                <p>here we would have a chart</p>
            </div>
        </div>
        </div>
    )
}