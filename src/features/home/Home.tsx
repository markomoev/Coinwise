import SideBar from "../../components/global/SideBar";
import Techs from "../../components/home/Technologies";
import Info from "../../components/home/Info";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../client";

export default function HomePage(){

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
          const checkAuth = async () => {
              const { data: { user }, error } = await supabase.auth.getUser();
              
              if (error) {
                  console.error('Auth error:', error.message);
                  setIsAuthenticated(false);
              } else {
                  setIsAuthenticated(!!user);
              }
          };
  
          checkAuth();
      }, []);


    return(
        <div className='w-full h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'>
            <div className='w-full flex flex-row gap-0 h-full'>
                <SideBar/>
                <div className='flex-1 flex flex-col overflow-y-auto'>
                    {/* Hero Section */}
                    <div className='flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
                        <div className='text-center max-w-4xl mx-auto'>
                            {/* Main Heading */}
                            <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-6'>
                                Welcome to <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700'>Coinwise</span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p className='text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed'>
                                Your intelligent financial companion for smarter money management
                            </p>
                            
                            {/* Description */}
                            <p className='text-lg text-gray-500 mb-12 max-w-2xl mx-auto'>
                                Track expenses, monitor income, analyze spending patterns, and achieve your financial goals with our intuitive and powerful expense tracking platform.
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-16'>
                                <Link to={isAuthenticated ? "/dashboard" : "/login"} className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg'>
                                    Get Started
                                </Link>
                                <button 
                                  onClick={() => {
                                    document.getElementById('info-section')?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className='cursor-pointer px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 transition-all duration-300'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                        
                        {/* Features Grid */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8'>
                            {/* Feature 1 */}
                            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-6 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                                <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mb-4'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'></path>
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Smart Analytics</h3>
                                <p className='text-gray-600'>Get detailed insights into your spending patterns with intelligent analytics and visualizations.</p>
                            </div>
                            
                            {/* Feature 2 */}
                            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-6 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                                <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mb-4'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Expense Tracking</h3>
                                <p className='text-gray-600'>Easily track and categorize your expenses with our intuitive interface and smart categorization.</p>
                            </div>
                            
                            {/* Feature 3 */}
                            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-6 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                                <div className='w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center mb-4'>
                                    <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'></path>
                                    </svg>
                                </div>
                                <h3 className='text-xl font-semibold text-gray-800 mb-2'>Budget Goals</h3>
                                <p className='text-gray-600'>Set and achieve your financial goals with personalized budgeting tools and progress tracking.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Info Section */}
                    <div id ='info-section' className='px-4 sm:px-6 lg:px-8 py-16'>
                        <Info/>
                    </div>
                    
                    {/* Technologies Section */}
                    <div className='px-4 sm:px-6 lg:px-8 pb-16'>
                        <Techs/>
                    </div>
                </div>
            </div>
        </div>
    );
}