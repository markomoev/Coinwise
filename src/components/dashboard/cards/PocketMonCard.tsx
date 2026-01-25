import {usePocketMoney} from '../hooks/pocketMon'
import {useState, useEffect} from 'react'

import { Coins } from 'lucide-react';

export default function PocketMonCard(){
    const [pocketMoney, setPocketMoney] = useState<any>(0)
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // fetchin the pocketMoney
    useEffect(()=>{
        usePocketMoney().then(result => setPocketMoney(result))
    }, [refreshTrigger])

    // auto-refresh
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTrigger(prev => prev + 1);
        }, 1000); // 1 second

        return () => clearInterval(interval);
    }, []);

return(
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-full hover:shadow-md transition-all duration-300">
        <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                <Coins/>
            </div>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Pocket</span>
        </div>
        
        <div>
            <p className="text-2xl font-bold text-gray-900 mt-2">
                €{pocketMoney.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-amber-600 font-medium mt-1">
                Ready to spend
            </p>
        </div>
    </div>
)
}