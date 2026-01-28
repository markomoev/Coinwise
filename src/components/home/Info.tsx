import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../client';

import { Zap, ShieldCheck, Lightbulb, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Info(){
    const { t } = useTranslation();

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
                    {t("info-heading")}
                </h2>
                <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2'>
                    {t("info-subheading")}
                </p>
            </div>

            {/* Info Cards Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
                {/* Easy to Use Card */}
                <div className='bg-white/80 hover:border-[#F6A30F] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#F6A30F] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <Zap className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>{t("benefit-1-title")}</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {t("benefit-1-desc")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Secure & Private Card */}
                <div className='bg-white/80 hover:border-[#10B981] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#10B981] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <ShieldCheck className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>{t("benefit-2-title")}</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {t("benefit-2-desc")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Smart Insights Card */}
                <div className='bg-white/80 hover:border-[#3B82F6] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#3B82F6] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <Lightbulb className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>{t("benefit-3-title")}</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {t("benefit-3-desc")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Real-time Sync Card */}
                <div className='bg-white/80 hover:border-[#8B5CF6] backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8 hover:bg-white/90 hover:shadow-lg transition-all duration-300'>
                    <div className='flex items-start space-x-3 sm:space-x-4'>
                        <div className='w-12 h-12 bg-[#8B5CF6] rounded-xl flex items-center justify-center flex-shrink-0'>
                            <RefreshCw className='w-6 h-6 text-white' />
                        </div>
                        <div>
                            <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3'>{t("benefit-4-title")}</h3>
                            <p className='text-sm sm:text-base text-gray-600 leading-relaxed'>
                                {t("benefit-4-desc")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className='text-center mt-12 sm:mt-16'>
                <div className='bg-[#F04DFF]/5 backdrop-blur-lg rounded-2xl border border-gray-200 p-6 sm:p-8'>
                    <h3 className='text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 px-2'>{t("cta-title")}</h3>
                    <p className='text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-2xl mx-auto px-2'>
                        {t("cta-desc")}
                    </p>
                    <Link 
                        to={isAuthenticated ? "/dashboard" : "/login"}
                        className='inline-block px-6 sm:px-8 py-3 bg-[#F04DFF] text-white font-semibold rounded-lg hover:bg-[#d945e6] transition-all duration-300 transform hover:scale-105 shadow-lg'>
                        {t("cta-button")}
                    </Link>
                </div>
            </div>
        </div>
    );
}