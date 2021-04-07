import React from 'react'
import './index.css'

const Hello = ({style}) => {
  return (
    <div className={[style, "half"].join(' ')}>
      <p>Hello world</p>
    </div>
  )
}


const App = () => {
  const styles = {
    success: "success",
    error: "error"
  }

  return (
    <div className="splitScreen">
      <Hello style={styles.success}/>
      <Hello style={styles.error}/>
  </div>
  )
}

export default App