import axios from "axios";

export default axios.create({
  baseURL: "https://streamy-json-server.herokuapp.com",
});
