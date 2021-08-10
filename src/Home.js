import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homePage">
      <header>
        <h1 className="startHeader">
          The <span className="moreWord">More</span> or{" "}
          <span className="lessWord">Less</span> Game
        </h1>

        <Link to="/game" style={{ textDecoration: "none" }}>
          <button className="game-button start-game">Start</button>
        </Link>
      </header>
    </div>
  );
}

export default Home;
