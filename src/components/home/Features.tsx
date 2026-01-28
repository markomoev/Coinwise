// translation
import {useTranslation} from "react-i18next"
import { ChartNoAxesCombined, Euro, Goal } from 'lucide-react';

export default function Features() {
    const {t} = useTranslation()

    return(     
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mt-6 sm:mt-8'>
            {/* Feature 1 */}
            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-4 sm:p-6 hover:bg-white/90 hover:shadow-lg hover:border-[#3B82F6] transition-all duration-300'>
                <div className='w-12 h-12 bg-[#3B82F6] rounded-lg flex items-center justify-center mb-3 sm:mb-4'>
                    <ChartNoAxesCombined className="w-6 h-6 text-white" />
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>{t("first_feature-heading")}</h3>
                <p className='text-sm sm:text-base text-gray-600'>{t("first_feature-subheading")}</p>
            </div>
            
            {/* Feature 2 */}
            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-4 sm:p-6 hover:bg-white/90 hover:shadow-lg hover:border-[#10B981] transition-all duration-300'>
                <div className='w-12 h-12 bg-[#10B981] rounded-lg flex items-center justify-center mb-3 sm:mb-4'>
                    <Euro className="w-6 h-6 text-white" />
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>{t("second_feature-heading")}</h3>
                <p className='text-sm sm:text-base text-gray-600'>{t("second_feature-subheading")}</p>
            </div>
            
            {/* Feature 3 */}
            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-4 sm:p-6 hover:bg-white/90 hover:shadow-lg hover:border-[#F6A30F] transition-all duration-300'>
                <div className='w-12 h-12 bg-[#F6A30F] rounded-lg flex items-center justify-center mb-3 sm:mb-4'>
                    <Goal className="w-6 h-6 text-white" />
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>{t("third_feature-heading")}</h3>
                <p className='text-sm sm:text-base text-gray-600'>{t("third_feature-subheading")}</p>
            </div>
        </div>
    )
}