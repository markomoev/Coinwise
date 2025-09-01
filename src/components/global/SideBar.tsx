import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {supabase} from '../../client'

import HomeIcon from '../../public/home.png'
import DashIcon from '../../public/dashboard.png'
import PlusIcon from '../../public/plus.png'
import UserIcon from '../../public/user.png'
import SettingsIcon from '../../public/settings.png'

export default function SideBar() {

    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState('Add Account');

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
                className="cursor-pointer fixed top-3 left-7 z-40 flex flex-col justify-center items-center w-10 h-10 rounded-lg bg-black/30 backdrop-blur-md shadow-lg md:hidden"
                onClick={() => setOpen(!open)}
                aria-label="Toggle sidebar"
            >
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-white"></span>
            </button>

            {/* Sidebar */}
            <div
                className={`
                    fixed top-0 left-0 z-30 h-full transition-transform duration-300
                    bg-black/20 pr-3 pl-3 backdrop-blur-2xl shadow-3xl sm:rounded-2xl pt-8 pb-2
                    text-lg font-normal border-neutral-700
                    w-64
                    ${open ? "translate-x-0" : "-translate-x-full"}
                    md:static md:translate-x-0 md:w-1/9 md:ml-4 md:h-full md:top-0
                `}
            >

                <div className = 'flex flex-col gap-[42vh] mt-10 md:mt-0'>

                    <div className = ''>
                    {/* Home link */}
                    <div className="w-fit rounded-xl mb-7 pl-3 pr-3 pt-1 pb-0.5 cursor-pointer hover:text-neutral-200 hover:bg-black/25 text-white">
                        <Link to={'/home'} className="inline-flex items-center gap-2">
                            <img src={HomeIcon} alt="Home Icon" className ='mb-2 w-8 h-8 md:w-10 md:h-10'/>
                            <p>Home</p>
                        </Link>
                    </div>
                
                    {/* Dashboard Icon */}
                    <div className="w-fit rounded-xl mb-7 pl-3 pr-3 pt-1 pb-0.5 cursor-pointer hover:text-neutral-200 hover:bg-black/25 text-white">
                        <Link to={'/home'} className="inline-flex items-center gap-2">
                            <img src={DashIcon} alt="Dashboard Icon" className="mb-2 w-8 h-8 md:w-10 md:h-10" />
                            <p>Dashboard</p>
                        </Link>
                    </div>
                    
                    {/* Add expense icon */}
                    <div className="w-fit rounded-xl mb-7 pl-3 pr-3 pt-1 pb-0.5 cursor-pointer hover:text-neutral-200 hover:bg-black/25 text-white">
                        <a href="" className="inline-flex items-center gap-2">
                            <img src={PlusIcon} alt="Plus Icon" className="mb-2 w-8 h-8 md:w-10 md:h-10"/>
                            <p>Add</p>
                        </a>
                    </div>
                    </div>

                    <div className = ''>
                    {/* SignIn / SignUp */}
                    <div className="w-fit rounded-xl mb-7 pl-3 pr-3 pt-1 pb-0.5 cursor-pointer hover:text-neutral-200 hover:bg-black/25 text-white">
                        <Link to={'/login'} className="inline-flex items-center gap-2">
                            <img src={UserIcon} alt="User Icon" className ='mb-2 w-8 h-8 md:w-10 md:h-10'/>
                            <p>{username}</p>
                        </Link>
                    </div>

                    {/* Settings */}
                    <div className="w-fit rounded-xl pl-3 pr-3 pt-1 pb-0.5 cursor-pointer hover:text-neutral-200 hover:bg-black/25 text-white">
                        <Link to={'/settings'} className="inline-flex items-center gap-2 cursor-pointer">
                            <img src={SettingsIcon} alt="Settings Icon" className ='mb-2 w-8 h-8 md:w-10 md:h-10'/>
                            <p>Settings</p>
                        </Link>
                    </div>
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 z-20 bg-black/40 md:hidden"
                    onClick={() => setOpen(false)}
                    aria-label="Close sidebar overlay"
                />
            )}
        </>
    );
}