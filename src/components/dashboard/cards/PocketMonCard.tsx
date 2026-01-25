import {usePocketMoney} from '../hooks/pocketMon'
import {useState, useEffect} from 'react'

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
    <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
                <div>
                    <h3 className="font-semibold text-amber-700">Pocket Money</h3>
                    <p className="text-xs text-gray-600">Available spending</p>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
            <div>
                <p className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    €{pocketMoney.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-gray-500">Available funds</p>
            </div>
            
            <div className="flex items-center gap-2">
                    <div>
                        <p className="text-sm font-semibold text-amber-700">Money ready to use</p>
                        <p className="text-xs text-amber-600">Total - Savings = Pocket Money</p>
                    </div>
                </div>
            </div>
        </div>
)
}