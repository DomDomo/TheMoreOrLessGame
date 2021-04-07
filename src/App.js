import React from 'react'
import './index.css'

const Side = (props) => {
  return (
    <div className={[props.style, "half"].join(' ')}>
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
    name: "Hello world",
    views: "500k"
  };
  const video2 = {
    name: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.",
    views: "27M"
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