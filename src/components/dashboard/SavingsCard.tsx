export default function SavingsCard(){
    return(
        <div className = 'flex flex-col md:w-auto w-[55%] gap-8 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl'>
            <div className = ''>
                <p className = 'text-lg'>Savings:</p>
            </div>
           
           <div className = 'flex flex-row gap-7'> {/* Container for the sum and the last transaction */}
                <div className = 'h-full'>
                    <p className = 'font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>22530$</p>
                </div>

                <div className = 'h-full pl-7 pt-1 border border-l-black/10 border-t-transparent border-r-transparent border-b-transparent'>
                    <div>
                        <p className = 'text-lg font-semibold text-stone-700'>+890$</p>
                    </div>
                </div>
           </div>
        </div>
    )
}