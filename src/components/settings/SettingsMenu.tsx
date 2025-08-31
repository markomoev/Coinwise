

export default function settingsMenu() {
    return(
        <div className="">
            <div className="flex flex-col gap-7 items-start text">
                <p className = 'text-lg border-white/20 border-b w-full font-semibold pl-1'>
                    Menu
                </p>

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