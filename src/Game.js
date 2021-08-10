import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import videoService from "./services/videos";
import { useCountUp } from "react-countup";
import { Link } from "react-router-dom";

const numberUpTime = 1;
const timeBeforeDeleting = 3000;
const timebeforeBeforeDeleting = 1500;
const timebeforeGameOver = 2200;

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

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
    duration: numberUpTime,
  });

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.video.show]);

  const viewContainerClass = props.video.show
    ? "viewContainer fadeIn"
    : "viewContainer";

  return (
    <div
      className="half"
      style={{
        backgroundImage: `url(https://img.youtube.com/vi/${props.video.id}/maxresdefault.jpg)`,
      }}
    >
      <div className="top">
        <p className="videoTitle">"{props.video.name}"</p>
        <p>has</p>
      </div>
      <div className="bottom">
        {!props.video.show && (
          <Buttons video={props.video} handleClick={props.handleClick} />
        )}
        <div className={viewContainerClass}>
          {props.video.show && (
            <ViewView views={countUp} video={props.video} index={props.index} />
          )}
          <p>views</p>
        </div>
      </div>
    </div>
  );
};

const Disc = (props) => {
  let discClass = "disc";
  let discText = "VS";

  if (props.lose) {
    discClass += " disc-move disc-lose";
  } else if (props.win) {
    discClass += " disc-move disc-win";
  }

  if (props.cross) {
    discText = "&#10006;";
  } else if (props.check) {
    discText = "&#10004;";
  }

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

const GamePage = (props) => {
  const sideClass = props.win ? "splitScreen buttonPressed" : "splitScreen";

  return (
    <div className="mainView">
      <div className={sideClass}>{props.sides}</div>
      <Disc
        win={props.win}
        check={props.check}
        cross={props.cross}
        lose={props.lose}
      />
      <Score score={props.score} />
    </div>
  );
};

const ScorePage = ({ score }) => {
  return (
    <div className="simplePage scorePage">
      <header>
        <h1 className="startHeader">Your score is</h1>

        <h1 className="scoreNumber">{score}</h1>
        <button
          style={{ textDecoration: "none" }}
          type="button"
          onClick={() => window.location.reload()}
          className="game-button start-game"
        >
          New Game
        </button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button type="button" className="game-button start-game">
            Menu
          </button>
        </Link>
      </header>
    </div>
  );
};

const Game = () => {
  const [videos, setVideos] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [win, setWin] = useState(false);
  const [check, setCheck] = useState(false);
  const [lose, setLose] = useState(false);
  const [cross, setCross] = useState(false);

  // Get inital vidoes
  useEffect(() => {
    //videoService.pickRandomChannel();
    videoService.getInitialVideos().then((videos) => {
      shuffleArray(videos);
      videos[0].show = true;
      setVideos(videos);
    });
  }, []);

  const isFirstRender = useRef(true);
  // This "resets" the game field and deletes the previous video from the list
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const timer = setTimeout(() => {
        if (win) {
          setWin(false);
          setCheck(false);
          let newVideos = videos.slice(1);
          setVideos(newVideos);
          videoService.addVideo().then((newVideo) => {
            if (newVideo !== undefined)
              setVideos(videos.concat(newVideo).slice(1));
          });
        }
      }, timeBeforeDeleting);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win]);

  // This is just to to change the "VS" disc class to do the animation
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const timer = setTimeout(() => {
        if (lose) {
          setCross(true);
        } else if (win) {
          setCheck(true);
        }
      }, timebeforeBeforeDeleting);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [win]);

  // This is a timer for when a player loses it shows the score page
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const timer = setTimeout(() => {
        if (lose) {
          setShowScore(true);
        }
      }, timebeforeGameOver);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lose]);

  const handleClick = (video, option) => {
    const videoIndex = videos.findIndex((vid) => vid.id === video.id);
    let newVideos = [...videos];
    const newVideo = {
      ...videos[videoIndex],
      show: true,
    };
    const previousVideo = videos[0];
    const preViews = previousVideo.views;
    const newViews = video.views;

    if (
      (option === "more" && parseInt(preViews) < parseInt(newViews)) ||
      (option === "less" && parseInt(preViews) > parseInt(newViews))
    ) {
      setScore(score + 1);
      setWin(true);
    } else {
      setLose(true);
      setWin(true);
    }
    newVideos[videoIndex] = newVideo;

    setVideos(newVideos);
  };

  // Only have 3 videos in play. 2 in view and 1 to be slid in. (Setup this way due to how CSS transitions work)
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

  if (showScore) {
    return <ScorePage score={score} />;
  }
  return (
    <GamePage
      sides={sides}
      win={win}
      check={check}
      lose={lose}
      cross={cross}
      score={score}
    />
  );
};

export default Game;
