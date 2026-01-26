import SideBar from "../../components/global/SideBar";
import Techs from "../../components/home/Technologies";
import Info from "../../components/home/Info";
import Features from "../../components/home/Features";
import Logo from "../../assets/logo.png";

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
        <div className='w-full min-h-screen bg-slate-50'>
            <div className='w-full flex flex-row gap-0 min-h-screen'>
                <SideBar/>
                <div className='flex-1 flex flex-col overflow-y-auto'>
                    {/* Hero Section */}
                    <div className='relative flex flex-col items-center justify-center min-h-[90vh] px-4 pt-20 md:pt-10 sm:px-6 lg:px-8 overflow-hidden'>
                        
                        {/* Background Elements */}
                        <div className="absolute top-0 inset-x-0 h-full w-full -z-10 overflow-hidden">
                           {/* Decorative circles instead of gradients */}
                           <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#F04DFF]/5 rounded-full filter blur-[80px]"></div>
                           <div className="absolute bottom-[0%] right-[10%] w-[600px] h-[600px] bg-[#F04DFF]/5 rounded-full filter blur-[80px]"></div>
                        </div>

                        <div className='text-center max-w-5xl mx-auto z-10'>
                            {/* Main Heading */}
                            <h1 className='text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight tracking-tight animate-fade-in-up animation-delay-100'>
                                Master Your Money with <span className='relative inline-block text-[#F04DFF]'>
                                    Coinwise
                                    <img src={Logo} alt="Logo" className="absolute -top-2 -right-8 w-8 h-8 sm:w-12 sm:h-12 sm:-top-4 sm:-right-12 object-contain" />
                                </span>
                            </h1>
                            
                            {/* Subtitle */}
                            <p className='text-xl sm:text-2xl md:text-3xl text-slate-600 mb-8 sm:mb-12 leading-relaxed max-w-3xl mx-auto font-light animate-fade-in-up animation-delay-200'>
                                The intelligent financial companion that turns your spending patterns into saving opportunities.
                            </p>
                            
                            {/* CTA Buttons */}
                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-24 px-4 animate-fade-in-up animation-delay-300'>
                                <Link to={isAuthenticated ? "/dashboard" : "/login"} className='group px-8 sm:px-10 py-4 bg-[#F04DFF] hover:bg-[#d945e6] text-white rounded-full font-bold text-lg flex items-center justify-center transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1'>
                                    Get Started
                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                                </Link>
                                <button 
                                  onClick={() => {
                                    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
                                  }}
                                  className='cursor-pointer px-8 sm:px-10 py-4 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 font-bold rounded-full text-lg hover:bg-white hover:text-[#F04DFF] hover:border-[#F04DFF]/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1'>
                                    Explore Features
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Features Grid */}
                    <div id="features-section" className='w-full px-4 sm:px-6 lg:px-8 py-20 bg-white/40 backdrop-blur-md'>
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Powerful Features</h2>
                                <p className="text-xl text-slate-500">Everything you need to take control of your finances</p>
                            </div>
                            <Features/>
                        </div>
                    </div>
                    
                    {/* Info Section */}
                    <div id ='info-section' className='px-4 sm:px-6 lg:px-8 py-20 relative overflow-hidden'>
                         <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F04DFF]/5 -z-10"></div>
                        <Info/>
                    </div>
                    
                    {/* Technologies Section */}
                    <div className='px-4 sm:px-6 lg:px-8 py-20 bg-slate-50 border-t border-slate-100'>
                        <div className="text-center mb-12">
                             <h2 className="text-2xl md:text-3xl font-bold text-slate-400 uppercase tracking-widest">Powered By Modern Tech</h2>
                        </div>
                        <Techs/>
                    </div>

                    {/* Footer Simple */}
                    <div className="py-8 text-center text-slate-400 text-sm bg-slate-50 border-t border-slate-100">
                        <p>© 2026 Coinwise. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}