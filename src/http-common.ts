import axios from "axios";

export default axios.create({
  baseURL: "https://new-champion-halibut.ngrok-free.app",
  headers: {
    "Content-type": "application/json",
  },
});