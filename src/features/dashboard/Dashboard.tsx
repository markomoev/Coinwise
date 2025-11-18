import SideBar from "../../components/global/SideBar";

import TotalCard from "../../components/dashboard/cards/TotalCard";
import IncomeCard from "../../components/dashboard/cards/IncomeCard";
import ExpenseCard from "../../components/dashboard/cards/ExpenseCard";
import SavingsCard from "../../components/dashboard/cards/SavingsCard";
import PocketMonCard from "../../components/dashboard/cards/PocketMonCard";

import FundsPopup from "../../components/dashboard/FundsPopup";
import TransferPopup from "../../components/dashboard/TransferPopup";

import { useState, useEffect } from "react";
import { supabase } from "../../client";
import { Link } from "react-router-dom";
import AccTrend from "../../components/dashboard/charts/AccTrend";
import IncVSExp from "../../components/dashboard/charts/IncVSExp";
import ChartBreak from "../../components/dashboard/charts/ChartBreak";
export default function DashboardPage() {
    const [showFundsPopup, setShowFundsPopup] = useState(false);
    const [showTransferPopup, setShowTransferPopup] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error) {
                console.error('Auth error:', error.message);
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(!!user);
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="w-full min-h-screen">
                <div className='w-full flex flex-row'>
                    <SideBar/>
                    <div className="flex flex-1 flex-col items-center justify-center px-4 md:px-10 pt-20 md:pt-10 md:pl-64">
                        <div className="bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg p-6 md:p-8 rounded-2xl">
                            <p className="text-lg">Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="w-full min-h-screen relative">
                <div className='w-full flex flex-row'>
                    <SideBar/>
                    <div className="flex flex-1 flex-col px-4 md:px-10 pt-20 md:pt-10 md:pr-10 md:ml-64 relative">
                        {/* Blurred cards in background */}
                        <div className="blur-sm opacity-30 pointer-events-none space-y-6">
                            <div className="w-full bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg p-4 md:p-6 rounded-2xl">
                                <div><p className='text-lg'>Total balance:</p></div>
                                <div className='w-full flex flex-col sm:flex-row sm:justify-between gap-4'>
                                    <div><p className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                    <div className='flex flex-row gap-2 sm:gap-4'>
                                        <button className="font-semibold border border-black/10 rounded-2xl px-2 py-1 sm:px-3 text-sm bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Transfer</button>
                                        <button className="font-semibold border border-black/10 rounded-2xl px-2 py-1 sm:px-3 text-sm bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Add funds</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>  
                                <div className='flex flex-col gap-6 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg p-4 md:p-6 rounded-2xl'>
                                    <div><p className='text-lg'>Income:</p></div>
                                    <div className='flex flex-row gap-4 md:gap-7'>
                                        <div><p className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                        <div><p className='text-lg font-semibold text-green-700'>+$0</p></div>
                                    </div>
                                </div>
                                
                                <div className='flex flex-col gap-6 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg p-4 md:p-6 rounded-2xl'>
                                    <div><p className='text-lg'>Expenses:</p></div>
                                    <div className='flex flex-row gap-4 md:gap-7'>
                                        <div><p className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                        <div><p className='text-lg font-semibold text-red-700'>-$0</p></div>
                                    </div>
                                </div>
                                
                                <div className='flex flex-col gap-6 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg p-4 md:p-6 rounded-2xl'>
                                    <div><p className='text-lg'>Savings:</p></div>
                                    <div className='flex flex-row gap-4 md:gap-7'>
                                        <div><p className='font-bold text-2xl md:text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                        <div><p className='text-lg font-semibold text-stone-700'>+$0</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Auth overlay bubble */}
                        <div className="fixed inset-0 md:inset-y-0 md:left-64 md:right-0 z-40 flex items-center justify-center p-4">
                            <div className="bg-white/95 border border-black/20 backdrop-blur-2xl shadow-2xl p-6 md:p-12 rounded-3xl text-center max-w-md w-full">
                                <div className="mb-4">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold mb-3 text-purple-700">Authentication Required</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                    Please log in to access your financial dashboard and view your balance, transactions, and savings.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                        Go to Login
                                    </Link>
                                    <p className="text-xs md:text-sm text-gray-500">Use the sidebar to navigate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="w-full min-h-screen">
            <div className='w-full flex flex-row h-screen'>
                    
                    <SideBar/>

                <div className="flex flex-1 flex-col overflow-y-auto md:ml-64">
                    {/* Financial Cards Section */}
                    <div className="w-full px-4 md:px-10 pt-20 md:pt-10 pb-6 space-y-6">
                        {/* Total Balance Card */}
                        <TotalCard
                            showTransferPopup={() => setShowTransferPopup(true)}
                            showFundsPopup={() => setShowFundsPopup(true)}
                        />

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                            <IncomeCard/>
                            <ExpenseCard/>
                            <PocketMonCard/>
                            <SavingsCard/>
                        </div>

                        {/* Charts Section */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 flex-1'>
                            <div>
                                <AccTrend/>
                            </div>
                            {/* Placeholder for second chart */}
                            <div>
                                <IncVSExp/>
                            </div>
                            {/* Placeholder for third chart */}
                            <div>
                                <ChartBreak/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {showFundsPopup && (
                <>
                    {/* overlay */}
                    <div
                        className="fixed inset-0 z-40 md:bg-black/50"
                        onClick={() => setShowFundsPopup(false)}
                    />

                    {/* popup */}
                    <div className="fixed inset-0 md:inset-y-0 md:left-64 md:right-0 z-50 flex items-center justify-center md:p-4 p-0">
                        <div className="w-full max-w-md sm:max-w-lg flex items-center justify-center">
                            <FundsPopup closePopup={() => setShowFundsPopup(false)} />
                        </div>
                    </div>
                </>
            )}

            {showTransferPopup && (
                <>
                    {/* overlay */}
                    <div
                        className="fixed inset-0 z-40 md:bg-black/50"
                        onClick={() => setShowTransferPopup(false)}
                    />

                    {/* popup */}
                    <div className="fixed inset-0 md:inset-y-0 md:left-64 md:right-0 z-50 flex items-center justify-center md:p-4 p-0">
                        <div className="w-full max-w-md sm:max-w-lg flex items-center justify-center">
                            <TransferPopup closeTransferPopup={() => setShowTransferPopup(false)} />
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}