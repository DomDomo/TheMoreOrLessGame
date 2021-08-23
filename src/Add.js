import { useState } from "react";
import videoService from "./services/videos";

const Channel = ({ chnl }) => {
  return (
    <header>
      <h1>ID: {chnl.id}</h1>
      <h1>Uploads: {chnl.uploads}</h1>
      <h1>Channel: {chnl.channel}</h1>
    </header>
  );
};

function Add() {
  const [input, setInput] = useState({
    id: "",
    uploads: "",
    channel: "",
  });

  const inputsHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitButton = () => {
    if (input.id && input.channel) {
      let uplds = input.id.split("");
      uplds[1] = "U";

      setInput({ ...input, uploads: uplds.join("") });
    }
  };

  const noViews = () => {
    videoService.getNoViewVideos(input);
  };

  const fullVideos = () => {
    videoService.getVideosWithViews(input);
  };

  return (
    <div className="simplePage homePage">
      <header>
        <h1 className="startHeader">Add channel id and name</h1>
        <Channel chnl={input} />

        <input
          type="text"
          name="id"
          onChange={inputsHandler}
          placeholder="ID"
          value={input.id}
        />

        <br />

        <input
          type="text"
          name="channel"
          onChange={inputsHandler}
          placeholder="Youtuber"
          value={input.channel}
        />

        <br />

        <div>
          <button onClick={submitButton}>Add uploads</button>
          <button onClick={noViews}>No views</button>
          <button onClick={fullVideos}>Full Videos</button>
        </div>
      </header>
    </div>
  );
}

export default Add;
