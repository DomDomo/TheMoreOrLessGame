import React from 'react'
import './index.css'
const Cicada = require( "./images/3301.jpg" );
const Roomba = require( "./images/Roomba.jpg" );

const Buttons = () => {
  return (
    <div >
      <button className="game-button more">More <span class="arrow-up"></span></button>
      <button className="game-button less">Less <span class="arrow-down"></span></button>
    </div>
  )
}

const Side = (props) => {

  const imageStyle = {
    boxShadow: "inset 0 0 0 100vw rgba(0,0,0,0.35)",
    backgroundImage: `url(${props.video.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    
  };

  return (
    <div className="half" style={imageStyle}>
      <p className="videoTitle">"{props.video.name}"</p>
      <p>has</p>
      
      {props.video.showViews
        ? <Buttons />
        : <p className="videoViews">{props.video.views}</p>
      }
      <p >views</p>
    </div>
  )
}

const Disc = ({style}) => {
  return (
    <div className="disc">
      <h1>VS</h1>
    </div>
  )
}


const App = () => {

  const video1 = {
    name: "Cicada 3301: An Internet Mystery",
    views: "23,984,345",
    image: Cicada.default,
    showViews: false,
  };
  const video2 = {
    name: "The Roomba That Screams When it Bumps Into Stuff",
    views: "21,460,437",
    image: Roomba.default,
    showViews: true,
  };

  return (
    <div className="mainView">
      <div className="splitScreen">
        <Side video={video1}/>
        <Side video={video2}/>
    </div>
    <Disc />
  </div>
  )
}

export default App