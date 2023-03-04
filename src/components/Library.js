import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  currentSongIndex,
  setCurrentSongIndex,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""} `}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song, i) => {
          return (
            <LibrarySong
              index={i}
              songs={songs}
              setSongs={setSongs}
              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              setCurrentSong={setCurrentSong}
              song={song}
              key={i}
              audioRef={audioRef}
              isPlaying={isPlaying}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
