"use client";
import API from "@/lib/axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function IdentityEdit(){
  const route=useRouter();
  const [identify, setIdentify] = useState("");
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identify);
  const save = async () => {
    try {
      await API.put("user/profile/keyedit",{
        type: isEmail ? "email" : "contact",
        identify: identify,
      });
      alert("Updated");
      route.push("/profile");
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  
 return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a]
      border border-[#2a2a2a] rounded-2xl
      shadow-2xl p-8">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-2">
        Update Profile
      </h2>

      <p className="text-center text-gray-400 mb-8 text-sm">
        Modify your email or contact details
      </p>

      {/* INPUT */}
      <input
        type="text"
        placeholder="Enter your Email or Mobile Number"
        value={identify}
        onChange={(e) => setIdentify(e.target.value)}
        className="w-full mb-6 px-4 py-3 rounded-xl
          bg-[#111] border border-[#333]
          text-white placeholder-gray-500
          focus:outline-none focus:ring-2 focus:ring-[#d4a373]
          transition"
      />

      {/* BUTTON */}
      <button
        onClick={save}
        className="w-full py-3 rounded-xl font-semibold
          bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
          text-black hover:opacity-90
          transition shadow-lg"
      >
        Save Changes
      </button>

    </div>
  </div>
);

};