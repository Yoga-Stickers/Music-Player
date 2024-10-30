import React from 'react';
import Music from './Music';

export default function Player({ songs, selected }) {
    return (
        <div className="h-full w-full p-1">
            <div className="bg-[url('./src/images/nature.png')] bg-cover bg-center flex flex-col rounded-lg items-end h-full w-full">
                <div className='h-[60vh] w-full'>


                </div>
                <Music selected={selected} songs={songs} />
            </div>
        </div>
    );
}