import axios from "axios";

// Dynamically determine the backend URL based on host environment
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

const API_URL = process.env.REACT_APP_API_URL || (isLocalhost ? "http://localhost:5000" : "https://shopez-backend.onrender.com");

const API = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json"
  }
});

export const registerUser = (userData) =>
  API.post("/auth/register", userData);

export const loginUser = (userData) =>
  API.post("/auth/login", userData);

export const getProducts = () =>
  API.get("/products");

export const getProductById = (id) =>
  API.get(`/products/${id}`);

export const getCart = (userId) =>
  API.get(`/cart/${userId}`);

export const addToCartApi = (userId, product) =>
  API.post("/cart/add", { userId, product });

export const removeFromCartApi = (userId, productId) =>
  API.post("/cart/remove", { userId, productId });

export default API;