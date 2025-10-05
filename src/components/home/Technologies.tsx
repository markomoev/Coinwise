import reactSvg from '../../public/tech/react.png';
import tsSvg from '../../public/tech/ts.png'
import tailwindSvg from '../../public/tech/tailwind.png'
import supabaseSvg from '../../public/tech/supabase.png'
import gitSvg from '../../public/tech/git.png';
import githubSvg from '../../public/tech/github.png';

export default function Techs() {
    const technologies = [
        {
            name: 'React',
            image: reactSvg,
            description: 'Modern UI library for building interactive interfaces'
        },
        {
            name: 'TypeScript',
            image: tsSvg,
            description: 'Type-safe JavaScript for better development experience'
        },
        {
            name: 'Tailwind CSS',
            image: tailwindSvg,
            description: 'Utility-first CSS framework for rapid styling'
        },
        {
            name: 'Supabase',
            image: supabaseSvg,
            description: 'Open-source backend as a service platform'
        },
        {
            name: 'Git',
            image: gitSvg,
            description: 'Version control system for code management'
        },
        {
            name: 'GitHub',
            image: githubSvg,
            description: 'Cloud-based Git repository hosting service'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-700">Modern Technology</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Powered by industry-leading tools and frameworks for the best user experience
                </p>
            </div>

            {/* Technologies Grid */}
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl border border-gray-200 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {technologies.map((tech, index) => (
                        <div 
                            key={tech.name}
                            className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 hover:bg-white/80 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Tech Icon */}
                            <div className="flex justify-center mb-4">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <img 
                                        src={tech.image} 
                                        alt={`${tech.name} Icon`} 
                                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                    />
                                </div>
                            </div>
                            
                            {/* Tech Name */}
                            <h3 className="text-xl font-semibold text-gray-800 text-center mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                {tech.name}
                            </h3>
                            
                            {/* Tech Description */}
                            <p className="text-gray-600 text-center text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                {tech.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Info */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600 text-lg">
                        Continuously updated with the latest technologies to ensure peak performance and security
                    </p>
                </div>
            </div>

            {/* Additional Info */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">High Performance</h4>
                    <p className="text-gray-600 text-sm">Optimized for speed and efficiency</p>
                </div>
                
                <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">User-Friendly</h4>
                    <p className="text-gray-600 text-sm">Designed with user experience in mind</p>
                </div>
                
                <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Secure</h4>
                    <p className="text-gray-600 text-sm">Built with security best practices</p>
                </div>
            </div>
        </div>
    );
}