

export default function accSettings(){
    return(
        <div className ='w-auto bg-black/20 pl-20 pr-20 rounded-2xl'>
            <div className = 'w-full flex flex-row gap-20'>
                <div>
                {/* Profile picture container */}
                <img 
                    src="" 
                    alt="Profile picture" 
                    className = 'md:w-35 md:h-35 bg-black'
                />

                </div>

                <div className = 'mt-3'>
                    <p
                        className ='font-semibold text-lg'>
                        Username    
                    </p>
                </div>
            </div>
        </div>
    )
}