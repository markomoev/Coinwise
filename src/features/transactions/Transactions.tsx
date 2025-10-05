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
            <div className="relative w-full h-screen overflow-hidden">
                <div className="h-full">
                    <div className="w-full h-[calc(100%-4rem)] flex flex-row gap-10 md:pr-7">
                        <SideBar/>
                        <div className="md:w-[88%] w-full md:mt-8 mt-30 flex justify-center items-center">
                            <div className="bg-white border border-black/10 bg-opacity-90 backdrop-blur-xl shadow-lg shadow-stone p-8 rounded-2xl">
                                <p className="text-lg">Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="relative w-full h-screen overflow-hidden">
                <div className="h-full">
                    <div className="w-full h-[calc(100%-4rem)] flex flex-row gap-10 md:pr-7">
                        <SideBar/>
                        <div className="md:w-[88%] w-full md:mt-8 mt-30 flex justify-center items-center relative">
                            {/* Blurred transaction list background */}
                            <div className="absolute inset-0 blur-sm opacity-30 pointer-events-none">
                                <TransactionsList 
                                    AddTransaction={() => {}}
                                    transactions={[]} 
                                />
                            </div>
                            
                            {/* Auth overlay bubble */}
                            <div className="relative z-10">
                                <div className="bg-white/95 border border-black/20 backdrop-blur-2xl shadow-2xl p-12 rounded-3xl text-center max-w-md w-full mx-auto">
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
                                        Please log in to view and manage your transaction history.
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
            </div>
        );
    }

    return (
        <div className="w-full h-auto">
            <div className="w-full flex flex-row gap-20">
                <SideBar/>
                
                <div className="md:mr-10 md:mt-0 mt-10 flex flex-1 flex-col gap-10 w-full h-auto items-center">
                    {/* Transactions Header */}
                    <div className="w-[95%] max-w-6xl">
                        <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg p-6 rounded-2xl">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                        Transaction History
                                    </h1>
                                    <p className="text-gray-600 mt-1">Track and manage all your financial transactions</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Content */}
                    <div className="w-[95%] max-w-6xl">
                        <TransactionsList 
                            AddTransaction={() => setShowPopup(true)}
                            transactions={transactions} 
                        />
                    </div>
                </div>
            </div>

            {/* Overlay + Popup */}
            {showPopup && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50"
                        onClick={() => setShowPopup(false)}
                    />
                    {/* Popup */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                        <div className="pointer-events-auto">
                            <TransactionPopup
                                closePopup={() => setShowPopup(false)} 
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
