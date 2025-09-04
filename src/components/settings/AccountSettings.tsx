

export default function accSettings(){
    return(
        <div className ='w-auto bg-white/20 pl-10 pr-20 rounded-2xl border border-black/10 shadow-lg'>
            <div className = 'w-full flex flex-col gap-5'>
                {/* Username */}
                <div className ='mb-3'>
                    <div className = 'mt-3'>
                        <p
                            className ='font-semibold text-lg bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>
                            Profile info   
                        </p>
                    </div>
                </div> 

                <div className ='w-1/2 flex gap-5'>
                    <input readOnly
                        className = 'bg-black/18 text-white p-1 pl-2 pr-2 rounded-md border border-black/10 shadow-sm'
                        type ='email'
                        placeholder ='Email here'
                    />

                    <input readOnly
                        className = 'bg-black/18 text-white p-1 pl-2 pr-2 rounded-md border border-black/10 shadow-sm'
                        type="text"
                        placeholder ='Username here'/>
                </div>

                <div>
                    <button className ='pt-1 pb-1 pl-3 pr-3 cursor-pointer border border-black/10 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent rounded-2xl font-bold text-md shadow-lg'>
                        Edit
                    </button>
                    <button>Save</button>
                    <button>delete profile</button>
                </div>
            </div>
        </div>
    )
}