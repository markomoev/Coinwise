import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../client';

export default function Info(){

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
        <div className='max-w-6xl mx-auto'>
            {/* Section Header */}
            <div className='text-center mb-12'>
                <h2 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-4'>
                    Why Choose <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700'>Coinwise?</span>
                </h2>
                <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                    Experience the future of personal finance management with our cutting-edge features
                </p>
            </div>

            {/* Info Cards Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                {/* Easy to Use Card */}
                <div className='bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z'></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Lightning Fast</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Our intuitive interface makes expense tracking effortless. Add transactions, categorize expenses, 
                                and monitor your financial health in seconds, not minutes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secure & Private Card */}
                <div className='bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Secure & Private</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Your financial data is protected with bank-level encryption. We prioritize your privacy 
                                and never share your personal information with third parties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Smart Insights Card */}
                <div className='bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Smart Insights</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Get personalized recommendations and insights based on your spending habits. 
                                Discover opportunities to save money and optimize your financial decisions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Real-time Sync Card */}
                <div className='bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200 p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-4'>
                        <div className='w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0'>
                            <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'></path>
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-2xl font-bold text-gray-800 mb-3'>Real-time Sync</h3>
                            <p className='text-gray-600 leading-relaxed'>
                                Access your financial data anywhere, anytime. Our cloud-based platform ensures 
                                your information is always up-to-date across all your devices.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className='text-center mt-16'>
                <div className='bg-gradient-to-r from-blue-100/50 to-purple-100/50 backdrop-blur-lg rounded-2xl border border-gray-200 p-8'>
                    <h3 className='text-2xl font-bold text-gray-800 mb-4'>Ready to Take Control of Your Finances?</h3>
                    <p className='text-gray-600 mb-6 max-w-2xl mx-auto'>
                        Join thousands of users who have already transformed their financial lives with Coinwise. 
                        Start your journey to financial freedom today.
                    </p>
                    <Link 
                        to={isAuthenticated ? "/dashboard" : "/login"}
                        className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg'>
                        Start Tracking Now
                    </Link>
                </div>
            </div>
        </div>
    );
}