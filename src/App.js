import React, { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { mainVids } from "./videos";
import "./index.css";

const timeBeforeDeleting = 3000;

const Buttons = (props) => {
  return (
    <div className="buttonContainer">
      <button
        onClick={() => props.handleClick(props.video, "more")}
        className="game-button more"
      >
        More <span className="arrow-up"></span>
      </button>
      <button
        onClick={() => props.handleClick(props.video, "less")}
        className="game-button less"
      >
        Less <span className="arrow-down"></span>
      </button>
      <p className="pNextToButtons">views</p>
    </div>
  );
};

const ViewView = (props) => {
  const viewsToShow = props.index === 0 ? props.video.views : props.views;
  // This regex adds commas after 3 digits to make a formatted (locale) string
  const formattedViews = viewsToShow
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return <p className="videoViews">{formattedViews}</p>;
};

const Side = (props) => {
  const { countUp, start } = useCountUp({
    start: props.video.views * 0.8,
    end: props.video.views,
    // Coulnd't find a way to change by bool so put a very long dealy
    delay: 10000000,
    duration: 1,
  });

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
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
        {!props.video.showViews && (
          <Buttons video={props.video} handleClick={props.handleClick} />
        )}
        <div className={viewContainerClass}>
          {props.video.showViews && (
            <ViewView views={countUp} video={props.video} index={props.index} />
          )}
          <p>views</p>
        </div>
      </div>
    </div>
  );
};

const Disc = (props) => {
  const discClass = props.win ? "disc disc-win" : "disc";
  const discText = props.result ? "&#10004;" : "VS";

  return (
    <div
      className={discClass}
      dangerouslySetInnerHTML={{ __html: discText }}
    ></div>
  );
};

const Score = ({ score }) => {
  return <div className="score">Score: {score}</div>;
};

const App = () => {
  const [videos, setVideos] = useState(mainVids);
  const [win, setWin] = useState(false);
  const [result, setResult] = useState(false);
  const [score, setScore] = useState(0);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const timer = setTimeout(() => {
        setWin(false);
        setResult(true);
        const newVideos = videos.slice(1);
        setVideos(newVideos);
      }, timeBeforeDeleting);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win]);

  const handleClick = (video, option) => {
    setWin(true);
    const videoIndex = videos.findIndex((vid) => vid.id === video.id);
    let newVideos = [...videos];
    const newVideo = {
      ...videos[videoIndex],
      showViews: true,
    };
    const previousVideo = videos[0];

    if (
      (option === "more" && newVideo.views > previousVideo.views) ||
      (option === "less" && newVideo.views < previousVideo.views)
    ) {
      setScore(score + 1);
    } else {
      console.log("lose");
    }

    newVideos[videoIndex] = newVideo;
    setVideos(newVideos);
  };

  const sides = videos.slice(0, 3).map((video, index) => {
    return (
      <Side
        key={video.id}
        handleClick={handleClick}
        video={video}
        index={index}
      />
    );
  });

  const sideClass = win ? "splitScreen buttonPressed" : "splitScreen";

  return (
    <div className="mainView">
      <div className={sideClass}>{sides}</div>
      <Disc win={win} result={result} />
      <Score score={score} />
    </div>
  );
};

export default App;
