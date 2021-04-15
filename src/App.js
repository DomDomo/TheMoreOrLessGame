import React, { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";

import "./index.css";
const Cicada = require("./images/3301.jpg");
const Roomba = require("./images/Roomba.jpg");
const Fallout = require("./images/76.jpg");
const IsShe = require("./images/Is_She.jpg");

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
  const [show, setShow] = useState(false);
  const [win, setWin] = useState(false);

  const video1 = {
    name: "Cicada 3301: An Internet Mystery",
    views: 23984345,
    image: Cicada.default,
    showViews: true,
    leftSide: true,
  };
  const video2 = {
    name: "The Roomba That Screams When it Bumps Into Stuff",
    views: 21460437,
    image: Roomba.default,
    showViews: show,
    leftSide: false,
  };

  const video3 = {
    name: "The Fall of 76",
    views: 25250766,
    image: Fallout.default,
    showViews: show,
    leftSide: false,
  };
  const video4 = {
    name: "Casually Explained: Is She Into You?",
    views: 16012073,
    image: IsShe.default,
    showViews: show,
    leftSide: false,
  };

  const handleClick = () => {
    setShow(true);
    setWin(true);
  };

  const gameScroller = win ? "splitScreen win" : "splitScreen";

  return (
    <div className="mainView">
      <div className={gameScroller}>
        <Side video={video1} />
        <Side handleClick={handleClick} video={video2} />
        <Side handleClick={handleClick} video={video3} />
      </div>
      <Disc />
    </div>
  );
};

export default App;

//<Side handleClick={handleClick} video={video3}/>
