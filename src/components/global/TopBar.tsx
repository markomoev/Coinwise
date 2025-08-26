import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <div className = 'text-3xl font-bold'>
            {/* Heading */}
            <div className = 'p-4 pl-17 sm:pl-4 text-white bg-black/30 z-30'> 
                <Link to={'/home'}>Coinwise</Link>
            </div>
        </div>
    );
}