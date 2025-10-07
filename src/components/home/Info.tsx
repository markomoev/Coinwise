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
            <div className='text-center mb-12'>
                <h2 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4'>
                    Why Choose <span className='text-purple-700 drop-shadow-lg '>Coinwise?</span>
                </h2>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                    Experience the future of personal finance management with our cutting-edge features
                </p>
            </div>

            {/* Info Cards Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Easy to Use Card */}
                <div className='bg-white/80 hover:border-purple-400 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <LightningIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Lightning Fast</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                {infoTexts["Easy Use"]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secure & Private Card */}
                <div className='bg-white/80 hover:border-purple-400 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <SecurityIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Secure & Private</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                {infoTexts["Security"]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Smart Insights Card */}
                <div className='bg-white/80 hover:border-purple-400 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <BulbIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Smart Insights</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                {infoTexts["Smart Insights"]}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Real-time Sync Card */}
                <div className='bg-white/80 hover:border-purple-400 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <ArrowsIcon className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Real-time Sync</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                {infoTexts["Real-time Sync"]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className='text-center mt-16'>
                <div className='bg-purple-400/5 backdrop-blur-lg rounded-2xl border border-gray-200 p-8'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-4'>Ready to Take Control of Your Finances?</h3>
                    <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
                        Join thousands of users who have already transformed their financial lives with Coinwise. 
                        Start your journey to financial freedom today.
                    </p>
                    <Link 
                        to={isAuthenticated ? "/dashboard" : "/login"}
                        className='px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg'>
                        Start Tracking Now
                    </Link>
                </div>
            </div>
        </div>
    );
}