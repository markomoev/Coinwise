

export default function settingsMenu() {
    return(
        <div className="md:w-auto w-full">
            <div className ='md:w-full mb-4 border-b border-b-black/10'>
                <p className = 'text-center md:text-start text-lg border-white/20 border-b w-full font-semibold pl-1'>
                    Menu
                </p>
            </div>

            <div className="w-full items-center justify-center flex md:flex-col flex-row md:gap-7 gap-0 md:items-start text">

                <button 
                    className = 'p-2 pl-4 pr-4 rounded-2xl hover:bg-black/20 cursor-pointer'>
                        Account
                </button>

                <button
                    className = 'p-2 pl-4 pr-4 rounded-2xl hover:bg-black/20 cursor-pointer'>
                    Support
                </button>

                <button
                    className = 'p-2 pl-4 pr-4 rounded-2xl hover:bg-black/20 cursor-pointer'>
                    Terms and Policies
                </button>
            </div>
        </div>
    )
}