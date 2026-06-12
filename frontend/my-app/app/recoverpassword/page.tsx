"use client";
import API from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const RecoverPassword = () => {
  const route=useRouter();
  const params=useSearchParams();
  const prefill=params.get("value");
  const keyval=params.get("keyedit");
  const [identify, setIdentify] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identify);
const isPhone = /^[0-9]{10}$/.test(identify); 
  const sendOtp = async () => {
    try {
       if (!isEmail && !isPhone) {
              alert("Please enter valid email or mobile number");
              return;
        }
      await API.post("/user/otp-sent",{
        type: isEmail ? "email" : "contact",
        identify: identify,
        purpose: prefill ? "signup" : "reset"
      });
      alert("OTP sent to your email");
      setOtpSent(true);
    } catch (err) {
      alert("Failed to send OTP");
    }
  };

  useEffect(()=>{
    if(prefill){
        setIdentify(prefill);
    }
  },[prefill])

  useEffect(()=>{
    if(keyval){
        setIdentify(keyval);
    }
  },[keyval])

  const verifyOtp = async () => {
    try {
      const purpose = prefill ? "signup" : "reset"; 
      const res=await API.post("/user/otp-verify", { 
        type: isEmail ? "email" : "contact",
        identify: identify, 
        otp,
        purpose: purpose,
        
     });
        alert("OTP verified");
      
      if(keyval){
        route.push("/profile/edit");
      }
      else if(prefill){
        route.push("/signup?verified=true");
      }
      else{
        route.push(`/forgetpassword?value=${encodeURIComponent(identify)}`);
      }
    } catch (err) {
      alert("Invalid or expired OTP");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] px-4">

    <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-2xl p-8 border border-[#2a2a2a]">

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center text-[#d4a373] mb-2">
        Recover Password
      </h2>

      <p className="text-center text-sm text-gray-400 mb-8">
        We’ll send you an OTP to verify your account
      </p>

      {/* EMAIL INPUT */}
      <input
        type="text"
        placeholder="Enter your Email"
        value={identify}
        onChange={(e) => setIdentify(e.target.value)}
        className="w-full mb-4 px-4 py-3 rounded-xl bg-[#111]
          border border-[#333] text-white
          focus:outline-none focus:ring-2 focus:ring-[#d4a373]
          placeholder-gray-500 transition"
      />

      {/* REQUEST OTP BUTTON */}
      <button
        onClick={sendOtp}
        className="w-full py-3 rounded-xl font-semibold
          bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
          text-black hover:opacity-90 transition shadow-lg mb-4"
      >
        Request OTP
      </button>

      {/* OTP SECTION */}
      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-4 px-4 py-3 rounded-xl bg-[#111]
              border border-[#333] text-white
              focus:outline-none focus:ring-2 focus:ring-[#d4a373]
              placeholder-gray-500 transition"
          />

          <button
            onClick={verifyOtp}
            className="w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-[#8b5e3c] to-[#d4a373]
              text-black hover:opacity-90 transition shadow-lg"
          >
            Verify OTP
          </button>
        </>
      )}

    </div>
  </div>
);

};
export default RecoverPassword;