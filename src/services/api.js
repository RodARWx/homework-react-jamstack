
import axios from "axios";
/**
 * Centralized Axios client instance configured for JSONPlaceholder API
 */
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

export default api;
