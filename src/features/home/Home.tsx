import SideBar from "../../components/global/SideBar";
import Techs from "../../components/home/Technologies";
import Info from "../../components/home/Info";
import Features from "../../components/home/Features";


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
                                Welcome to <span className=' text-purple-700'>Coinwise</span>
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
                                <Link to={isAuthenticated ? "/dashboard" : "/login"} className='px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-semibold flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg'>
                                    Get Started
                                </Link>
                                <button 
                                  onClick={() => {
                                    document.getElementById('info-section')?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className='cursor-pointer px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 hover:border-purple-400 hover:text-purple-500 transition-all duration-300'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                        
                        {/* Features Grid */}
                        <div className=''>
                            <Features/>
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