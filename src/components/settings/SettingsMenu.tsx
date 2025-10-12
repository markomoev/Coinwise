interface SettingsMenuProps {
    activeSection: string
    setActiveSection: (section: string) => void
}

export default function SettingsMenu({ activeSection, setActiveSection }: SettingsMenuProps) {
    const menuItems = [
        { id: 'account', label: 'Account'},
        { id: 'support', label: 'Support'},
        { id: 'terms', label: 'Terms & Policies'}
    ]

    return(
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Menu
                </h2>
            </div>

            <div className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                            activeSection === item.id
                                ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-300/50 text-purple-700 font-semibold'
                                : 'hover:bg-black/10 text-gray-700 border border-transparent'
                        }`}
                    >
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}