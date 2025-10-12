import SideBar from "../../components/global/SideBar"
import AccountSettings from '../../components/settings/AccountSettings'
import SettingsMenu from '../../components/settings/SettingsMenu'
import { useState } from 'react'

export default function SettingsPage(){
    const [activeSection, setActiveSection] = useState('account')

    const renderActiveSection = () => {
        switch(activeSection) {
            case 'account':
                return <AccountSettings/>
            case 'support':
                return (
                    <div className="w-full max-w-2xl bg-white/90 border border-black/10 backdrop-blur-xl shadow-lg p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-purple-700">Support</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>Need help? We're here to assist you!</p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Contact Information</h3>
                                <p>Email: support@coinwise.app</p>
                                <p>Phone: +1 (555) 123-4567</p>
                            </div>
                        </div>
                    </div>
                )
            case 'terms':
                return (
                    <div className="w-full max-w-2xl bg-white/90 border border-black/10 backdrop-blur-xl shadow-lg p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-purple-700">Terms and Policies</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Privacy Policy</h3>
                                <p>Your privacy is important to us. We collect and use your data responsibly.</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-2">Terms of Service</h3>
                                <p>By using Coinwise, you agree to our terms and conditions.</p>
                            </div>
                        </div>
                    </div>
                )
            default:
                return <AccountSettings/>
        }
    }

    return(
        <div className="w-full h-auto">
            <div className="w-full flex flex-row gap-20">
                <SideBar/>
                
                <div className="md:mr-10 md:mt-0 mt-10 flex flex-1 flex-col gap-10 w-full h-auto items-center justify-center">

                    {/* Settings Content */}
                    <div className="w-[95%] max-w-6xl flex md:flex-row flex-col gap-6">
                        {/* Settings Menu */}
                        <div className="md:w-1/4 w-full">
                            <div className="bg-white/90 border border-black/10 backdrop-blur-xl shadow-lg p-6 rounded-2xl">
                                <SettingsMenu 
                                    activeSection={activeSection}
                                    setActiveSection={setActiveSection}
                                />
                            </div>
                        </div>

                        {/* Settings Content */}
                        <div className="md:w-3/4 w-full flex justify-center">
                            {renderActiveSection()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}