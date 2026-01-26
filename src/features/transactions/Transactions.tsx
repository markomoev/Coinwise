import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../../client";

import SideBar from "../../components/global/SideBar";
import TransactionsList from "../../components/transactions/TransactionsList";
import TransactionPopup from "../../components/transactions/TransactionPopup";

type Transaction= {
  id: number;
  name: string;
  amount: number;
  type: string;
  date: string | null;
  note?: string;
  created_at: string;
};

export default function TransactionsPage() {
    const [showPopup, setShowPopup] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            
            if (error) {
                console.error('Auth error:', error.message);
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(!!user);
                // If user is authenticated, set userId
                if (user) {
                    setUserId(user.id);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    // when user make changes, refresh data
    useEffect(() => {
        if (userId && isAuthenticated) {
            fetchLastTransaction();
        }
    }, [userId, refreshTrigger, isAuthenticated]);

    // Auto-refresh
    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(() => {
                setRefreshTrigger(prev => prev + 1);
            }, 1000); // 1 second

            return () => clearInterval(interval);
        }
    }, [isAuthenticated]);

    // exporting db data about the last transaction
    const fetchLastTransaction = async () => {
        if (!userId) return;

        const { data, error } = await supabase
        .from('Transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

        if(error){
            console.error(error.message);
            return;
        }
        if(data){
            setTransactions(data);
            return;
        }
    }

    // quick loading screen (bubble)
    if (isLoading) {
        return (
            <div className="w-full h-screen">
                <div className="w-full flex flex-row h-full">
                    <SideBar/>
                    <div className="flex flex-1 items-center justify-center px-4 md:px-10 pt-20 md:pt-10 md:ml-64">
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
            <div className="flex flex-row h-screen w-full bg-gray-50">
                <SideBar/>
                <main className="flex-1 flex flex-col relative overflow-y-auto h-screen scroll-smooth">
                    {/* Immersive Top Background */}
                    <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-br from-blue-700 to-[#D633E6] rounded-b-[3rem] shadow-xl z-0 overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D633E6]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10 flex-1">
                        
                         {/* Fake Header/List for visual behind blur */}
                         <div className="flex flex-col h-full pointer-events-none opacity-50 blur-sm">
                            <div className="flex flex-col items-center mb-10">
                                <h1 className="text-white/90 font-bold text-3xl md:text-4xl tracking-tight">Transactions</h1>
                            </div>
                           
                            <div className="w-full flex-1 bg-white/20 rounded-3xl"></div>
                        </div>


                        {/* Auth overlay bubble */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                            <div className="bg-white/95 border border-black/10 backdrop-blur-2xl shadow-2xl p-8 md:p-12 rounded-3xl text-center max-w-md w-full animate-fade-in-up">
                                <div className="mb-6">
                                    <div className="w-16 h-16 bg-[#D633E6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-[#D633E6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-3 text-gray-900">
                                        Authentication Required
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        Please log in to view and manage your transaction history.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" className="cursor-pointer bg-[#D633E6] hover:bg-[#b02bc0] text-white font-semibold py-3.5 px-6 rounded-2xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                                        Go to Login
                                    </Link>
                                    <p className="text-sm text-gray-500">or sign up to get started</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-row h-screen w-full bg-gray-50">
            <SideBar/>
            
            <main className="flex-1 flex flex-col relative overflow-y-auto h-screen scroll-smooth">
                 {/* Immersive Top Background */}
                <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-br from-blue-700 to-[#D633E6] rounded-b-[3rem] shadow-xl z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D633E6]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-8 flex-1 min-h-[calc(100vh-2rem)]">
                     {/* Header */}
                     <div className="flex flex-col items-center animate-fade-in-down flex-shrink-0 text-center">
                        <h1 className="text-white/90 font-bold text-3xl md:text-4xl tracking-tight drop-shadow-md">Transactions</h1>
                        <p className="text-white/80 text-lg font-medium mt-2">Manage your financial history</p>
                    </div>

                    {/* Transaction Content */}
                    <div className="w-full flex-1 min-h-[500px]">
                        <TransactionsList 
                            AddTransaction={() => setShowPopup(true)}
                            transactions={transactions} 
                        />
                    </div>
                </div>

                {/* Overlay + Popup */}
                {showPopup && (
                    <>
                        {/* Overlay */}
                        <div
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
                            onClick={() => setShowPopup(false)}
                        />
                        {/* Popup */}
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in-up">
                            <div className="w-full max-w-md sm:max-w-lg">
                                <TransactionPopup
                                    closePopup={() => setShowPopup(false)} 
                                />
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
