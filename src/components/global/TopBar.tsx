import { Link } from "react-router-dom";
import SettingsIcon from '../../public/sidebar/settings.png'
export default function TopBar(){
    return (
        <div className = 'flex font-bold w-[60%] mt-2 shadow-xl border border-black/10 rounded-2xl'>
                {/* Heading */}
                <div className = 'w-full flex flex-row items-center pt-1 pb-1'> 
                    <div className="order-1">
                        <Link   to={'/home'} 
                                className=" pl-7 text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Coinwise
                        </Link>
                    </div>
                

                    <div className="order-last ml-auto mr-7">
                        {/* Settings */}
                    <div className="w-fit rounded-xl cursor-pointer hover:text-neutral-200 hover:bg-black/10">
                            <Link to={'/settings'} className="flex items-center gap-2 cursor-pointer pt-2 pl-2 pr-2">
                                <img  src = {SettingsIcon} alt="Settings Icon" className ='mb-2 w-8 h-8 md:w-10 md:h-10'/>
                            </Link>
                    </div>
                    </div>
                </div>
        </div>
    );
}