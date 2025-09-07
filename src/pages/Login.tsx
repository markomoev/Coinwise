import TopBar from "../components/global/TopBar"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import {supabase} from "../client"

export default function LogSignPage(){

    const navigate = useNavigate();

    // Variables
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogIn = async (e:any) => {
        e.preventDefault();

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        
        if(error){
            alert('Error in fetching data!');
            return;
        }

        const { data: userData, error: getUserError} = await supabase.auth.getUser();
        if(getUserError){
            alert('Erorr in fetching data')
            return;
        }
        const user:any = userData.user;

        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('is_deleted')
            .eq('id', user.id)
            .single();

        if (profileError) {
            alert('Error fetching profile: ' + profileError.message);
            return;
        }if (profile?.is_deleted) {
            alert('This account has been deleted');
            await supabase.auth.signOut();
            return;
        }

        if(data){
            navigate('/home');
            return null;
        }

        setEmail('');
        setPassword(''); 
    }
    
    
    
    return(
        <div className = 'w-full flex flex-col'>
            <div className = 'w-full flex items-center justify-center'>
                <TopBar/>
            </div>
            <div className = 'w-full flex justify-center sm:flex-row flex-col'>
                    <form
                        onSubmit={handleLogIn} 
                        className = 'lg:w-1/2 lg:pl-[15%] w-full h-full flex items-center justify-center mt-[10%]'>
                        <div className="bg-white/10 shadow-xl border border-black/10 w-fit pt-4 pb-6 p-20 rounded-3xl flex flex-col gap-13 items-center justify-center">
                            {/* Heading for Login */}
                            <div className="w-full text-center">
                                <p className="text-3xl font-bold text-gray-600">Login</p>
                            </div>
                            
                            {/* Email Input */}
                            <div className="">
                                <input required
                                    value = {email}
                                    onChange = {(e) => setEmail(e.target.value)}
                                    id = 'email' 
                                    type="text" 
                                    placeholder = 'Email' 
                                    className="bg-gray-600/30 text-white p-1 pl-2 pr-2 rounded-md "/>
                            </div>

                            {/* Password */}
                            <div>
                                <input required
                                    value= {password}
                                    onChange = {(e) => setPassword(e.target.value)}
                                    id = 'password' 
                                    type="password"
                                    placeholder = 'Password' 
                                    className="bg-gray-600/30 text-white p-1 pl-2 pr-2 rounded-md " />
                            </div>

                            {/* Button for loging in */}
                            <div>
                                <button className = 'bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl p-2 pl-4 pr-4 cursor-pointer text-xl font-semibold text-white'>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>

                {/* In order the user does not have an acc */}
                <div className="lg:w-1/2 lg:pr-[15%] w-full h-full flex flex-col mt-[10%] items-center justify-center">
                    <div className="w-full text-center mt-20">
                        <p className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Join us!
                        </p>
                        <p>
                            Motivational speech in order to lie people <br/>
                            so they can join <br/> our stupid comuity
                            just for money
                        </p>
                        
                        <div className="mt-10">
                            <p>Don't have an account? Fix this mistake:</p>
                            <Link to = {'/signup'} className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent underline font-semibold">Signup</Link>
                        </div>
                    </div>
                </div>
            </div>            
        </div>

    )
}