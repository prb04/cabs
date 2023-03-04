/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./styles/App.css";
import Player from "./components/Player";
import { data } from "./data/songData";
import Nav from "./components/Nav";
import Library from "./components/Library";

const App = () => {
  const [songs] = useState(data);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  //to show details of next song
  // const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [libraryStatus, setLibraryStatus] = useState(false);

  //for replaying song
  // const [sendReq, setSendReq] = useState(false);

  const audioRef = useRef(null);
  const intervalRef = useRef();
  const isReady = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);

  // const newData = songs.map((item) => ({
  //   ...item,
  //   active: "false",
  // }));

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const skipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        //to play the song again if time passed is more than 5sec. Need uncaught promise handling
        // if (audioRef?.current?.currentTime < 5) {
        //   temp--;
        // } else {
        //   setSendReq(true);
        //   return temp;
        // }
        if (temp < 0) {
          temp = songs.length - 1;
        }

        return temp;
      });
    }
  };

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        skipSong();
      } else {
        setTrackProgress(audioRef?.current.currentTime);
      }
    }, [1000]);
  };

  //Play/Pause functionality
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(songs[currentSongIndex].src);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [currentSongIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  //Handles next song details
  // useEffect(() => {
  //   setNextSongIndex(() => {
  //     if (currentSongIndex + 1 > data.length - 1) {
  //       return 0;
  //     } else {
  //       return currentSongIndex + 1;
  //     }
  //   });
  // }, [currentSongIndex]);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Library
        audioRef={audioRef}
        songs={data}
        isPlaying={isPlaying}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        libraryStatus={libraryStatus}
      />
      <Player
        audioRef={audioRef}
        trackProgress={trackProgress}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        onScrub={onScrub}
        onScrubEnd={onScrubEnd}
        libraryStatus={libraryStatus}
        songs={songs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipSong={skipSong}
      />
      <audio src={songs[currentSongIndex].src} ref={audioRef}></audio>
    </div>
  );
};

export default App;
