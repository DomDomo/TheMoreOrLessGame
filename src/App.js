import React, { useEffect, useRef, useState } from "react";
import { useCountUp } from "react-countup";
import { mainVids } from "./videos";
import "./index.css";
import { CSSTransition } from "react-transition-group";

const Buttons = (props) => {
  return (
    <div className="buttonContainer">
      <button
        onClick={() => props.handleClick(props.video)}
        className="game-button more"
      >
        More <span className="arrow-up"></span>
      </button>
      <button
        onClick={() => props.handleClick(props.video)}
        className="game-button less"
      >
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
  const [classy, setClassy] = useState(false);

  const deleteFirstVideo = () => {
    // console.log(videos);
    // const newVideos = videos.slice(1);
    // setVideos(newVideos);
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const timer = setTimeout(() => {
        setClassy(true);
        // console.log("This will run after 1 second!");
        // console.log(videos);
        // const newVideos = videos.slice(1);
        // setVideos(newVideos);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [win]);

  const handleClick = (video) => {
    setWin(true);
    const videoIndex = videos.findIndex((vid) => vid.id === video.id);
    const newVideos = [...videos];
    const newVideo = {
      ...videos[videoIndex],
      showViews: true,
    };
    newVideos[videoIndex] = newVideo;
    setVideos(newVideos);
  };

  const sides = videos.slice(0, 3).map((video, index) => {
    return <Side key={video.id} handleClick={handleClick} video={video} />;
  });

  const classToGive = classy ? "win moveBack" : "win";

  return (
    <div className="mainView">
      <CSSTransition
        in={win}
        timeout={200}
        classNames={classToGive}
        onEntered={() => deleteFirstVideo()}
        onExited={() => console.log("exited")}
      >
        <div className="splitScreen">{sides}</div>
      </CSSTransition>
      <Disc />
    </div>
  );
};

export default App;
