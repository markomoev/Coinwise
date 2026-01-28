import { useTranslation } from 'react-i18next';

export default function LanguageSwitch() {
    const { i18n } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Language / Език
            </label>
            <div className="flex bg-gray-50 p-1 rounded-xl w-fit border border-gray-200">
                <button
                    onClick={() => i18n.changeLanguage('en')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        i18n.language === 'en'
                            ? 'bg-white text-[#D633E6] shadow-sm ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-gray-700 cursor-pointer'
                    }`}
                >
                    English
                </button>
                <div className="w-px bg-gray-200 my-2 mx-1"></div>
                <button
                    onClick={() => i18n.changeLanguage('bg')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        i18n.language === 'bg'
                            ? 'bg-white text-[#D633E6] shadow-sm ring-1 ring-black/5'
                            : 'text-gray-500 hover:text-gray-700 cursor-pointer'
                    }`}
                >
                    Български
                </button>
            </div>
        </div>
    );
}
