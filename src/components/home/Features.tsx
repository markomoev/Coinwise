import AnalyticsIcon from '../../public/home/features/analytics.svg?react';
import TrackingIcon from '../../public/home/features/tracking.svg?react';
import GoalsIcon from '../../public/home/features/goals.svg?react';

export default function Features() {
    return(     
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mt-6 sm:mt-8'>
            {/* Feature 1 */}
            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-4 sm:p-6 hover:bg-white/90 hover:shadow-lg hover:border-purple-400 transition-all duration-300'>
                <div className='w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4'>
                    <AnalyticsIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Smart Analytics</h3>
                <p className='text-sm sm:text-base text-gray-600'>Get detailed insights into your spending patterns with intelligent analytics and visualizations.</p>
            </div>
            
            {/* Feature 2 */}
            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-4 sm:p-6 hover:bg-white/90 hover:shadow-lg hover:border-purple-400 transition-all duration-300'>
                <div className='w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-3 sm:mb-4'>
                    <TrackingIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Expense Tracking</h3>
                <p className='text-sm sm:text-base text-gray-600'>Easily track and categorize your expenses with our intuitive interface and smart categorization.</p>
            </div>
            
            {/* Feature 3 */}
            <div className='bg-white/70 backdrop-blur-lg rounded-xl border border-gray-200 p-4 sm:p-6 hover:bg-white/90 hover:shadow-lg hover:border-purple-400 transition-all duration-300'>
                <div className='w-12 h-12 bg-amber-400 rounded-lg flex items-center justify-center mb-3 sm:mb-4'>
                    <GoalsIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className='text-lg sm:text-xl font-semibold text-gray-800 mb-2'>Budget Goals</h3>
                <p className='text-sm sm:text-base text-gray-600'>Set and achieve your financial goals with personalized budgeting tools and progress tracking.</p>
            </div>
        </div>
    )
}