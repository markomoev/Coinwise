import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <div className = 'text-3xl font-bold'>
            {/* Heading */}
            <div className = 'p-4 pl-17 sm:pl-4 text-white bg-white/5 backdrop-blur-lg border border-white/8 z-30'> 
                <Link to={'/home'}>Coinwise</Link>
            </div>
        </div>
    );
}