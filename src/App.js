import React, { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { mainVids } from "./videos";

import "./index.css";

const Buttons = ({ handleClick }) => {
  return (
    <div className="buttonContainer">
      <button onClick={handleClick} className="game-button more">
        More <span className="arrow-up"></span>
      </button>
      <button onClick={handleClick} className="game-button less">
        Less <span className="arrow-down"></span>
      </button>
      <p className="pNextToButtons">views</p>
    </div>
  );
};

const ViewView = (props) => {
  const viewsToShow = props.video.leftSide ? props.video.views : props.views;
  // This regex adds commas after 3 digits to make a formatted (locale) string
  const formattedViews = viewsToShow
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return <p className="videoViews">{formattedViews}</p>;
};

const Side = (props) => {
  const { countUp, start } = useCountUp({
    start: props.video.views - props.video.views * 0.2,
    end: props.video.views,
    // Coulnd't find a way to change by bool so put a very long dealy
    delay: 10000000,
    duration: 1,
  });

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.video.showViews]);

  const viewContainerClass = props.video.showViews
    ? "viewContainer fadeIn"
    : "viewContainer";

  return (
    <div
      className="half"
      style={{ backgroundImage: `url(${props.video.image})` }}
    >
      <div className="top">
        <p className="videoTitle">"{props.video.name}"</p>
        <p>has</p>
      </div>
      <div className="bottom">
        {!props.video.showViews && <Buttons handleClick={props.handleClick} />}
        <div className={viewContainerClass}>
          {props.video.showViews && (
            <ViewView views={countUp} video={props.video} />
          )}
          <p>views</p>
        </div>
      </div>
    </div>
  );
};

const Disc = () => {
  return (
    <div className="disc">
      <h1>VS</h1>
    </div>
  );
};

const App = () => {
  const [videos, setVideos] = useState(mainVids);
  const [win, setWin] = useState(false);

  useEffect(() => {
    videos[0].showViews = true;
    setVideos(videos);
  }, [videos]);

  const handleClick = () => {
    setWin(true);
    videos[1].showViews = true;
    setVideos(videos);
  };

  const gameScroller = win ? "splitScreen win" : "splitScreen";

  return (
    <div className="mainView">
      <div className={gameScroller}>
        <Side video={videos[0]} />
        <Side handleClick={handleClick} video={videos[1]} />
        <Side handleClick={handleClick} video={videos[2]} />
      </div>
      <Disc />
    </div>
  );
};

export default App;
