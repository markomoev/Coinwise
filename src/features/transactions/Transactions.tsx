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
            <div className="w-full h-screen">
                <div className="w-full flex flex-row h-full">
                    <SideBar/>
                    <div className="flex flex-1 items-center justify-center px-4 md:px-10 pt-20 md:pt-10 relative md:ml-64">
                        {/* Blurred transaction list background */}
                        <div className="absolute inset-0 blur-sm opacity-30 pointer-events-none">
                            <TransactionsList 
                                AddTransaction={() => {}}
                                transactions={[]} 
                            />
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
                                <h2 className="text-xl md:text-2xl font-bold mb-3 text-purple-700">
                                    Authentication Required
                                </h2>
                                <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed">
                                    Please log in to view and manage your transaction history.
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

    return (
        <div className="w-full h-screen">
            <div className="w-full flex flex-row h-full">
                <SideBar/>
                
                <div className="flex flex-1 flex-col px-4 pt-20 md:pt-10 md:px-10 pb-4 h-full md:ml-64">

                    {/* Transaction Content */}
                    <div className="w-full flex-1 min-h-0">
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
                    <div className="fixed inset-x-0 top-0 bottom-0 md:left-64 md:right-0 z-50 flex items-center justify-center p-4 max-h-screen overflow-hidden">
                        <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto">
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
