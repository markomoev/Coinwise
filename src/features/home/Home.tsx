import SideBar from "../../components/global/SideBar";
import Techs from "../../components/home/Technologies";

export default function HomePage(){
    return(
        <div className = 'w-full h-auto'>

          <div className = 'w-full flex flex-row gap-0'>
              <SideBar/>
            <div className='w-2/3 flex-1 flex justify-center'>
              <div className='w-full max-w-300 px-4'>
                <Techs/>
              </div>
            </div>
            </div>
        </div>
    );
}