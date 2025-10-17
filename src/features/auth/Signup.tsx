import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../../client"

import SideBar from "../../components/global/SideBar"
import Alert from "../../components/global/Alert"

export default function SignUpPage(){
    // alert for errors
    const [alertMessage, setAlertMessage] = useState(false);
    const [alertMessageText, setAlertMessageText] = useState('');


    const navigate = useNavigate();

    // Variables
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // Handling user data
    const handleSignUp = async (e:any) => {
        e.preventDefault();

        //Requirements for the password
        if(password.length > 6 && /[A-Z]/.test(password) && /\d/.test(password) ){
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { username }
                }
            })

            const { data: userData} = await supabase.auth.getUser();
            const user: any = userData.user;

            const {error: insertError} = await supabase
            .from("users")
            .insert({
                id: user.id,
                username: username,
                is_deleted: false,
            })

            if(insertError){
            setAlertMessage(true);
            setAlertMessageText('Error in inserting data');
            console.error('Insert error:', insertError.message);
            return;
            }

            if(error){
            setAlertMessage(true);
            setAlertMessageText('Error in signing up');
            console.error('Sign up error:', error.message);
            return;            
            }

            if(data){
                navigate('/home');
            }
        }else{
            alert('Password must contain at least one upper case and number!')
        }

            setUsername('');
            setEmail('');
            setPassword('');
    }

    return(
        <div className='w-full min-h-screen'>
            <div className='w-full flex flex-row gap-0 min-h-screen'>
                <SideBar/>

                {/* Alert Message */}
                <div className = {`${alertMessage ? 'block' : 'hidden'}`}>
                    {alertMessage && 
                        <Alert 
                            closeAlert={() => setAlertMessage(false)}
                            alertMessageText={alertMessageText} />}
                </div>
                <div className='flex-1 flex justify-center items-start lg:items-center overflow-y-auto md:mt-0 mt-10'>
                    <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-0'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-center lg:min-h-screen'>
                            {/* Signup Form Section */}
                            <div className='flex justify-center'>
                                <form 
                                    onSubmit={handleSignUp}
                                    className='w-full max-w-md'>
                                    <div className='bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200 rounded-3xl p-8 sm:p-10'>
                                        
                                        {/* Heading for Signup */}
                                        <div className="text-center mb-8">
                                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                                Join <span className='text-purple-700'>Coinwise</span>
                                            </h1>
                                            <p className="text-gray-600">Create your account and start tracking</p>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Username Input */}
                                            <div>
                                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Username
                                                </label>
                                                <input required
                                                    name='username'
                                                    type="text" 
                                                    placeholder='Choose a username'
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="w-full bg-white/50 border border-gray-300 text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                                                />
                                            </div>
                                            
                                            {/* Email Input */}
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input required
                                                    name='email'
                                                    type="email" 
                                                    placeholder='Enter your email'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                    className="w-full bg-white/50 border border-gray-300 text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                                                />
                                            </div>
                                            
                                            {/* Password Input */}
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Password
                                                </label>
                                                <input required
                                                    name='password'
                                                    type="password" 
                                                    placeholder='Create a password'
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-white/50 border border-gray-300 text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all duration-200 placeholder-gray-500"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Must contain at least one uppercase letter and number</p>
                                            </div>

                                            {/* Signup Button */}
                                            <button className='w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg'>
                                                Create Account
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Welcome Back Section */}
                            <div className="text-center lg:text-left">
                                <div className="mb-8">
                                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                                        Already have an <span className='text-purple-700'>account?</span>
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                        Welcome back! Sign in to continue managing your finances and tracking your progress toward your goals.
                                    </p>
                                    <div className="space-y-4 text-left">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Access your saved data</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Continue tracking expenses</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">View your financial insights</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-purple-50 backdrop-blur-lg rounded-2xl border border-gray-200 p-6">
                                    <p className="text-gray-700 mb-4">Already have an account?</p>
                                    <Link to={'/login'} className="inline-flex items-center px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Sign In
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}