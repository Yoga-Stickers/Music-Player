import React, { useEffect, useState } from 'react';
export default function Navbar({ songs, select }) {

    const [search, setSearch] = useState('');

    // useEffect(() => {
    //     setSearch(search)
    // }, [search])
    // console.log(search);

    return (
        <div className='bg-black flex items-center justify-between p-2 pr-5 pl-5 w-full h-[10vh]'>

            <div className='w-28 h-full flex items-center'>
                <img className='h-16' src="src\components\images\Guitar.png" alt="" />
            </div>

            <div className='flex flex-col w-[35%] relative h-full items-center justify-end'>
                <div className='w-full flex items-center p-1 h-full'>
                    <div className='m-2 h-full flex items-center justify-center w-12 bg-slate-800 rounded-3xl'>
                        <img className='h-7 rounded-lg ' src="src\components\images\Home.png" alt="" />
                    </div>
                    <div className='w-[90%] active:border active:border-white flex items-center rounded-3xl bg-slate-800 h-full '>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            className='w-[83%] rounded-3xl active:border-none h-full placeholder:text-slate-400 pl-5 font-semibold bg-slate-800 ' placeholder='What do you want to play?' type="text" />
                        <hr className='w-8 rotate-90 text-red-600' />
                        <img className='w-7' src="src\components\images\Search.png" alt="" />
                    </div>
                </div>
                {search == '' ? <></> : <div className='z-10 flex flex-col gap-2 pl-3 overflow-scroll p-0 overflow-y-visible h-[375px] absolute top-[74px] rounded-md w-[750px]'>
                    {songs.filter(e => {
                        let lower = e.name.toLowerCase().startsWith(search)
                        // console.log(lower.startsWith(search) ? e.name : '');
                        return lower == true ? e : null
                    }).map((e, i) => <li key={i} onClick={(e)=> select(i)} className=" p-1 max-w-[80%] list-none text-blue-300 text-xl font-semibold">{e.name}</li>)}

                </div>}
            </div>

            <div className='w-[15%] flex h-full items-center rounded-3xl justify-evenly'>
                <h1 className='text-slate-400 rounded-3xl font-sans cursor-pointer font-semibold'>Sign up</h1>
                <h1 className='bg-white p-3 rounded-3xl w-24 flex cursor-pointer justify-center items-center font-bold'><span>Log in</span></h1>
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