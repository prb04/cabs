import React from "react";

function PlayerDetails({
  duration,
  trackProgress,
  dragHandler,
  dragHandlerEnd,
  song,
  audioRef,
  getTime,
}) {
  const curr = (Math.round(trackProgress) / Math.round(duration)) * 100;

  const trackAnim = {
    transform: `translateX(${curr}%)`,
  };

  return (
    <div className="music-player--details">
      <div className="details-img">
        <img
          className="details-img--image"
          src={song.img_src}
          alt={song.title}
        />
      </div>
      <div className="time-control">
        <p>
          {audioRef?.current?.currentTime !== undefined
            ? getTime(audioRef.current.currentTime)
            : `0:00`}
        </p>
        <div
          style={{
            background: `linear-gradient(to right, #9EA1D4, #FD8A8A)`,
          }}
          className="track"
        >
          <input
            type="range"
            value={trackProgress}
            min="0"
            max={duration ? duration : `${duration}`}
            onChange={(e) => dragHandler(e.target.value)}
            onMouseUp={dragHandlerEnd}
            onKeyUp={dragHandlerEnd}
          />
          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>
          {audioRef?.current?.duration
            ? getTime(audioRef?.current?.duration)
            : `0:00`}
        </p>
      </div>
      <div className="artist-info">
        <h3 className="details-title">{song.title}</h3>
        <h4 className="details-artist">{song.artist}</h4>
      </div>
    </div>
  );
}

export default PlayerDetails;
