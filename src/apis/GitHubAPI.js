import axios from "axios";

const BASE_URL = "https://api.github.com";
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

const gitHubAPIClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Token ${GITHUB_API_TOKEN}`,
  },
});

export { gitHubAPIClient };
