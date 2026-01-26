import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { supabase } from '../../client';

// Workaround for missing React 19 types
const Activity = (React as any).Activity;

import { Home, LayoutDashboard, PlusCircle, User, Settings, PanelRightOpen, PanelLeftClose } from "lucide-react"
import Logo from '../../assets/logo.png'

type NavItem = {
    title: string;
    path: string;
    icon: any;
    alt: string;
};

const navItems: NavItem[] = [
    { title: 'Home', path: '/home', icon: <Home />, alt: 'Home Icon' },
    { title: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard />, alt: 'Dashboard Icon' },
    { title: 'Transactions', path: '/transactions', icon: <PlusCircle />, alt: 'Transactions Icon' },
];

export default function SideBar() {
    const [open, setOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [username, setUsername] = useState('Add Profile');

    // for logged in or not logged in user
    const [isActive, setIsActive] = useState(false);

    // check active page for highlighting the main nav items
    const location = useLocation()

    // Auto-close sidebar on mobile when navigating
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const fetchUsername = async () => {
            const { data, error } = await supabase.auth.getSession()

            if (data?.session?.user?.user_metadata?.username) {
                setUsername(data.session?.user.user_metadata.username);
                // if user is logged in, don't let them access login page
                setIsActive(true);
            }
            if (error) {
                console.error('Error fetching username:', error);
            }
        }

        fetchUsername();
    }, []);

    // Handle escape key press to close sidebar on mobile
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener('keydown', handleKeyPress);
            // Prevent body scroll when sidebar is open on mobile
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            {/* hamburger button */}
            <button
                className="cursor-pointer fixed top-4 left-5 z-40 flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-white backdrop-blur-md shadow-xl md:hidden"
                onClick={() => setOpen(!open)}
                aria-label="Toggle sidebar"
            >
                <span className="block w-6 h-0.5 bg-black/40 mb-1"></span>
                <span className="block w-6 h-0.5 bg-black/40 mb-1"></span>
                <span className="block w-6 h-0.5 bg-black/40"></span>
            </button>

            {/* Desktop Spacer - Reserves space for fixed sidebar */}
            <div className={`hidden md:block flex-shrink-0 transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`} />

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 z-30 transition-all duration-300
                    bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl
                    border-r border-black/5 shadow-lg
                    text-lg font-normal h-screen overflow-y-auto
                    ${open ? "translate-x-0 w-64" : "-translate-x-full w-64"}
                    md:translate-x-0 md:bg-white/90 md:top-0
                    ${collapsed ? "md:w-20" : "md:w-64"}
                    overscroll-contain
                `}
            >
                <div className="fixed w-full flex flex-col p-3 min-h-full pb-safe items-center md:items-stretch">
                    {/* Website Name */}
                    <Link to="/home" className={`flex items-center gap-3 px-3 py-4 mb-4 md:mb-6 md:mt-0 mt-10 border-b border-gray-100 ${collapsed ? "justify-center" : ""}`}>
                        <Activity mode={collapsed ? "visible" : "hidden"}>
                            <img src={Logo} alt="Coinwise Logo" className={`object-contain transition-all duration-300 ${collapsed ? "w-10 h-10" : "w-14 h-14"}`} />
                        </Activity>
                        {!collapsed && (
                            <span className="text-3xl font-bold text-[#D633E6] whitespace-nowrap overflow-hidden transition-all duration-300">
                                Coinwise
                            </span>
                        )}
                    </Link>

                    {/* Collapse Toggle Button (Desktop Only) */}
                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className="mr-5 hidden md:flex absolute top-2 -right-4 bg-white border border-gray-100 rounded-full p-1 text-gray-400 hover:text-[#D633E6] shadow-sm z-50 hover:scale-110 transition-all"
                    >
                        {collapsed ? <PanelRightOpen size={16} className = "rotate-180"/> 
                                   : <PanelLeftClose size={16}/>}
                    </button>

                    {/* Main Navigation */}
                    <nav className="flex flex-col gap-2 flex-shrink-0 w-full">
                        {navItems.map((item) => {
                            const isCurrentPage = location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    title={collapsed ? item.title : ""}
                                    className={`${isCurrentPage ? 'text-[#D633E6]' : 'text-gray-600'} group flex items-center gap-4 p-2 md:p-3 rounded-lg transition-all duration-200
                                             hover:text-[#D633E6]
                                             ${collapsed ? "justify-center" : ""}`}
                                >
                                    <div className="w-8 h-8 md:w-11 md:h-11 flex items-center justify-center flex-shrink-0">
                                        <div className={`mt-2 w-6 h-6 md:w-8 md:h-8 transition-transform duration-200 group-hover:scale-110 ${isCurrentPage ? 'text-[#D633E6]' : 'text-gray-500'} group-hover:text-[#D633E6]`}>
                                            {item.icon}
                                        </div>
                                    </div>
                                    {!collapsed && (
                                        <span className={`text-lg md:text-xl font-medium group-hover:text-[#D633E6] transition-colors duration-200 whitespace-nowrap overflow-hidden ${isCurrentPage ? 'text-[#D633E6]' : 'text-gray-600'}`}>
                                            {item.title}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="flex flex-col gap-2 pt-4 mt-auto border-t border-gray-100 flex-shrink-0 pb-4 w-full">
                        <Link
                            to="/login"
                            title={collapsed ? username : ""}
                            className={`${isActive ? 'pointer-events-none' : ''} ${location.pathname === '/login' ? 'text-[#D633E6]' : 'text-gray-600'} group flex items-center gap-4 p-2 md:p-3 rounded-lg transition-all duration-200
                                     hover:text-[#D633E6]
                                     ${collapsed ? "justify-center" : ""}`}
                        >
                            <div className="mt-2 w-8 h-8 md:w-11 md:h-11 flex items-center justify-center flex-shrink-0">
                                <div className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-200 group-hover:scale-110 group-hover:text-[#D633E6] ${location.pathname === '/login' ? 'text-[#D633E6]' : 'text-gray-500'}`}>
                                    <User />
                                </div>
                            </div>
                            {!collapsed && (
                                <span className="text-lg md:text-xl text-[#D633E6] font-medium whitespace-nowrap overflow-hidden">
                                    {username}
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/settings"
                            title={collapsed ? "Settings" : ""}
                            className={`${!isActive ? 'pointer-events-none' : ''} ${location.pathname === '/settings' ? 'text-[#D633E6]' : 'text-gray-600'} group flex items-center gap-4 p-2 md:p-3 rounded-lg transition-all duration-200
                                     hover:text-[#D633E6]
                                     ${collapsed ? "justify-center" : ""}`}
                        >
                            <div className="mt-2 w-8 h-8 md:w-11 md:h-11 flex items-center justify-center flex-shrink-0">
                                <div className={`w-6 h-6 md:w-8 md:h-8 transition-transform duration-200 group-hover:scale-110 group-hover:text-[#D633E6] ${location.pathname === '/settings' ? 'text-[#D633E6]' : 'text-gray-500'}`}>
                                    <Settings />
                                </div>
                            </div>
                            {!collapsed && (
                                <span className={`text-lg md:text-xl font-medium group-hover:text-[#D633E6] whitespace-nowrap overflow-hidden ${location.pathname === '/settings' ? 'text-[#D633E6]' : 'text-gray-600'}`}>
                                    Settings
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 md:hidden"
                    onClick={() => setOpen(false)}
                    aria-label="Close sidebar overlay"
                />
            )}
        </>
    );
}