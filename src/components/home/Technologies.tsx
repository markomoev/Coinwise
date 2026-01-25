import { 
    reactTech, 
    typeScriptTech, 
    tailwindTech, 
    supabaseTech, 
    gitTech, 
    githubTech 
} from './texts/TechText';

export default function Techs() {

    return (
        <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 px-2">
                    Built with <span className="text-[#F04DFF] drop-shadow-lg">Modern Technology</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-2">
                    Powered by industry-leading tools and frameworks for the best user experience
                </p>
            </div>

            {/* Technologies Grid */}
            <div className="backdrop-blur-lg rounded-3x pt-4 sm:pt-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* React Technology */}
                    <div 
                        className="group hover:border-[#F04DFF] bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    src={reactTech.image} 
                                    alt={`${reactTech.name} Icon`} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {reactTech.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {reactTech.description}
                        </p>
                    </div>

                    {/* TypeScript Technology */}
                    <div 
                        className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                        
                    >
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    src={typeScriptTech.image} 
                                    alt={`${typeScriptTech.name} Icon`} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {typeScriptTech.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {typeScriptTech.description}
                        </p>
                    </div>

                    {/* Tailwind CSS Technology */}
                    <div 
                        className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    src={tailwindTech.image} 
                                    alt={`${tailwindTech.name} Icon`} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {tailwindTech.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {tailwindTech.description}
                        </p>
                    </div>

                    {/* Supabase Technology */}
                    <div 
                        className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    src={supabaseTech.image} 
                                    alt={`${supabaseTech.name} Icon`} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-purple-700 transition-colors duration-300">
                            {supabaseTech.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {supabaseTech.description}
                        </p>
                    </div>

                    {/* Git Technology */}
                    <div 
                        className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    src={gitTech.image} 
                                    alt={`${gitTech.name} Icon`} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {gitTech.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {gitTech.description}
                        </p>
                    </div>

                    {/* GitHub Technology */}
                    <div 
                        className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-4 sm:p-6 hover:bg-white/80 hover:border-[#F04DFF] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                    >
                        <div className="flex justify-center mb-3 sm:mb-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <img 
                                    src={githubTech.image} 
                                    alt={`${githubTech.name} Icon`} 
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2 sm:mb-3 group-hover:text-[#F04DFF] transition-colors duration-300">
                            {githubTech.name}
                        </h3>
                        <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            {githubTech.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}