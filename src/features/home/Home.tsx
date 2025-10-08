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
                    <div className='flex flex-col items-center justify-center min-h-screen px-4 pt-16 md:pt-8 sm:px-6 lg:px-8'>
                        <div className='text-center max-w-4xl mx-auto'>
                            {/* Main Heading */}
                            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight'>
                                Welcome to <span className=' text-purple-700'>Coinwise</span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p className='text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed px-2'>
                                Your intelligent financial companion for smarter money management
                            </p>
                            
                            {/* Description */}
                            <p className='text-base sm:text-lg text-gray-500 mb-8 sm:mb-12 max-w-2xl mx-auto px-2'>
                                Track expenses, monitor income, analyze spending patterns, and achieve your financial goals with our intuitive and powerful expense tracking platform.
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4'>
                                <Link to={isAuthenticated ? "/dashboard" : "/login"} className='px-6 sm:px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-lg font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg text-center'>
                                    Get Started
                                </Link>
                                <button 
                                  onClick={() => {
                                    document.getElementById('info-section')?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className='cursor-pointer px-6 sm:px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 hover:border-purple-400 hover:text-purple-500 transition-all duration-300 text-center'>
                                    Learn More
                                </button>
                            </div>
                        </div>
                        
                        {/* Features Grid */}
                        <div className='w-full px-2'>
                            <Features/>
                        </div>
                    </div>
                    
                    {/* Info Section */}
                    <div id ='info-section' className='px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
                        <Info/>
                    </div>
                    
                    {/* Technologies Section */}
                    <div className='px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16'>
                        <Techs/>
                    </div>
                </div>
            </div>
        </div>
    );
}