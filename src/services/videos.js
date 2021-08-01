import axios from "axios";
import { channels } from "./channels";
const baseUrl = "http://localhost:3001/videos";

const KEY = process.env.REACT_APP_YT_API_KEY;

const getInitialVideos = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const addVideo = () => {
  let newVideo = {
    show: false,
  };
  const rndChannel = channels[Math.floor(Math.random() * channels.length)];
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${rndChannel.id}&key=${KEY}&maxResults=50&order=viewcount`
    )
    .then((response) => {
      const topVideos = response.data.items;
      const rndVideo = topVideos[Math.floor(Math.random() * topVideos.length)];
      newVideo.id = rndVideo.id.videoId;
      newVideo.name = rndVideo.snippet.title.replace("&#39;", "'"); // For some reason youtube's apostrophes are a weird jumble
      const getRequestURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${rndVideo.id.videoId}&key=${KEY}`;
      return axios.get(getRequestURL);
    })
    .then((response) => {
      newVideo.views = response.data.items[0].statistics.viewCount;
      return axios.post(baseUrl, newVideo);
    })
    .then((response) => {
      return newVideo;
    })
    .catch((error) => {
      if (error.message.includes("status code 500")) {
        console.log("Found video with same id");
      } else if (error.message.includes("403")) {
        console.clear();
        console.log("Exceeded quota");
      } else {
        console.error(error);
      }
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getInitialVideos, addVideo };
