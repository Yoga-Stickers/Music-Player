import React from 'react';
import Music from './Music';
// import  Upload  from '../components/images/nature.svg';

export default function Player({ songs, selected }) {
    return (
        <div className="h-[50%] sm:h-[15%] sm:fixed sm:bottom-0 w-full">
            <div className="lg:bg-[url('./public/images/nature.svg')] sm:bg-none bg-cover bg-center flex flex-col rounded-lg items-end h-full w-full">
                {/* <div className='h-[60vh] sm:h-1 -2 w-full'>
                </div> */}
                <Music selected={selected} songs={songs} />
            </div>
        </div>
    );
}