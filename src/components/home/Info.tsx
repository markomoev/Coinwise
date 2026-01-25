import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../client';

import LightningIcon from '../../public/home/info/lightning.svg?react';
import SecurityIcon from '../../public/home/info/security.svg?react';
import BulbIcon from '../../public/home/info/bulb.svg?react';
import ArrowsIcon from '../../public/home/info/arrows.svg?react';

import infoTexts from './texts/InfoTexts.json';

export default function Info(){

const [isAuthenticated, setIsAuthenticated] = useState(false);
  
 // check if user is logged in
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
        <div className='max-w-6xl mx-auto'>
            {/* Section Header */}
            <div className='text-center mb-8 sm:mb-12'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-2'>
                    Why Choose <span className='text-[#F04DFF] drop-shadow-lg '>Coinwise?</span>
                </h2>
                <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2'>
                    Experience the future of personal finance management with our cutting-edge features
                </p>
            </div>

            {/* Info Cards Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
                {/* Easy to Use Card */}
                <div className='bg-white/80 hover:border-[#F04DFF] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#F04DFF] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <LightningIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>Lightning Fast</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {infoTexts["Easy Use"]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secure & Private Card */}
                <div className='bg-white/80 hover:border-[#F04DFF] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#F04DFF] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <SecurityIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>Secure & Private</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {infoTexts["Security"]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Smart Insights Card */}
                <div className='bg-white/80 hover:border-[#F04DFF] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#F04DFF] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <BulbIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>Smart Insights</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {infoTexts["Smart Insights"]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Real-time Sync Card */}
                <div className='bg-white/80 hover:border-[#F04DFF] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#F04DFF] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <ArrowsIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>Real-time Sync</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {infoTexts["Real-time Sync"]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className='text-center mt-12 sm:mt-16'>
                <div className='bg-[#F04DFF]/5 backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8'>
                    <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-2'>Ready to Take Control of Your Finances?</h3>
                    <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2'>
                        Join thousands of users who have already transformed their financial lives with Coinwise. 
                        Start your journey to financial freedom today.
                    </p>
                    <Link 
                        to={isAuthenticated ? "/dashboard" : "/login"}
                        className='inline-block px-6 sm:px-8 py-3 bg-[#F04DFF] text-white font-semibold rounded-lg hover:bg-[#d945e6] transition-all duration-300 transform hover:scale-105 shadow-lg'>
                        Start Tracking Now
                    </Link>
                </div>
            </div>
        </div>
    );
}