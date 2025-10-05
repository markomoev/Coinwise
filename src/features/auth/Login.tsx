import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { supabase } from "../../client"

import SideBar from "../../components/global/SideBar"

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
        <div className='w-full h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'>
            <div className='w-full flex flex-row gap-0 h-full'>
                <SideBar/>

                <div className='flex-1 flex justify-center items-center'>
                    <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-12'>
                            {/* Login Form Section */}
                            <div className='flex justify-center'>
                                <form
                                    onSubmit={handleLogIn} 
                                    className='w-full max-w-md'>
                                    <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200 rounded-3xl p-8 sm:p-10">
                                        {/* Heading for Login */}
                                        <div className="text-center mb-8">
                                            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                                                Welcome <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700'>Back</span>
                                            </h1>
                                            <p className="text-gray-600">Sign in to your Coinwise account</p>
                                        </div>
                                        
                                        <div className="space-y-6">
                                            {/* Email Input */}
                                            <div className="">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address
                                                </label>
                                                <input required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    id='email' 
                                                    type="email" 
                                                    placeholder='Enter your email' 
                                                    className="w-full bg-white/50 border border-gray-300 text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"/>
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Password
                                                </label>
                                                <input required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    id='password' 
                                                    type="password"
                                                    placeholder='Enter your password' 
                                                    className="w-full bg-white/50 border border-gray-300 text-gray-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500" />
                                            </div>

                                            {/* Login Button */}
                                            <button className='w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg'>
                                                Sign In
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Welcome Section */}
                            <div className="text-center lg:text-left">
                                <div className="mb-8">
                                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                                        New to <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700'>Coinwise?</span>
                                    </h2>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                        Join thousands of users who have transformed their financial lives with our intelligent expense tracking platform.
                                    </p>
                                    <div className="space-y-4 text-left">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Smart expense categorization</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Real-time financial insights</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700">Secure cloud synchronization</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-gradient-to-r from-blue-100/50 to-purple-100/50 backdrop-blur-lg rounded-2xl border border-gray-200 p-6">
                                    <p className="text-gray-700 mb-4">Don't have an account yet?</p>
                                    <Link to={'/signup'} className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        Create Account
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