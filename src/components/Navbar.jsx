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
        <div className='bg-black flex items-center justify-between lg:h-[15vh] lg:pr-2 lg:pl-2 sm:pl-1 sm:pr-1 w-full h-[20vh]'>

            <div className='h-full flex items-center '>
                <img className='sm:h-12 md:h-20 lg:w-24 cursor-pointer' src={guitar} alt="" />
            </div>

            <div className='w-full flex justify-end lg:gap-48 items-center'>

                <div className='flex w-[45%] relative items-center justify-end lg:h-14 sm:h-9'>
                    <div className='w-full gap-1 flex justify-center items-center  h-full'>
                        
                        <div className='h-12 w-[15%]  flex items-center justify-center lg:w-12 sm:w-10 bg-slate-800 rounded-md'>
                            <img className='h-7 rounded-lg cursor-pointer' src={home_30} alt="" />
                        </div>

                        <div className='w-[85%] h-12 active: active:-white flex items-center rounded-md bg-slate-800'>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                className='w-[85%] rounded-md active:-none h-full placeholder:text-slate-400 lg:pl-5 sm:pl-1 font-semibold bg-slate-800  ' placeholder='What do you want to play?' type="text" />
                            <hr className='w-8 rotate-90  text-red-600' />
                            <img className='lg:w-7 cursor-pointer' src={Search} alt="" />
                        
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

                <div className='lg:w-[15%] sm:w-[25%] flex lg:h-full sm:h-10 items-center gap-1 rounded-md justify-evenly '>
                    <h1 className='text-slate-400 rounded-3xl sm:text-sm font-sans font-semibold'>Join</h1>
                    <img src='#' alt='USER' className='bg-white lg:p-3 rounded-md lg:w-24 sm:w-12 flex sm:text-[14px] cursor-pointer justify-center items-center font-bold' />
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