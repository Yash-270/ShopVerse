"use client";
import axios, { InternalAxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: "http://56.228.30.52:5000"
});

// Token auto attach
API.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
},

(error) => {
    return Promise.reject(error);
  }
);

export default API;