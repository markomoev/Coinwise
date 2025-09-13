import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {supabase} from '../../client'

import HomeIcon from '../../public/sidebar/home.png'
import DashIcon from '../../public/sidebar/dashboard.png'
import PlusIcon from '../../public/sidebar/plus.png'
import UserIcon from '../../public/sidebar/user.png'
import SettingsIcon from '../../public/sidebar/settings.png'

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
                alert('Error in fetching data!');
            }
        }

        fetchUsername();
    })

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
                    fixed top-0 left-0 z-30 h-full transition-transform duration-300
                    bg-white/88 pr-3 pl-3 backdrop-blur-2xl shadow-3xl sm:rounded-2xl pt-8 pb-2
                    text-lg font-normal border-white-700
                    w-64
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:static md:translate-x-0 md:w-fit md:ml-4 md:h-full md:top-0
                `}
            >

                <div className = 'w-full flex flex-col md:gap-85 gap-75 mt-10 md:mt-0 md:border md:border-black/10 md:bg-black/2 rounded-2xl md:shadow-2xl pt-5 pb-5'>

                    <div className = 'ml-3 mr-3 flex flex-col gap-10'>
                    {/* Home link */}
                    <div className="w-fit rounded-xl cursor-pointer hover:text-neutral-200 hover:bg-black/10 pr-3 pt-1 pl-2">
                        <Link to={'/home'} className="inline-flex items-center gap-2">
                            <img src={HomeIcon} alt="Home Icon" className ='mb-2 w-8 h-8 md:w-10 md:h-10'/>
                            <p className = 'text-gray-600 font-semibold pb-1.5'>Home</p>
                        </Link>
                    </div>
                
                    {/* Dashboard Icon */}
                    <div className="w-fit rounded-xl cursor-pointer hover:text-neutral-200 hover:bg-black/10 pr-3 pt-1 pl-2">
                        <Link to={'/dashboard'} className="inline-flex items-center gap-2">
                            <img src={DashIcon} alt="Dashboard Icon" className="mb-2 w-8 h-8 md:w-10 md:h-10" />
                            <p className = 'text-gray-600 font-semibold pb-1.5'>Dashboard</p>
                        </Link>
                    </div>
                    
                    {/* Add expense icon */}
                    <div className="w-fit rounded-xl cursor-pointer hover:text-neutral-200 hover:bg-black/10 pr-3 pt-1 pl-2">
                        <a href="" className="inline-flex items-center gap-2">
                            <img src={PlusIcon} alt="Plus Icon" className="mb-2 w-8 h-8 md:w-10 md:h-10"/>
                            <p className = 'text-gray-600 font-semibold pb-1.5'>Transactions</p>
                        </a>
                    </div>
                    </div>

                    <div className = 'ml-3 mr-3 flex flex-col gap-10'>
                    {/* SignIn / SignUp */}
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 w-fit rounded-xl cursor-pointer pr-5 pt-1">
                        <Link to={'/login'} className="pl-2 inline-flex items-center gap-2">
                            <img src={UserIcon} alt="User Icon" className ='text-transparent mb-2 w-8 h-8 md:w-10 md:h-10'/>
                            <p className ='text-white font-semibold pb-1'>{username}</p>
                        </Link>
                    </div>
                    
                    {/* Settings  !!!TODO!!! - PUT RIGHT PADDING ON THE BUTTON*/}  
                    <div className="w-fit rounded-xl cursor-pointer hover:text-neutral-200 hover:bg-black/10">
                            <Link to={'/settings'} className="flex items-center gap-2 cursor-pointer pt-2 pl-2 pr-2">
                                <img  src = {SettingsIcon} alt="Settings Icon" className ='mb-2 w-8 h-8 md:w-10 md:h-10'/>
                                <p className = 'text-gray-600 font-semibold pb-1'>Settings</p>
                            </Link>
                    </div>
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