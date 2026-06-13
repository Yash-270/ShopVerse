"use client";
import axios, { InternalAxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: "https://shopverse.duckdns.org"
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