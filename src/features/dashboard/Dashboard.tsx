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
                    <div className="flex flex-1 flex-col px-4 sm:px-6 lg:px-8 pt-24 md:pt-12 md:ml-64 relative bg-gray-50/50">
                        {/* Blurred cards in background */}
                        <div className="blur-sm opacity-40 pointer-events-none space-y-8 max-w-7xl mx-auto w-full">
                            <div className="flex flex-col gap-1">
                                <div className="h-8 w-32 bg-gray-300 rounded-lg"></div>
                                <div className="h-5 w-48 bg-gray-200 rounded-lg"></div>
                            </div>

                            <div className="w-full bg-white border border-black/5 bg-opacity-90 backdrop-blur-xl shadow-lg p-6 rounded-2xl h-48">
                                {/* Total Card Placeholder */}
                            </div>
                            
                            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>  
                                <div className='flex flex-col gap-6'>
                                     <div className="bg-white border border-black/5 shadow-lg p-6 rounded-2xl h-32"></div>
                                     <div className="bg-white border border-black/5 shadow-lg p-6 rounded-2xl h-32"></div>
                                </div>
                                <div className='flex flex-col gap-6'>
                                     <div className="bg-white border border-black/5 shadow-lg p-6 rounded-2xl h-32"></div>
                                     <div className="bg-white border border-black/5 shadow-lg p-6 rounded-2xl h-32"></div>
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
        <div className="w-full min-h-screen bg-gray-50 flex flex-row">
            <SideBar/>

            <main className="flex-1 flex flex-col md:ml-64 relative overflow-y-auto h-screen scroll-smooth">
                {/* Immersive Top Background */}
                <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 rounded-b-[3rem] shadow-xl z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
                    
                    {/* Header & Total Balance Section */}
                    <div className="flex flex-col items-center animate-fade-in-down">
                        <h1 className="text-white/80 font-medium text-lg mb-6 tracking-wide">Good funds, have fun</h1>
                        
                        <div className="w-full max-w-md transform hover:scale-105 transition-transform duration-500">
                             <TotalCard
                                showTransferPopup={() => setShowTransferPopup(true)}
                                showFundsPopup={() => setShowFundsPopup(true)}
                            />
                        </div>
                    </div>

                    {/* Stats Row - Floating Cards */}
                    <div className="flex flex-row overflow-x-auto gap-4 -mt-4 pb-4 -mx-6 px-6 snap-x snap-mandatory no-scrollbar">
                        <div className="min-w-[85vw] sm:min-w-[280px] flex-none snap-center transform hover:-translate-y-1 transition-transform duration-300">
                            <PocketMonCard/>
                        </div>
                        <div className="min-w-[85vw] sm:min-w-[280px] flex-none snap-center transform hover:-translate-y-1 transition-transform duration-300">
                            <SavingsCard/>
                        </div>
                        <div className="min-w-[85vw] sm:min-w-[280px] flex-none snap-center transform hover:-translate-y-1 transition-transform duration-300">
                            <IncomeCard/>
                        </div>
                        <div className="min-w-[85vw] sm:min-w-[280px] flex-none snap-center transform hover:-translate-y-1 transition-transform duration-300">
                            <ExpenseCard/>
                        </div>
                    </div>

                    {/* Charts Section - Clean & Minimal */}
                    <div className="space-y-6 pb-12">
                        <h3 className="text-gray-800 font-bold text-xl px-2">Financial Insights</h3>
                        
                        <div className="flex flex-row overflow-x-auto gap-6 -mx-6 px-6 pb-6 snap-x snap-mandatory no-scrollbar">
                            <div className="min-w-[90vw] md:min-w-[600px] flex-none snap-center p-6 rounded-3xl transition-shadow duration-300">
                                <AccTrend/>
                            </div>
                            <div className="min-w-[90vw] md:min-w-[600px] flex-none snap-center p-6 rounded-3xl transition-shadow duration-300">
                                <IncVSExp/>
                            </div>
                            <div className="min-w-[90vw] md:min-w-[600px] flex-none snap-center p-6 transition-shadow duration-300">
                                <ChartBreak/>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

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