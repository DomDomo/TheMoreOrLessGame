import axios from "axios";
const baseUrl = "http://localhost:3001/videos";

const getInitialVideos = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getInitialVideos };
