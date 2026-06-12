"use client";
import API from "./axios";

export const isAuthenticated=(): boolean=>{
    if (typeof window === "undefined") return false;
    const token=localStorage.getItem("token");
    return Boolean(token);
}


export const getUser=async(): Promise<string>=>{
    const res=await API.get<{role: string}>("/user/profile");
    return res.data.role;
}
