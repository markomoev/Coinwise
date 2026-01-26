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
                <h2 className="text-xl font-bold text-gray-900">
                    Menu
                </h2>
            </div>

            <div className="space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left font-medium ${
                            activeSection === item.id
                                ? 'bg-[#D633E6]/10 text-[#D633E6]'
                                : 'hover:bg-gray-50 text-gray-500'
                        }`}
                    >
                        <span>{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}