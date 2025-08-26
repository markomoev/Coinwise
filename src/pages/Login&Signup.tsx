import TopBar from "../components/global/TopBar"

export default function LogSignPage(){
    return(
        <div className = 'w-full flex flex-col'>
           <TopBar/>
            <div className = 'sm:w-1/2 w-full items-center flex justify-center sm:flex-row flex-col '>
                    <div className = 'bg-black/20 pt-4 pb-6 p-20 gap-13 w-fit rounded-3xl flex flex-col items-center justify-center mt-[15%]'>
                        
                        {/* Heading for Login */}
                        <div className="w-full text-center">
                            <p className="text-3xl text-amber-700 font-bold">Login</p>
                        </div>
                        
                        {/* Username Input */}
                        <div className="">
                            <input 
                                id = 'username' 
                                type="text" 
                                placeholder = 'Username' 
                                className="bg-stone-500/30 text-white p-1 pl-2 pr-2 rounded-md "/>
                        </div>

                        {/* Password */}
                        <div>
                            <input 
                                id = 'password' 
                                type="password"
                                placeholder = 'Password' 
                                className="bg-stone-500/30 text-white p-1 pl-2 pr-2 rounded-md " />
                        </div>

                        {/* Button for loging in */}
                        <div>
                            <button className = 'bg-amber-700 rounded-2xl p-2 pl-4 pr-4 cursor-pointer text-xl font-semibold'>
                                Login
                            </button>
                        </div>
                </div>

                <div className="z-0 sm:w-1/2 h-full flex flex-col mt-20 sm:mt-0">
                    <div className="w-full text-center mt-[15%]">
                        <p className="text-2xl font-bold mb-2">Join us!</p>
                        <p>
                            Motivational speech in order to lie people <br/>
                            so they can join <br/> our stupid comuity
                            just for money
                        </p>
                        
                        <div className="mt-10">
                            <p>Don't have an account? Fix this mistake:</p>
                            <a href="" className="text-amber-700 underline font-semibold">Signup</a>
                        </div>
                    </div>
                </div>
        </div>
    </div>

    )
}