import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {supabase} from '../../client'

import HomeIcon from '../../public/sidebar/home.png'
import DashIcon from '../../public/sidebar/dashboard.png'
import PlusIcon from '../../public/sidebar/plus.png'
import UserIcon from '../../public/sidebar/user.png'
import SettingsIcon from '../../public/sidebar/settings.png'
import StatsIcon from '../../public/sidebar/stats.png'

type NavItem = {
    title: string;
    path: string;
    icon: string;
    alt: string;
};

const navItems: NavItem[] = [
    { title: 'Home', path: '/home', icon: HomeIcon, alt: 'Home Icon' },
    { title: 'Dashboard', path: '/dashboard', icon: DashIcon, alt: 'Dashboard Icon' },
    { title: 'Transactions', path: '/transactions', icon: PlusIcon, alt: 'Plus Icon' },
    { title: 'Statistics', path: '/statistics', icon: StatsIcon , alt: 'Statistics Icon' }
];

export default function SideBar() {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('Add Profile');

    useEffect(() => {
        const fetchUsername = async () => {
            const { data, error } = await supabase.auth.getSession()

            if(data?.session?.user?.user_metadata?.username){
                setUsername(data.session?.user.user_metadata.username);
            }
            if(error){
                console.error('Error fetching username:', error);
            }
        }

        fetchUsername();
    }, []); // Add empty dependency array

    return (
        <>
            {/* Hamburger button */}
            <button
                className="cursor-pointer fixed top-4 left-5 z-40 flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-white backdrop-blur-md shadow-xl md:hidden"
                onClick={() => setOpen(!open)}
                aria-label="Toggle sidebar"
            >
                <span className="block w-6 h-0.5 bg-black/40 mb-1"></span>
                <span className="block w-6 h-0.5 bg-black/40 mb-1"></span>
                <span className="block w-6 h-0.5 bg-black/40"></span>
            </button>

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 z-30 transition-all duration-300
                    bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl
                    border-r border-black/5 shadow-lg
                    text-lg font-normal w-64 min-h-screen max-h-screen overflow-y-auto
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:static md:translate-x-0 md:w-fit md:min-h-screen md:max-h-screen
                    md:border-r md:bg-white/90
                `}
            >
                <div className="w-full flex flex-col p-3 min-h-full">
                    {/* Website Name */}
                    <Link to="/home" className="flex items-center gap-3 px-3 py-4 mb-6 md:mt-0 mt-10 border-b border-gray-100">
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Coinwise
                        </span>
                    </Link>

                    {/* Main Navigation */}
                    <nav className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="group flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                                         hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10"
                            >
                                <div className="w-11 h-11 flex items-center justify-center">
                                    {item.icon && <img src={item.icon} alt={item.alt} className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" />}
                                </div>
                                <span className="text-xl text-gray-600 font-medium group-hover:text-gray-800 transition-colors duration-200">
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </nav>

                    {/* Spacer to push the user section to bottom */}
                    <div className="flex-grow"></div>

                    {/* User Section */}
                    <div className="flex flex-col gap-2 pt-6 mt-2 border-t border-gray-100">
                        <Link 
                            to="/login"
                            className="group flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                                     hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10"
                        >
                            <div className="w-11 h-11 flex items-center justify-center">
                                <img src={UserIcon} alt="User Icon" className="w-8 h-8 opacity-90 bg-clip-text transition-transform duration-200 group-hover:scale-110" />
                            </div>
                            <span className="text-xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent font-medium">
                                {username}
                            </span>
                        </Link>
                        
                        <Link 
                            to="/settings"
                            className="group flex items-center gap-4 p-3 rounded-lg transition-all duration-200
                                     hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10"
                        >
                            <div className="w-11 h-11 flex items-center justify-center">
                                <img src={SettingsIcon} alt="Settings Icon" className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" />
                            </div>
                            <span className="text-xl text-gray-600 font-medium group-hover:text-gray-800">
                                Settings
                            </span>
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