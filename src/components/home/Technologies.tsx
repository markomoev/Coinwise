import { 
    reactTech, 
    typeScriptTech, 
    tailwindTech, 
    supabaseTech, 
    gitTech, 
    githubTech 
} from './texts/TechText';
import { useTranslation } from 'react-i18next';

export default function Techs() {
    const { t } = useTranslation();

    return (
        <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
                    {t("tech-heading")}
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
                    {t("tech-subheading")}
                </p>
            </div>

            {/* Technologies Grid */}
            <div className="backdrop-blur-lg rounded-3x pt-4 sm:pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* React Technology */}
                    <div className="group hover:border-[#F04DFF] bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img src={reactTech.image} alt="React" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {t("tech-react-name")}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {t("tech-react-desc")}
                        </p>
                    </div>

                    {/* TypeScript Technology */}
                    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img src={typeScriptTech.image} alt="TypeScript" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {t("tech-ts-name")}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {t("tech-ts-desc")}
                        </p>
                    </div>

                    {/* Tailwind CSS Technology */}
                    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img src={tailwindTech.image} alt="Tailwind" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {t("tech-tw-name")}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {t("tech-tw-desc")}
                        </p>
                    </div>

                    {/* Supabase Technology */}
                    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img src={supabaseTech.image} alt="Supabase" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-purple-700 transition-colors duration-300">
                            {t("tech-sbase-name")}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {t("tech-sbase-desc")}
                        </p>
                    </div>

                    {/* Git Technology */}
                    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img src={gitTech.image} alt="Git" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {t("tech-git-name")}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {t("tech-git-desc")}
                        </p>
                    </div>

                    {/* GitHub Technology */}
                    <div className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img src={githubTech.image} alt="GitHub" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {t("tech-github-name")}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {t("tech-github-desc")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}