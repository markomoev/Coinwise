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
            <div className="w-full h-auto">
                <div className = 'w-full flex flex-row gap-20'>
                    <SideBar/>
                    <div className="md:mr-10 md:mt-0 mt-10 flex flex-1 flex-col gap-10 w-full h-auto items-center justify-center">
                        <div className="bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-8 rounded-2xl">
                            <p className="text-lg">Loading...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="w-full h-auto relative">
                <div className = 'w-full flex flex-row gap-20'>
                    <SideBar/>
                    <div className="md:mr-10 md:mt-0 mt-10 flex flex-1 flex-col gap-10 w-full h-auto items-center">
                        {/* Blurred cards in background */}
                        <div className="blur-sm opacity-30 pointer-events-none">
                            <div className="w-[95%] mt-10 flex flex-col gap-3 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl">
                                <div><p className='text-lg'>Total balance:</p></div>
                                <div className='w-full flex flex-row justify-between'>
                                    <div><p className='font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                    <div className='flex flex-row gap-4'>
                                        <button className="font-semibold border border-black/10 rounded-2xl px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Transfer</button>
                                        <button className="font-semibold border border-black/10 rounded-2xl px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Add funds</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='w-full flex md:flex-row flex-col md:gap-88.5 gap-10 justify-center items-center'>  
                                <div className='flex flex-col md:w-auto w-[55%] gap-8 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl'>
                                    <div><p className='text-lg'>Income:</p></div>
                                    <div className='flex flex-row gap-7'>
                                        <div><p className='font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                        <div><p className='text-lg font-semibold text-green-700'>+$0</p></div>
                                    </div>
                                </div>
                                
                                <div className='flex flex-col gap-8 md:w-auto w-[55%] bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl'>
                                    <div><p className='text-lg'>Expenses:</p></div>
                                    <div className='flex flex-row gap-7'>
                                        <div><p className='font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                        <div><p className='text-lg font-semibold text-red-700'>-$0</p></div>
                                    </div>
                                </div>
                                
                                <div className='flex flex-col md:w-auto w-[55%] gap-8 bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-6 rounded-2xl'>
                                    <div><p className='text-lg'>Savings:</p></div>
                                    <div className='flex flex-row gap-7'>
                                        <div><p className='font-bold text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent'>$0</p></div>
                                        <div><p className='text-lg font-semibold text-stone-700'>+$0</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Auth overlay bubble */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 px-4 py-20">
                            <div className="bg-white/95 border border-black/20 backdrop-blur-2xl shadow-2xl p-12 rounded-3xl text-center max-w-md w-full mx-auto my-auto">
                                <div className="mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                    Authentication Required
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Please log in to access your financial dashboard and view your balance, transactions, and savings.
                                </p>
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                        Go to Login
                                    </Link>
                                    <p className="text-sm text-gray-500">Use the sidebar to navigate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return(
        <div className="w-full h-auto">
            <div className = 'w-full flex flex-row gap-20'>
                    
                    <SideBar/>

                <div className="md:mr-10 md:mt-0 mt-10 flex flex-1 flex-col gap-10 w-full h-auto items-center">
                    {/* for everything in the dashboard */}

                        <TotalCard
                            showTransferPopup = {() => setShowTransferPopup(true)}
                            showFundsPopup = {() => setShowFundsPopup(true)}/>

                    <div className = 'w-full flex md:flex-row flex-col md:gap-88.5 gap-10 justify-center items-center'>  
                            <IncomeCard/>

                            <ExpenseCard/>

                            <SavingsCard/>
                    </div>

                    <div>
                        {/* TODO: Charts for overall stats */}
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
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <FundsPopup
                            closePopup = {() => setShowFundsPopup(false)}/>
                    </div>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto">
                        <TransferPopup
                            closeTransferPopup = {() => setShowTransferPopup(false)}/>
                    </div>
                </div>
                </>
            }

        </div>
    )
}