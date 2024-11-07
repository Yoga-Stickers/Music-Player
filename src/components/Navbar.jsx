import React, { useEffect, useState } from 'react';
import guitar from '../components/images/Guitar.svg';
import home_30 from '../components/images/Home-30.svg';
import Search from '../components/images/Search.svg';

export default function Navbar({ songs, select }) {

    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     setSearch(search)
    // }, [search])
    // console.log(search);

    return (
        <div className='bg-red-300 flex items-center justify-center lg:h-[15vh] sm:h-[12vh] lg:pr-2 lg:pl-2 sm:pl-1 sm:pr-1 w-full'>

            <div className='h-full sm:pl-1 flex items-center '>
                <img className='sm:h-14 sm:w-16 md:h-20 lg:w-24 cursor-pointer' src={guitar} alt="" />
            </div>

            <div className='w-full flex justify-end lg:gap-48 sm:gap-1  items-center'>

                <div className='flex lg:w-[45%] sm:w-[65%] relative items-center justify-end lg:h-14 sm:h-9'>
                    <div className='w-full gap-1 flex justify-center items-center lg:h-full  sm:h-[100%]'>

                        <div className='lg:h-12 sm:h-8 flex items-center justify-center lg:w-12 sm:w-9 bg-slate-800 rounded-md'>
                            <img className='lg:h-7 sm:h-5 rounded-lg cursor-pointer' src={home_30} alt="" />
                        </div>

                        <div className='w-[90%] lg:h-12 sm:h-10 lg:pr-2 sm:pr-2 justify-around flex items-center rounded-md bg-slate-800'>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                className='w-[85%] text-white rounded-md active:-none h-full placeholder:text-slate-400 lg:pl-5 sm:pl-1 font-semibold bg-slate-800 sm:placeholder:text-sm sm:font-normal ' placeholder='Search Songs here' type="text" />
                            <hr className='lg:w-8 sm:w-5 rotate-90 text-red-600' />
                            <img className='lg:w-7 sm:h-5 sm:w-5 cursor-pointer' src={Search} alt="" />

                        </div>
                    </div>
                    {search == '' ? <></> : <div className='z-10 flex flex-col gap-2 pl-3 overflow-scroll p-0 overflow-y-visible h-[375px] absolute top-[74px] rounded-md w-[750px]'>
                        {songs.filter(e => {
                            let lower = e.name.toLowerCase().startsWith(search)
                            // console.log(lower.startsWith(search) ? e.name : '');
                            return lower == true ? e : null
                        }).map((e, i) => <li key={i} onClick={(e) => select(i)} className=" p-1 max-w-[80%] list-none text-blue-300 text-xl font-semibold">{e.name}</li>)}

                    </div>}
                </div>

                <div className='lg:w-[15%] sm:w-[30%] flex flex-col lg:h-full sm:h-12 items-center rounded-md '>
                    <img src={home_30} className=' bg-none lg:p-1  object-contain object-center rounded-md lg:w-14 sm:size-9 flex sm:text-[7px] cursor-pointer justify-center items-center font-bold' />
                    <h1 className='text-white rounded-3xl sm:text-sm font-sans font-semibold'>Shravankumar</h1>
                </div>

            </div>

        </div>
    )
}

// e.name.startsWith(search) ? <li key={i} className="max-w-[80%] list-none text-slate-300 font-mono font-semibold">{e.name}</li> : <></>

// songs.filter(e => {
//     let lower = e.name.toLowerCase().startsWith(search)
//     // console.log(lower.startsWith(search) ? e.name : '');
//     return lower == true ? e.name : null
// }).map((e, i) => <li key={i} className="max-w-[80%] list-none text-slate-300 font-mono font-semibold">{e}</li>)
{/* <li key={i} className="max-w-[80%] list-none text-slate-300 font-mono font-semibold">{e.name}</li> : <><h1>Hello</h1></>; */ }