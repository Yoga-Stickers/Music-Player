import React, { useState, useEffect } from 'react';
import Library from './Library';
import Player from './Player';

export default function MusicApp({ songs, selected ,setSongs, select }) {
  console.log(selected);

  useEffect(() => {
    if (localStorage.length > 0) {
      const savedSongs = JSON.parse(localStorage.getItem('songs'));
      // return savedSongs ? JSON.parse(savedSongs) : [];
      console.log(savedSongs);
      setSongs(savedSongs);
    }
  }, [])

  // Save songs to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  return (
    <div className="bg-black sm:flex-col flex gap-2 lg:h-[85vh] items-center justify-between text-white h-[90vh] p-1 w-full">
      <Library songs={songs} select={ select } setSongs={setSongs} />
      <Player selected={selected} songs={songs} />
    </div>
  );
}



function show(){

}