import reactSvg from '../../public/react.svg';
import tsSvg from '../../public/ts.svg'
import tailwindSvg from '../../public/tailwind.svg'
import supabaseSvg from '../../public/supabase.svg'
import gitSvg from '../../public/git.svg';
import githubSvg from '../../public/github.svg';


export default function Techs() {
    return (
        <div className="mt-10 w-full px-1 sm:px-4 md:px-8"> 

            {/* Heading */}
            <div className="w-full text-center">
                <p className="text-xl font-semibold">Technologies used for this website</p>
            </div>


            <div className="bg-white/5 backdrop-blur-lg rounded-4xl border border-white/8 p-6 flex flex-row flex-wrap justify-center items-center gap-10 sm:gap-6 md:gap-10 mt-5 h-auto ">

                {/* React Icon */}                
                <div className="flex mb-4 flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-[4vw] mt-5 h-auto py-4 sm:py-6">
                    <img src={reactSvg} alt="React Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24" />
                </div>

                {/* Typescript Icon */}
                <div className="flex mb-4 flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-[4vw] mt-5 h-auto py-4 sm:py-6">
                    <img src={tsSvg} alt="Typescript Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24" />
                </div>

                {/* TailwindCSS Icon */}
                <div className="mb-3 flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-[4vw] mt-5 h-auto py-4 sm:py-6 flex-shrink-0">
                    <img src={tailwindSvg} alt="Taiwlind Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24" />
                </div>

                {/* Supabase Icon */}
                <div className="mb-3 flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-[4vw] mt-5 h-auto py-4 sm:py-6 flex-shrink-0">
                    <img src={supabaseSvg} alt="Supabase Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24" />
                </div>

                {/* Git Icon */}
                <div className="mb-2.5 flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-[4vw] mt-5 h-auto  py-4 sm:py-6 flex-shrink-0">
                    <img src={gitSvg} alt="Git Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"/>
                </div>

                {/* Github Icon */}
                <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 md:gap-[4vw]  h-auto   sm:py-6 flex-shrink-0">
                    <img src={githubSvg} alt="GitHub Icon" className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24"/>
                </div>
            </div>
        </div>
    );
}