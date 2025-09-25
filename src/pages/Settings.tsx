import SideBar from "../components/global/SideBar"
import AccountSettings from '../components/settings/AccountSettings'

export default function SettingsPage(){
    return(
        <div className = 'w-full flex flex-row'>
                <SideBar/>
            <div className ='w-[87%] h-full flex items-center justify-center'>
                    <AccountSettings/>
            </div>
        </div>
    )
}