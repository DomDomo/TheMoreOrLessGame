import React, { useEffect, useRef, useState } from "react";
import { useCountUp } from 'react-countup';

import './index.css'
const Cicada = require( "./images/3301.jpg" );
const Roomba = require( "./images/Roomba.jpg" );

const Buttons = ({handleClick}) => {
  return (
    <div >
      <button onClick={handleClick} className="game-button more">More <span className="arrow-up"></span></button>
      <button onClick={handleClick} className="game-button less">Less <span className="arrow-down"></span></button>
    </div>
  )
}

const ViewView = (props) => {
  const viewsToShow = props.video.first ? props.video.views : props.views;
  // This regex adds commas after 3 digits to make a formatted (locale) string
  const formattedViews = viewsToShow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
      <p className="videoViews">{formattedViews}</p>
  )
}

const Side = (props) => {

  const { countUp, start } = useCountUp({
    start: 0,
    end: props.video.views,
    // Coulnd't find a way to change by bool so put a very long dealy
    delay: 10000000,
    duration: 1
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

  return (
    <div className="half" style={{backgroundImage: `url(${props.video.image})`}}>
      <p className="videoTitle">"{props.video.name}"</p>
      <p>has</p>
      
      {props.video.showViews
        ? <ViewView views={countUp} video={props.video}/>
        : <Buttons handleClick={props.handleClick}/>
      }
      <p >views</p>
    </div>
  )
}

const Disc = () => {
  return (
    <div className="disc">
      <h1>VS</h1>
    </div>
  )
}


const App = () => {

  const [show, setShow] = useState(false);

  const video1 = {
    name: "Cicada 3301: An Internet Mystery",
    views: 23984345,
    image: Cicada.default,
    showViews: true,
    first: true,
  };
  const video2 = {
    name: "The Roomba That Screams When it Bumps Into Stuff",
    views: 21460437,
    image: Roomba.default,
    showViews: show,
    first: false,
  };

  const handleClick = () => {
    setShow(true);
  };

  return (
    <div className="mainView">
      <div className="splitScreen">
        <Side video={video1}/>
        <Side handleClick={handleClick} video={video2}/>
    </div>
    <Disc />
  </div>
  )
}

export default App