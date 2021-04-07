import React from 'react'
import './index.css'
const Cicada = require( "./images/3301.jpg" );
const Roomba = require( "./images/Roomba.jpg" );

const Side = (props) => {

  const imageStyle = {
    boxShadow: "inset 0 0 0 100vw rgba(0,0,0,0.35)",
    backgroundImage: `url(${props.video.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    
  };


  return (
    <div className={[props.style, "half"].join(' ')} style={imageStyle}>
      <h2>"{props.video.name}"</h2>
      <p>has</p>
      <h1>{props.video.views}</h1>
      <p>views</p>
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
  const styles = {
    success: "success",
    error: "error"
  }

  const video1 = {
    name: "Cicada 3301: An Internet Mystery",
    views: "23,984,345",
    image: Cicada.default,
  };
  const video2 = {
    name: "The Roomba That Screams When it Bumps Into Stuff",
    views: "21,460,437",
    image: Roomba.default,
  };

  return (
    <div className="mainView">
      <div className="splitScreen">
        <Side style={styles.success} video={video1}/>
        <Side style={styles.error} video={video2}/>
    </div>
    <Disc />
  </div>
  )
}

export default App