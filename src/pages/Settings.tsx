import TopBar from "../components/global/TopBar"
import SettingsMenu from "../components/settings/SettingsMenu"
import AccountSettings from '../components/settings/AccountSettings'

export default function SettingsPage(){
    return(
        <div className = 'w-full flex flex-col'>
            <div className = 'w-full flex items-center justify-center'>
                <TopBar/>
            </div>
            <div>
                <div className = 'w-full h-auto flex flex-row items-center justify-center mt-20 gap-15'>
                    <SettingsMenu/>
                    <AccountSettings/>
                </div>
            </div>
        </div>
    )
}