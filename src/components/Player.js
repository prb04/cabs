/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

const Player = ({
  audioRef,
  trackProgress,
  currentSongIndex,
  isPlaying,
  setIsPlaying,
  skipSong,
  onScrub,
  onScrubEnd,
  songs,
}) => {
  const currentPercentage = audioRef?.current?.duration
    ? `${(trackProgress / audioRef?.current?.duration) * 100}%`
    : "0%";

  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  return (
    <>
      <div className="music-player">
        {/*  */}
        <PlayerDetails
          duration={audioRef?.current?.duration}
          trackProgress={trackProgress}
          currentPercentage={currentPercentage}
          trackStyling={trackStyling}
          onScrub={onScrub}
          onScrubEnd={onScrubEnd}
          song={songs[currentSongIndex]}
          audioRef={audioRef}
          getTime={getTime}
        />

        <PlayerControls
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          skipSong={skipSong}
        />

        <div className="player__footer">
          <ul className="list list--footer">
            <li>
              <a href="#" className="list__link">
                <i className="fa fa-heart-o"></i>
              </a>
            </li>

            <li>
              <a href="#" className="list__link">
                <i className="fa fa-random"></i>
              </a>
            </li>

            <li>
              <a href="#" className="list__link">
                <i className="fa fa-undo"></i>
              </a>
            </li>

            <li>
              <a href="#" className="list__link">
                <i className="fa fa-ellipsis-h"></i>
              </a>
            </li>
          </ul>
        </div>

        {/* <h4>Lofi Music Player React </h4> */}
      </div>
    </>
  );
};
export default Player;
