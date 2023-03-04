import React from "react";

const LibrarySong = ({
  song,
  index,
  songs,
  currentSongIndex,
  setCurrentSongIndex,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSongIndex(index);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${currentSongIndex === index ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.img_src}></img>
      <div className="song-description">
        <h3>{song.title}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
