import { Link } from "react-router-dom";
export default function TopBar(){
    
    return (
        <div className = 'flex font-bold w-[97.3%] mt-2 shadow-lg border border-black/10 rounded-2xl'>
                {/* Heading */}
                <div className = 'w-full flex flex-row items-center pt-3 pb-3'> 
                    <div className="order-1">
                        <Link   to={'/home'} 
                                className="md:pl-6 pl-17 text-3xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Coinwise
                        </Link>
                    </div>
                </div>
        </div>
    );
}