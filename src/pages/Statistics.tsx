import TopBar from "../components/global/TopBar"
import SideBar from "../components/global/SideBar"

export default function StatsPage () {
    return (
        <div className ='w-full h-auto'>
            <div className="w-full flex items-center justify-center">
                <TopBar/>
            </div>

            <div className = 'w-full flex flex-row gap-20 mt-5'>
                <div>
                    <SideBar/>
                </div>
            </div>
        </div>
    )
}