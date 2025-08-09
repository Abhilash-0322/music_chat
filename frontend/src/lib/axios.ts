import axios from "axios";

// Determine the base URL based on the environment
const baseURL = import.meta.env.MODE === "development" 
    ? "http://localhost:5000/api"
    : "/api"; // In production, use relative path which will be handled by Vercel routing

export const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, 
});