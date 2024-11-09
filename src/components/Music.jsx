import React, { useState, useRef, useEffect } from 'react';
import Previous from '../components/images/Previous.svg';
import Pause from '../components/images/Pause.svg';
import Play2 from '../components/images/Play2.svg';
import Next from '../components/images/Next.svg';
import Shuffle from '../components/images/Shuffle.svg';
import Restart from '../components/images/Restart.svg';


export default function Music({ songs, selected }) {
    const audioRef = useRef();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currMusic, setCurrMusic] = useState(selected);
    const [volume, setVolume] = useState(1);


    useEffect(() => {
        setCurrMusic(selected)
    }, [selected])

    const playMusic = () => {
        if (songs.length > 0) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const pauseMusic = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const preMusic = () => {
        const prevMusic = currMusic === 0 ? songs.length - 1 : currMusic - 1;
        setCurrMusic(prevMusic);
        setIsPlaying(false);
        playMusic();
    };

    const nxtMusic = () => {
        const nextMusic = currMusic === songs.length - 1 ? 0 : currMusic + 1;
        setCurrMusic(nextMusic);
        setIsPlaying(false);
        playMusic();
    };

    const shuffleMusic = () => {
        const randomMusic = Math.floor(Math.random() * songs.length);
        setCurrMusic(randomMusic);
    };

    const restartMusic = () => {
        audioRef.current.currentTime = 0;
        playMusic();
    };

    const updateProgress = () => {
        setProgress(audioRef.current.currentTime);
    };

    const handleScrub = (event) => {
        const scrubTime = event.target.value;
        audioRef.current.currentTime = scrubTime;
        setProgress(scrubTime);
    };

    const onLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleVolumeChange = (event) => {
        const newVolume = event.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    useEffect(() => {
        if (songs.length > 0 && isPlaying) {
            playMusic();
        }
    }, [currMusic]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', updateProgress);
            audioRef.current.addEventListener('loadedmetadata', onLoadedMetadata);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', updateProgress);
                audioRef.current.removeEventListener('loadedmetadata', onLoadedMetadata);
            }
        };
    }, [currMusic]);

    return (
        <div className="w-full sm:h-[25%] h-[55vh] bg-black sm:fixed bottom-1 rounded-md lg:p-3 lg:pr-6 sm:p-1 sm:pr-2 pl-6 sm:pl-2 ">
            {songs.length > 0 ? (
                <div className='flex flex-col gap-5 sm:gap-1  justify-evenly sm:pb-1'>
                    <h2 className="text-xl sm:text-sm text-center font-semibold text-gray-300 lg:mt-3 sm:mt-0">{songs[currMusic].name}</h2>
                    <audio ref={audioRef} src={songs[currMusic].url} />
                    <div className='flex items-center justify-evenly w-full'>

                        <div className="flex w-[48%] flex-col sm:h-28 items-center ">

                            <div className='flex w-full items-center justify-center '>
                                <button onMouseEnter={preMusic} className="lg:px-4 lg:py-2 sm:py-0 sm:px-0 ">
                                    <img className="lg:h-16 sm:h-12 rounded-lg transition-all lg:-rotate-45 hover:rotate-0 duration-500" src={Previous} alt="Previous" />
                                </button>

                                {isPlaying ? (
                                    <button onClick={pauseMusic} className="px-4 py-2 ">
                                        <img className="h-20 sm:h-14 lg:hover:h-24 rounded-lg transition-all duration-500" src={Pause} alt="Pause" />
                                    </button>
                                ) : (
                                    <button onClick={playMusic} className="px-4 py-2 ">
                                        <img className="h-20 sm:h-14 lg:hover:h-24 rounded-lg transition-all duration-500" src={Play2} alt="Play" />
                                    </button>
                                )}

                                <button onMouseEnter={nxtMusic} className="px-4 py-2 sm:py-0 sm:px-0 ">
                                    <img className="h-16 sm:h-12 rounded-lg transition-all lg:rotate-45 hover:rotate-0 duration-500" src={Next} alt="Next" />
                                </button>
                            </div>

                            <div className=" flex text-center flex-col w-72 sm:w-36 items-center">
                                <label className="text-md font-semibold font-mono text-white mb-1">Volume: {Math.floor(volume * 100)}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-[1px] lg:hover:h-6 lg:hover:p-1 lg:hover:bg-slate-200 duration-700 p-0 bg-white rounded-[50px] appearance-none cursor-pointer"
                                    style={{ appearance: 'none', outline: 'none' }}
                                />

                            </div>

                        </div>


                        <div className='flex flex-col w-[48%] sm:h-28 items-center '>
                            <div className="flex items-center space-x-2 sm:space-x-0 mt-4 sm:mt-0">
                                <button onClick={shuffleMusic} className="px-4 py-2">
                                    <img className="h-14 lg:hover:h-16 sm:h-12 rounded-lg lg:hover:-rotate-180 transition-all duration-500" src={Shuffle} alt="Shuffle" />
                                </button>

                                <button onClick={restartMusic} className="px-4 py-2">
                                    <img className="h-14 lg:hover:h-16 sm:h-12 rounded-lg transition-all lg:hover:rotate-180 duration-500" src={Restart} alt="Restart" />
                                </button>
                            </div>
                            <div className="mt-4 sm:mt-0 ">
                                <input
                                    type="range"
                                    value={progress}
                                    max={duration}
                                    onChange={handleScrub}
                                    className="w-96 lg:hover:w-[500px] sm:w-36 h-1 lg:hover:h-6 lg:hover:p-1 duration-700 bg-slate-900 hover:bg-slate-600 rounded-[50px] appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-stone-200 font-mono mt-1">
                                    <span>{Math.floor(progress)} sec</span>
                                    <span>{Math.floor(duration)} sec</span>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            ) : (
                <div className='flex flex-col items-center  -orange-600'>
                    <h2 className="text-md font-semibold text-2xl text-slate-950 sm:h-[1%] h-[20%] ">Music Player</h2>
                    <div className='flex items-center justify-center sm:flex-col w-full sm:h-[50%] h-[80%]'>
                        <h1 className='text-white sm:text-lg text-[54px]'>Add Songs to Listen</h1>
                        <div className='text-[90px] sm:text-[40px]'>👨🏻‍🎤</div>
                    </div>
                </div>
            )}
        </div>
    );
}
