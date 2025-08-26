import TopBar from "../components/global/TopBar"
import { Link } from "react-router-dom"

export default function LogSignPage(){
    return(
        <div className = 'w-full flex flex-col'>
           <TopBar/>
            <div className = 'w-full flex justify-center sm:flex-row flex-col '>
                    <form className = 'lg:w-1/2 lg:pl-[15%] w-full h-full flex items-center justify-center mt-[10%]'>
                        <div className="bg-black/20 w-fit pt-4 pb-6 p-20 rounded-3xl flex flex-col gap-13 items-center justify-center">
                            {/* Heading for Login */}
                            <div className="w-full text-center">
                                <p className="text-3xl font-bold">Login</p>
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
                    </form>

                {/* In order the user does not have an acc */}
                <div className="lg:w-1/2 lg:pr-[15%] w-full h-full flex flex-col mt-[10%] items-center justify-center">
                    <div className="w-full text-center mt-20">
                        <p className="text-2xl font-bold mb-2">Join us!</p>
                        <p>
                            Motivational speech in order to lie people <br/>
                            so they can join <br/> our stupid comuity
                            just for money
                        </p>
                        
                        <div className="mt-10">
                            <p>Don't have an account? Fix this mistake:</p>
                            <Link to = {'/signup'} className="text-amber-700 underline font-semibold">Signup</Link>
                        </div>
                    </div>
                </div>
            </div>            
        </div>

    )
}