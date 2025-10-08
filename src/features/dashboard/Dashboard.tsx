import SideBar from "../../components/global/SideBar";

import TotalCard from "../../components/dashboard/cards/TotalCard";
import IncomeCard from "../../components/dashboard/cards/IncomeCard";
import ExpenseCard from "../../components/dashboard/cards/ExpenseCard";
import SavingsCard from "../../components/dashboard/cards/SavingsCard";

import FundsPopup from "../../components/dashboard/FundsPopup";
import TransferPopup from "../../components/dashboard/TransferPopup";

import { useState, useEffect } from "react";
import { supabase } from "../../client";
import { Link } from "react-router-dom";

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
                    <div className="flex flex-1 flex-col items-center justify-center px-4 pt-20 md:pt-10">
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
                    <div className="flex flex-1 flex-col px-4 pt-20 md:pt-10 md:pr-10">
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
                        <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
                            <div className="bg-white/95 border border-black/20 backdrop-blur-2xl shadow-2xl p-6 md:p-12 rounded-3xl text-center max-w-md w-full">
                                <div className="mb-4">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                    Authentication Required
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                                    Please log in to access your financial dashboard and view your balance, transactions, and savings.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
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
            <div className='w-full flex flex-row'>
                    
                    <SideBar/>

                <div className="flex flex-1 flex-col px-4 pt-20 md:pt-10 md:pr-10">
                    {/* Financial Cards Section */}
                    <div className="w-full space-y-6">
                        {/* Total Balance Card */}
                        <TotalCard
                            showTransferPopup={() => setShowTransferPopup(true)}
                            showFundsPopup={() => setShowFundsPopup(true)}
                        />

                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            <IncomeCard/>
                            <ExpenseCard/>
                            <SavingsCard/>
                        </div>
                    </div>

                    {/* Future Charts Section */}
                    <div className="w-full mt-6">
                        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg p-6 md:p-8 rounded-2xl text-center">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Analytics Coming Soon</h3>
                            <p className="text-sm md:text-base text-gray-600">Interactive charts and detailed financial analytics will be available here</p>
                        </div>
                    </div>
                </div>

            </div>

            {showFundsPopup &&
                <>
                {/* overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={() => setShowFundsPopup(false)} // close on outside click
                    />
                    
                {/* popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <FundsPopup
                        closePopup = {() => setShowFundsPopup(false)}/>
                </div>
                </>
            }

            {showTransferPopup &&
                <>
                {/* overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={() => setShowTransferPopup(false)} // close on outside click
                    />
                    
                {/* popup */}
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <TransferPopup
                        closeTransferPopup = {() => setShowTransferPopup(false)}/>
                </div>
                </>
            }

        </div>
    )
}