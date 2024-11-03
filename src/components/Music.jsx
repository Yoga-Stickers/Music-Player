import React, { useState, useRef, useEffect } from 'react';

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
        <div className="w-full h-[55vh] rounded-lg p-3 pr-6 pl-6">
            {songs.length > 0 ? (
                <div className='flex flex-col gap-5'>
                    <h2 className="text-xl text-center font-semibold text-gray-300 mt-3">{songs[currMusic].name}</h2>
                    <audio ref={audioRef} src={songs[currMusic].url} />
                    <div className='flex items-center justify-between w-full'>

                        <div className="flex w-[50%] flex-col items-center">

                            <div className='flex w-full items-center justify-center'>
                                <button onMouseEnter={preMusic} className="px-4 py-2 rounded-md">
                                    <img className="h-16 rounded-lg transition-all -rotate-45 hover:rotate-0 duration-500" src="./public/images/Previous.png" alt="Previous" />
                                </button>

                                {isPlaying ? (
                                    <button onClick={pauseMusic} className="px-4 py-2 rounded-md">
                                        <img className="h-20 hover:h-24 rounded-lg transition-all duration-500" src="./public/images/Pause.png" alt="Pause" />
                                    </button>
                                ) : (
                                    <button onClick={playMusic} className="px-4 py-2 rounded-md">
                                        <img className="h-20 hover:h-24 rounded-lg transition-all duration-500" src="./public/images/Play2.png" alt="Play" />
                                    </button>
                                )}

                                <button onMouseEnter={nxtMusic} className="px-4 py-2 rounded-md">
                                    <img className="h-16 rounded-lg transition-all rotate-45 hover:rotate-0 duration-500" src="./public/images/Next.png" alt="Next" />
                                </button>
                            </div>

                            <div className=" flex text-center flex-col w-72 items-center">
                                <label className="text-md font-semibold font-mono text-white mb-1">Volume: {Math.floor(volume * 100)}%</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    className="w-full h-[1px] hover:h-6 hover:p-1 hover:bg-slate-200 duration-700 p-0 bg-white rounded-[50px] appearance-none cursor-pointer"
                                    style={{ appearance: 'none', outline: 'none' }}
                                />

                            </div>

                        </div>


                        <div className='flex flex-col rounded-xl w-[50%] items-center'>
                            <div className="flex rounded-xl items-center space-x-2 mt-4">
                                <button onClick={shuffleMusic} className="px-4 py-2">
                                    <img className="h-14 hover:h-16 rounded-lg hover:-rotate-180 transition-all duration-500" src="./public/images/Shuffle.png" alt="Shuffle" />
                                </button>

                                <button onClick={restartMusic} className="px-4 py-2">
                                    <img className="h-14 hover:h-16 rounded-lg transition-all hover:rotate-180 duration-500" src="./public/images/Restart.png" alt="Restart" />
                                </button>
                            </div>
                            <div className="mt-4 ">
                                <input
                                    type="range"
                                    value={progress}
                                    max={duration}
                                    onChange={handleScrub}
                                    className="w-96 hover:w-[500px] h-1 hover:h-6  hover:p-1 duration-700 bg-slate-900 hover:bg-slate-600 rounded-[50px] appearance-none cursor-pointer"
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
                <div className='flex flex-col items-center'>
                    <h2 className="text-md font-semibold text-2xl text-slate-950 h-[20%] ">Music Player</h2>
                    <div className='flex items-center justify-center w-full h-[80%]'>
                        <h1 className='text-white text-[54px]'>Add Songs to Listen</h1>
                        <div className='text-[90px]'>👨🏻‍🎤</div>
                    </div>
                </div>
            )}
        </div>
    );
}
