import axios from "axios";
import firebase from "../util/firebase";

const db = firebase.firestore();

const KEY = process.env.REACT_APP_YT_API_KEY;
const VIDEO_NUM = 30;

let goodTopVideos = [];

const getInitialVideos = async () => {
  const snapshot = await db.collection("channels").get();
  const allChannels = snapshot.docs.map((doc) => doc.data());

  let allVideos = [];
  allChannels.forEach((channel) => {
    allVideos = allVideos.concat(channel.videos);
  });

  return allVideos;
};

const fetchVideoViews = async (url) => {
  console.log(`Fetching ${url}`);
  const info = await axios(url); // API call to get item info.
  return info.data.items[0].statistics.viewCount;
};

const getAllVideoViews = async (videos) => {
  const requests = videos.map((vid) => {
    const requestURL = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${vid.id}&key=${KEY}`;
    return fetchVideoViews(requestURL).then((info) => {
      return { ...vid, views: info };
    });
  });

  return Promise.all(requests);
};

const updateDbWithViews = (channel, vidsWithViews) => {
  db.collection("channels")
    .doc(channel.id)
    .update({
      videos: vidsWithViews,
    })
    .then(() => {
      console.log(
        `updated ${channel.id} (${channel.channel}) videos with views`
      );
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

const getNoViewVideos = (channel) => {
  return axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&key=${KEY}&maxResults=${VIDEO_NUM}&order=viewcount`
    )
    .then((response) => {
      const topVideos = response.data.items;
      topVideos.forEach((video) => {
        let newVideo = {
          show: false,
        };
        newVideo.id = video.id.videoId;
        newVideo.channel = video.snippet.channelTitle;
        newVideo.name = video.snippet.title.replace("&#39;", "'"); // For some reason youtube's apostrophes are a weird jumble;
        if (newVideo.id !== undefined) {
          goodTopVideos.push(newVideo);
        }
      });
      return db.collection("channels").doc(channel.id).set({
        id: channel.id,
        upload_id: channel.uploads,
        channel: channel.channel,
        videos: goodTopVideos,
      });
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

const getVideosWithViews = (channel) => {
  db.collection("channels")
    .doc(channel.id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        getAllVideoViews(doc.data().videos).then((vidsWithViews) => {
          console.log(vidsWithViews);
          updateDbWithViews(channel, vidsWithViews);
        });
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getInitialVideos,
  getNoViewVideos,
  getVideosWithViews,
};
