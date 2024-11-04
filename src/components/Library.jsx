import React from 'react';
import  Song  from '../components/images/Song.svg';
import  Upload  from '../components/images/Upload.svg';
  import  Delete  from '../components/images/Delete.svg';

export default function Library({ songs, setSongs, select }) {
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    // Update the songs state and local storage
    setSongs(prevSongs => {
      const updatedSongs = [...prevSongs, ...fileData];
      // localStorage.setItem('songs', JSON.stringify(updatedSongs)); // Save to local storage
      return updatedSongs;
    });
  };

  const clearSongs = () => {
    setSongs([]); // Clear the songs in state
    localStorage.removeItem('songs'); // Clear from local storage
  };

  return (
    <div className='w-[25vw] h-full overflow-y-scroll rounded-lg p-1 bg-slate-950'>
      <div className='w-full h-[10%] text-lg text-slate-300 justify-between font-semibold flex items-center pl-3 pr-3 rounded-md'>
        <div className='flex gap-3'>
          <img className='h-7 rounded-lg' src={Song} alt="" />
          <h1>Your Songs</h1>
        </div>

        <div className='flex items-center gap-2' >
          <div>
            <input
              type="file"
              accept="audio/*"
              multiple
              onChange={handleFileUpload}
              id='inpuu'
              className="hidden"
            />
            <label htmlFor="inpuu">
              <img className='h-10 rounded-lg' src={Upload} alt="" />
            </label>
          </div>
          <button
            onClick={clearSongs}
            className="rounded hover:bg-red-300"
          >
            <img className='h-10 rounded-lg' src={Delete} alt="" />
          </button>
        </div>
      </div>

      <div className="mt-4 px-1">
        <ul className="mt-2 flex flex-col gap-2 text-slate-300">
          {songs.map((song, index) => (
            <li key={index} onClick={() => select(index)} className="cursor-pointer hover:scale-2 hover:bg-slate-800 hover:text-black duration-300 px-1 rounded-sm  py-1 text-md flex justify-between items-center">
              <span className="truncate max-w-[80%]">{song.name}</span> {/* Show the actual file name */}
              <button
                onClick={() => {
                  const newSongs = songs.filter((_, i) => i !== index);
                  setSongs(newSongs);
                  localStorage.setItem('songs', JSON.stringify(newSongs)); // Update local storage
                }}
                className="text-red-500 hover:font-extrabold text-md hover:text-sm hover:font-mono ml-2"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
