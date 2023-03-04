import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  return (
    <nav>
      <div className="text-anim ">
        <strong>Music App</strong>
      </div>
      {/* show details of next song on the page */}
      {/* <div className="nextsong-details">
        <img
          src={songs[nextSongIndex].img_src}
          alt={songs[nextSongIndex].title}
          style={{ width: "4em", height: "auto" }}
        />
        <p>
          <b>{songs[nextSongIndex].title} </b>&nbsp; by &nbsp;
          <b>{songs[nextSongIndex].artist}</b>
        </p>
      </div> */}
      <button onClick={() => setLibraryStatus(!libraryStatus)} className="btn">
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
