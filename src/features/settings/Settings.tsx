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
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Support</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>Need help? We're here to assist you!</p>
                            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold mb-3 text-gray-900">Contact Information</h3>
                                <div className="space-y-2 text-gray-600">
                                    <p className="flex items-center gap-2">
                                        <span className="font-medium text-gray-400">Email:</span> 
                                        support@coinwise.app
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <span className="font-medium text-gray-400">Phone:</span>
                                        +1 (555) 123-4567
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            case 'terms':
                return (
                    <div className="w-full max-w-2xl bg-white/90 border border-black/10 backdrop-blur-xl shadow-lg p-8 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Terms and Policies</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold mb-2 text-gray-900">Privacy Policy</h3>
                                <p className="text-gray-600 leading-relaxed">Your privacy is important to us. We collect and use your data responsibly.</p>
                            </div>
                            <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold mb-2 text-gray-900">Terms of Service</h3>
                                <p className="text-gray-600 leading-relaxed">By using Coinwise, you agree to our terms and conditions.</p>
                            </div>
                        </div>
                    </div>
                )
            default:
                return <AccountSettings/>
        }
    }

    return(
        <div className="flex flex-row h-screen w-full bg-gray-50">
            <SideBar/>
            <main className="flex-1 flex flex-col relative overflow-y-auto h-screen scroll-smooth">
                {/* Immersive Top Background */}
                <div className="absolute top-0 left-0 w-full h-[45vh] bg-gradient-to-br from-blue-700 to-[#D633E6] rounded-b-[3rem] shadow-xl z-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D633E6]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>

                <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col gap-10">
                     {/* Header */}
                     <div className="flex flex-col items-center animate-fade-in-down text-center">
                        <h1 className="text-white/90 font-bold text-3xl md:text-4xl tracking-tight drop-shadow-md">Settings</h1>
                        <p className="text-white/80 text-lg font-medium mt-2">Manage your app preferences</p>
                    </div>

                    {/* Settings Content */}
                    <div className="w-full flex md:flex-row flex-col gap-6 items-start">
                        {/* Settings Menu */}
                        <div className="md:w-1/4 w-full sticky top-6">
                            <div className="bg-white/95 border border-black/10 backdrop-blur-xl shadow-lg p-2 rounded-2xl overflow-hidden">
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
            </main>
        </div>
    )
}