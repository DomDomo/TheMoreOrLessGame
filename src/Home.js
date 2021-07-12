import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="homePage">
      <header>
        <h1>The More or Less Game</h1>

        <Link to="/game" style={{ textDecoration: "none" }}>
          <button className="game-button start-game">Start</button>
        </Link>
      </header>
    </div>
  );
}

export default Home;
